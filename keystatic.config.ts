import { config, fields, collection } from '@keystatic/core';
import { slugPathRegex, slugDoublePathRegex } from './src/js/util.js';
import { GetData } from './src/pages/api/cms/courses_path.ts';
interface JsonData {
	name: string;
	value: string;
};
import CourseTypes from './src/data/cms/course_types.json';
import ExamSystems from './src/data/cms/exam_systems.json';
const r = await GetData();
const d = await r.json();
console.log(d);

export default config({
	storage: {
		kind: 'local',
	},
	ui: {
		brand: { name: "Student Portal" },
		navigation: {
			posts: ['news', 'categories'],
			institue: [
				'departments', 'faculty', 'designations',
			],
			education: [
				'courses', 'course_sections', 'subjects'
			],
			settings: ['navigation'],
		},
	},

	collections: {
		navigation: collection({
			label: "Navigation",
			slugField: 'name',
			path: 'src/content/navigation/*',
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					}
				}),
				nav: fields.array(
					fields.object({
						name: fields.text({
							label: "Name",
							description: "Name of the link",
							validation: { isRequired: true },
						}),
						href: fields.text({
							label: "href",
							description: "Path or Link to desired path",
							validation: { isRequired: true },
						}),
						icon: fields.text({
							label: "Icon",
							description: "Font Awesome Icon Element",
						})
					})
				),
			}
		}),
		news: collection({
			label: 'News',
			slugField: 'title',
			path: 'src/content/news/*',
			entryLayout: 'content',
			format: { contentField: 'content' },
			schema: {
				draft: fields.checkbox({
					label: 'Draft',
				}),
				title: fields.slug({
					name: {
						label: 'Title',
						validation: { isRequired: true },
					}
				}),
				published: fields.datetime({
					label: 'Published',
					defaultValue: { kind: "now" },
				}),
				bannerImg: fields.image({
					label: "Banner",
					directory: 'public/images/news',
					publicPath: '/images/news/',
					validation: {
						isRequired: true,
					},
				}),
				category: fields.array(
					fields.relationship({
						label: 'Category',
						collection: 'categories',
						validation: {
							isRequired: true,
						}
					}),
					{
						label: 'Categories',
						itemLabel: props => props.value,
					}
				),
				tag: fields.array(
					fields.text({
						label: 'Tag',
						validation: {
							isRequired: true,
						}
					}),
					{
						label: 'Tags',
						itemLabel: props => props.value,
					}
				),
				postedBy: fields.text({
					label: 'Posted By',
					defaultValue: 'Admin',
				}),
				content: fields.markdoc({
					label: 'Body',
					extension: 'md'
				})
			},
		}),
		categories: collection({
			label: "Categories",
			slugField: 'name',
			path: 'src/content/categories/*',
			format: { contentField: 'content' },
			schema: {
				parent: fields.conditional(
					fields.checkbox({
						label: 'Child Category',
						description: "Does this category have a parent?",
						defaultValue: false
					}),
					{
						true: fields.relationship({
							label: "Parent Category",
							collection: "categories",
							description: "Select a parent category it belongs to."
						}),
						false: fields.empty(),
					}
				),
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					},
				}),
				description: fields.text({
					label: "Description",
					validation: { isRequired: false },
					multiline: true,
				}),
				content: fields.emptyContent({ extension: 'md' })
			}
		}),
		courses: collection({
			label: 'Courses',
			slugField: 'name',
			path: 'src/content/courses/**',
			format: { contentField: 'content' },
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					description: "Make a draft of this course",
					defaultValue: false,
				}),
				abbreviation: fields.text({
					label: 'Course Abbreviation',
					description: "Abbreviation of the course name. e.g IT,CS",
					validation: { isRequired: true },
				}),
				name: fields.slug({
					name: {
						label: 'Course Name',
						description: "Complete name of the course. e.g Information Technology",
						validation: { isRequired: true }
					},
					slug: {
						label: "Slug Path",
						description: "Path of course course_type/course_name. (e.g bs/information-technology)",
						validation: {
							pattern: {
								// chaing this regex will cause changes to the file path courses
								regex: slugPathRegex(CourseTypes),
								message: "Note! Valid course type -- No spaces(' '),more than one(/),special characters(!,@,#,$,%,^,&,*)",
							},
						},
					}
				}),
				information: fields.object({
					type: fields.select({
						label: "Type",
						description: "Type of the course",
						options: [
							...CourseTypes.types.map((t: JsonData) => ({
								label: t.name,
								value: t.value,
							})),
						],
						defaultValue: "none"
					}),
					exam_system: fields.select({
						label: "Exam System",
						description: "Type of exam system of course",
						options: [
							...ExamSystems.types.map((t: JsonData) => ({
								label: t.name,
								value: t.value,
							})),
						],
						defaultValue: 'none',
					}),
					duration: fields.integer({
						label: 'Duration (Year)',
						description: "Duration to complete course",
						validation: {
							isRequired: true,
							min: 1,
							max: 5,
						},
					}),
					eligibility: fields.text({
						label: "Eligibility",
						description: "Specified criteria to get admission into the course",
						validation: { isRequired: true },
						multiline: true,
					}),
				}, {
					layout: [4, 4, 4, 12],
				}),
				content: fields.markdoc({
					extension: 'md',
					label: 'About',
				}),
			},
		}),
		course_sections: collection({
			label: "Course Sections",
			slugField: 'name',
			path: "src/content/course-sections/**",
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					description: "Make this course section a draft",
					defaultValue: false,
				}),
				course: fields.relationship({
					label: "Course",
					collection: "courses",
					validation: { isRequired: true },
				}),
				name: fields.slug({
					name: {
						label: "Name",
						description: "Name of the subject's section. e.g Semester 1, Part 1",
						validation: { isRequired: true },
					},
					slug: {
						label: "Slug",
						description: "Slug path for course section. e.g course_name_path/section_name",
						validation: {
							pattern: {
								regex: slugDoublePathRegex(CourseTypes),
								message: "Erro",
							}
						}
					}
				})
			}
		}),
		subjects: collection({
			label: 'Subjects',
			slugField: 'name',
			path: 'src/content/subjects/*',
			format: { contentField: 'content' },
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					defaultValue: false,
				}),
				code: fields.text({ label: 'Subject Code' }),
				name: fields.slug({
					name: { label: 'Name' },
				}),
				banner: fields.image({
					label: "Banner",
					directory: "public/images/subject",
					publicPath: "/images/subject/",
					validation: { isRequired: true },
				}),
				outline: fields.array(
					fields.object({
						topic: fields.text({
							label: "Topic",
							validation: { isRequired: true },
						}),
						status: fields.checkbox({
							label: "Taught",
							defaultValue: false,
						}),
					}),
					{
						label: "Topics",
						itemLabel: props => props.fields.topic.value,
					}
				),
				teacher: fields.relationship({
					label: "Teacher",
					collection: "faculty",
				}),
				content: fields.markdoc({
					extension: 'md',
					label: 'Content',
				}),
			},
		}),
		faculty: collection({
			label: "Faculty",
			slugField: "name",
			path: "src/content/faculty/**",
			format: { contentField: 'content' },
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					description: "Is this faculty member a draft",
					defaultValue: false,
				}),
				image: fields.object({
					src: fields.image({
						label: "Image",
						description: "Image of the person.",
						directory: "public/images/faculty",
						publicPath: "/images/faculty/",
					}),
					alt: fields.text({
						label: "Alt",
						description: "Text to showup in place of the image",
						validation: { isRequired: true },
					})
				}, {
					layout: [6, 6]
				}),
				departments: fields.relationship({
					label: "Department",
					description: "Select a depart the person works in",
					collection: "departments",
					validation: { isRequired: true },
				}),
				name: fields.slug({
					name: {
						label: "Name",
						description: "Full name of the person",
						validation: { isRequired: true },
					},
					slug: {
						label: "Slug Path",
						description: "Insert department_name/name",
					}
				}),
				info: fields.object({
					contact: fields.text({
						label: "Contact # (optional)",
						description: "Public contact number.",
						validation: {
							length: {
								min: 0,
								max: 13
							},
						},
					}),
					qualifications: fields.array(
						fields.text({
							label: "Qualification",
							description: "Degree / Institute",
							validation: { isRequired: true },
						}), {
						label: "Qualifications",
						description: "Insert qualifiation in descending hierarchy",
						itemLabel: props => props.value,
					}
					),
					designations: fields.array(
						fields.relationship({
							label: "Desgination",
							description: "The main position given the person.",
							collection: 'designations',
							validation: { isRequired: true },
						}), {
						label: "Designations",
						description: "Select the desgiation or desginations give to the person",
						itemLabel: props => props.value,
					}
					),
				}, {
					layout: [12, 6, 6],
				}),
				content: fields.markdoc({
					label: "About",
					extension: "md"
				}),
			}
		}),
		departments: collection({
			label: "Departments",
			slugField: "name",
			path: "src/content/departments/*",
			format: { contentField: 'content' },
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					}
				}),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				memebers: fields.array(
					fields.relationship({
						label: "Name",
						collection: "faculty",
					}), {
					label: "Member",
					description: "Enter faculty members to the deparment.",
					itemLabel: props => props.value,
				}
				),
				content: fields.markdoc({
					label: "About",
					extension: 'md'
				}),
			}
		}),
		designations: collection({
			label: "Designations",
			slugField: "name",
			path: "src/content/designations/*",
			format: { contentField: "content" },
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					}
				}),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				content: fields.markdoc({
					label: "Content",
					extension: 'md'
				}),
			}
		}),
	},
});
