import { config, fields, singleton, collection } from '@keystatic/core';
import { slugPathRegex, slugDoublePathRegex, coursesectionPathRegx } from './src/lib/cms/lib/util.js';
interface JSONData {
	title: string;
	warning: string;
	types: Array<{
		abbreviation: string;
		full_name: {
			name: string;
			slug: string;
		};
	}>;
};
import CourseTypes from './src/data/cms/course_types.json';
import ExamSystems from './src/data/cms/exam_systems.json';
import LibraryCategories from './src/data/cms/library_categories.json';
//import ArticleCategories from './src/data/cms/article_categories.json';

export default config({
	storage: {
		kind: 'local',
	},
	ui: {
		brand: {
			name: "StudyLane",
			mark: ({ colorScheme }) => {
				let path = colorScheme === 'dark'
					? '/assests/images/official/logo2-white.png'
					: '/assests/images/official/logo2.png';
				return <img src={path} height={24} />
			}
		},
		navigation: {
			posts: ['article_categories', 'notice_board'],
			institue: [
				'faculty', 'designations',
			],
			education: [
				'courses', 'course_sections', 'subjects'
			],
			material: ['library_categories', 'library'],
			settings: ['navigation'],
			data: ['course_types', 'exam_systems', 'article_categories']
		},
	},
	singletons: {
		library_categories: singleton({
			label: "Library Categories",
			path: "src/data/cms/library_categories",
			format: { data: 'json' },
			schema: {
				categories: fields.array(
					fields.object({
						category: fields.slug({
							name: {
								label: "Name",
								description: "Name of the category",
								validation: { isRequired: true },
							},
							slug: {
								label: "Slug",
								description: "Slugified category name.",
							}
						}),
					}), {
					label: "Categories",
					itemLabel: props => props.fields.category.value.name,
				}
				)
			}
		}),
		article_categories: singleton({
			label: "Categories",
			path: "src/data/cms/article_categories",
			format: { data: 'json' },
			schema: {
				categories: fields.array(
					fields.object({
						name: fields.text({
							label: "Name",
							description: "Name of the category",
							validation: { isRequired: true },
						}),
						children: fields.array(
							fields.text({
								label: "Name",
								description: "Name of the category.",
								validation: { isRequired: true },
							}), {
							label: "Children",
							itemLabel: props => props.value,
						},
						),
					}), {
					label: "Categories",
					itemLabel: props => props.fields.name.value,
				}
				)
			}
		}),
		course_types: singleton({
			label: 'Course Types',
			path: 'src/data/cms/course_types',
			format: { data: 'json' },
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				warning: fields.text({
					label: "Warning",
					multiline: true,
				}),
				types: fields.array(
					fields.object({
						abbreviation: fields.text({
							label: "Abbreviation",
							validation: { isRequired: true },
						}),
						full_name: fields.slug({
							name: {
								label: "Full Name",
								validation: { isRequired: true },
							},
						}),
					}),
					{
						label: "Types",
						itemLabel: props => props.fields.abbreviation.value,
					}
				)
			}
		}),
		exam_systems: singleton({
			label: 'Exam Systems',
			path: 'src/data/cms/exam_systems',
			format: { data: 'json' },
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				warning: fields.text({
					label: "Warning",
					multiline: true,
				}),
				types: fields.array(
					fields.object({
						abbreviation: fields.text({
							label: "Abbreviation",
							validation: { isRequired: true },
						}),
						full_name: fields.slug({
							name: {
								label: "Full Name",
								validation: { isRequired: true },
							},
						}),
						exam_period: fields.text({
							label: "Period",
							validation: { isRequired: true },
						})
					}),
					{
						label: "Types",
						itemLabel: props => props.fields.abbreviation.value,
					}
				)
			}
		})
	},
	collections: {
		library: collection({
			label: "Library",
			path: "src/content/library/*",
			slugField: "name",
			format: { contentField: 'content' },
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						description: "Name of the book",
						validation: { isRequired: true },
					},
					slug: {
						label: "File Name",
						description: "Insert the one author & edition into the slug for unique identification. e.g generated-slug-[author]-[edition-number]",
					}
				}),
				thumbnail: fields.object({
					img: fields.image({
						label: "Image",
						description: "Image of the book.",
						validation: { isRequired: true },
						directory: "src/assets/images/library",
						publicPath: "../../assets/images/library/",
					}),
					position: fields.select({
						label: "Position",
						description: "The position the image will use.",
						options: [
							{ label: "Left Top", value: "left-top" },
							{ label: "Top", value: "top" },
							{ label: "Right Top", value: "right-top" },
							{ label: "Left", value: "left" },
							{ label: "Center", value: "center" },
							{ label: "Right", value: "right" },
							{ label: "Left Bottom", value: "left-bottom" },
							{ label: "Bottom", value: "bottom" },
							{ label: "Right Bottom", value: "right-bttom" },
						],
						defaultValue: 'center'
					}),
					alt: fields.text({
						label: "Alt",
						description: "Alt text for the image",
						validation: { isRequired: true },
					})
				}, {
					layout: [4, 4, 4],
				}),
				edition: fields.integer({
					label: "Edition",
					description: "Edition of the book.",
					validation: {
						isRequired: true,
						min: 1, max: 50
					},
				}),
				category: fields.select({
					label: "Category",
					description: "Subject category of the book.",
					options: [
						{ label: "None", value: "none" },
						...LibraryCategories.categories.map((c) => (
							{ label: c.category.name, value: c.category.name }
						)),
					],
					defaultValue: 'none',
				}),
				drive_id: fields.url({
					label: "ID",
					description: "ID of the google drive file.",
					validation: { isRequired: true },
				}),
				author: fields.array(
					fields.text({
						label: "Author",
						description: "Name of the book author.",
						validation: { isRequired: true },
					}),
					{
						label: "Author",
						itemLabel: props => props.value
					},
				),
				content: fields.markdoc({
					label: "Content",
					options: {
						image: {
							directory: "src/assets/images/library",
							publicPath: "../../assets/imges/library/",
						}
					}
				})
			},
		}),
		navigation: collection({
			label: "Navigation",
			slugField: 'name',
			path: 'src/content/navigation/*',
			format: { data: 'json' },
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					}
				}),
				navigation: fields.array(
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
					}),
					{
						label: "Navigation",
						itemLabel: props => props.fields.name.value,
					}
				),
			}
		}),
		notice_board: collection({
			label: 'Notice Board',
			slugField: 'title',
			path: 'src/content/noticeboard/*',
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
				bannerImg: fields.object({
					image: fields.image({
						label: "Banner",
						directory: 'src/assets/images/notice',
						publicPath: '../../assets/images/notice/',
						validation: {
							isRequired: true,
						},
					}),
					alt: fields.text({
						label: "Alt",
						description: "Name to show if image doesn't render.",
						validation: { isRequired: true },
					})
				}),
				category: fields.array(
					fields.text({
						label: "Name",
						description: "Name of the cateogry",
						validation: { isRequired: true },
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
					defaultValue: 'admin',
				}),
				content: fields.markdoc({
					label: 'Body',
					options: {
						image: {
							directory: "src/assets/images/notice",
							publicPath: "../../assets/images/notice/",
						},
					}
				})
			},
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
						description: "Path of course course_type/course_name. (e.g bs/information-technology-[custom]). Use custom if needed.",
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
							{ label: "other", value: "other" },
							...(CourseTypes as JSONData).types.map((t) => ({
								label: t.abbreviation + " " + `[${t.full_name.name}]`,
								value: t.abbreviation,
							})),
						],
						defaultValue: "other"
					}),
					exam_system: fields.select({
						label: "Exam System",
						description: "Type of exam system of course",
						options: [
							{ label: "None", value: "none" },
							...(ExamSystems as JSONData).types.map((t) => ({
								label: t.abbreviation + " " + `[${t.full_name.name}]`,
								value: t.abbreviation,
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
				course_section: fields.array(
					fields.relationship({
						label: "Section",
						collection: "course_sections",
						description: "Select the course section you wanna add. Or make a new one.",
						validation: { isRequired: true },
					}), {
					label: "Course Section",
					itemLabel: props => props.value,
				},
				),
				content: fields.markdoc({
					label: 'About',
					options: {
						image: {
							directory: "src/assets/images",
							publicPath: "../../assets/images/",
						}
					}
				}),
			},
		}),
		course_sections: collection({
			label: "Course Sections",
			slugField: 'course_section',
			path: "src/content/course_sections/**",
			format: { data: 'json' },
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					description: "Make this course section a draft",
					defaultValue: false,
				}),
				section_type: fields.text({
					label: "Section Type",
					description: "The the type of the section. e.g Semester, Part, Year etc",
					validation: { isRequired: true },
				}),
				section_part: fields.integer({
					label: "Section Part",
					description: "The current part of the section.",
					validation: {
						isRequired: true,
						min: 1,
						max: 10,
					},
				}),
				course_section: fields.slug({
					name: {
						label: "Course Section",
						description: "Name of the course's section. e.g Semester 1, Part 1",
						validation: {
							isRequired: true,
						},
					},
					slug: {
						label: "Slug",
						description: "Slug path for course section. e.g course_type/course_name/section_name",
						validation: {
							pattern: {
								regex: slugDoublePathRegex(CourseTypes),
							}
						}
					}
				}),
				subjects: fields.array(
					fields.relationship({
						label: "Subject",
						collection: "subjects",
						description: "Subject part of this course section",
						validation: { isRequired: true }
					}),
					{
						label: "Subjects",
						itemLabel: props => props.value,
					}
				),
				schedule: fields.array(
					fields.object({
						subject: fields.relationship({
							label: "Subject",
							description: "Subject to be included in this schedule",
							collection: "subjects",
							validation: { isRequired: true },
						}),
						time: fields.text({
							label: "Time",
							description: "Time when the lecture will commence",
							validation: {
								isRequired: true,
								pattern: {
									regex: /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/,
									message: "Use the format of 00:00am/00:00pm",
								}
							}
						}),
						faculty: fields.relationship({
							label: "Faculty",
							description: "Faculty memeber taking class",
							collection: "faculty",
							validation: { isRequired: true },
						}),
					}), {
					label: "Schedule",
					itemLabel: props => props.fields.subject.value,
				}
				)
			}
		}),
		subjects: collection({
			label: 'Subjects',
			slugField: 'code',
			path: 'src/content/subjects/*',
			format: { data: 'json' },
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					defaultValue: false,
				}),
				name: fields.text({ label: 'Subject Name', validation: { isRequired: true } }),
				code: fields.slug({
					name: {
						label: 'Subject Code',
						validation: { isRequired: true }
					},
					slug: {
						label: "Slug Path",
						description: "File path include abbreviation for the subject name. [abbreviation]-generated-slug. e.g  oop-cs-102."
					}
				}),
				credit_hours: fields.conditional(
					fields.checkbox({
						label: "Credit Hours?",
						defaultValue: false,
					}),
					{
						true: fields.text({
							label: "Credit Hours",
							description: "Credit Hours of the subject.",
						}),
						false: fields.empty(),
					},
				),
				reference_materials: fields.array(
					fields.relationship({
						label: "Reference Materials",
						description: "Reference a book from the library.",
						collection: "library",
						validation: { isRequired: true },
					}), {
					label: "Reference Materials",
					itemLabel: props => props.value,
				}
				),
				outline: fields.array(
					fields.object({
						topic: fields.text({
							label: "Title",
							description: "Title of the main topic",
							validation: { isRequired: true },
						}),
						data: fields.conditional(
							fields.checkbox({
								label: "Main Topic?",
								defaultValue: false,
							}),
							{
								true: fields.array(
									fields.object({
										topic: fields.text({
											label: "Topic",
											description: "Name of the topic.",
											validation: { isRequired: true },
										}),
										taught: fields.checkbox({
											label: "Taught?",
											description: "Have the topic been taught?",
											defaultValue: false,
										})
									}), {
									label: "Topics",
									itemLabel: props => props.fields.topic.value
								}
								)
								,
								false: fields.object({
									taught: fields.checkbox({
										label: "Taught?",
										description: "Have the topic been taught?",
									}),
								}),
							}
						)
					})
					, {
						label: "Outline",
						itemLabel: props => props.fields.topic.value
					},
				),
			},
		}),
		faculty: collection({
			label: "Faculty",
			slugField: "name",
			path: "src/content/faculty/*",
			format: { data: 'json' },
			schema: {
				draft: fields.checkbox({
					label: "Draft",
					description: "Is this faculty member a draft",
					defaultValue: false,
				}),
				profile: fields.object({
					image: fields.image({
						label: "Image",
						description: "Image of the person.",
						directory: "src/assets/images/faculty",
						publicPath: "../../assets/images/faculty/",
					}),
					alt: fields.text({
						label: "Alt",
						description: "Text to showup in place of the image",
						validation: { isRequired: true },
					})
				}, {
					layout: [6, 6]
				}),
				name: fields.slug({
					name: {
						label: "Name",
						description: "Full name of the person",
						validation: { isRequired: true },
					},
					slug: {
						label: "Slug Path",
						description: "Should be related to the person's name."
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
					email: fields.text({
						label: "Email (optional)",
						description: "Official email of the faculty member",
					}),
					qualification: fields.array(
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
					designation: fields.array(
						fields.relationship({
							label: "Desgination",
							description: "The main position given the person.",
							collection: 'designations',
							validation: { isRequired: true },
						}), {
						label: "Designation",
						description: "Select the desgiation or desginations give to the person",
						itemLabel: props => props.value,
					}
					),
				}, {
					layout: [6, 6, 6, 6],
				}),
				description: fields.text({
					label: "Description",
					description: "Description about the faculty.",
					multiline: true,
				})
			}
		}),
		designations: collection({
			label: "Designations",
			slugField: "name",
			path: "src/content/designations/*",
			format: { data: 'json' },
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
			}
		}),
	},
});
