import CourseTypes from './src/data/cms/course_types.json';
import ExamSystems from './src/data/cms/exam_systems.json';
import SubjectCategories from './src/data/cms/study_categories.json';
//import ArticleCategories from './src/data/cms/article_categories.json';
import { block } from '@keystatic/core/content-components'
import { config, fields, singleton, collection } from '@keystatic/core';
import { slugPathRegex, slugDoublePathRegex } from './src/lib/cms/lib/util.js';

import type { GitHubConfig, LocalConfig } from '@keystatic/core';
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
const githubmode: GitHubConfig['storage'] = { kind: 'github', repo: { owner: 'Malik-Shan', name: 'StudyLane' } };
const localmode: LocalConfig['storage'] = { kind: 'local' };
export default config({
	storage: import.meta.env.PROD ? githubmode : localmode,
	ui: {
		brand: {
			name: "StudyLane",
			mark: ({ colorScheme }) => {
				let path = colorScheme === 'dark'
					? '/assets/images/official/logo2-white.png'
					: '/assets/images/official/logo2.png';
				return <img src={path} height={24} />
			}
		},
		navigation: {
			material: ['library', 'subject_blog', 'study_categories'],
			blog: ['notice_board', 'article_categories'],
			course: [
				'courses', '---', 'course_sections', 'subjects', '---', 'course_types', 'exam_systems',
			],
			institue: [
				'faculty', 'designations',
			],
			settings: ['navigation', 'topheader'],
		},
	},
	singletons: {
		topheader: singleton({
			label: "Top Header",
			path: "src/data/cms/topheader",
			format: { data: 'json' },
			schema: {
				logo: fields.object({
					light: fields.object({
						large: fields.object({
							src: fields.pathReference({
								label: "Src",
								pattern: "public/assets/images/official/*",
							}),
							alt: fields.text({
								label: "Alt.",
							}),
						}, { layout: [6, 6], label: "Large Icon" }),
						small: fields.object({
							src: fields.pathReference({
								label: "Src",
								pattern: "public/assets/images/official/*",
							}),
							alt: fields.text({
								label: "Alt.",
							}),
						}, { layout: [6, 6], label: "Small Icon" }),
					}, {
						label: "Lightmode Image",
						description: "Site icon you want to use.",
					}),
					dark: fields.object({
						large: fields.object({
							src: fields.pathReference({
								label: "Src",
								pattern: "public/assets/images/official/*",
							}),
							alt: fields.text({
								label: "Alt.",
							}),
						}, { layout: [6, 6], label: "Large Icon" }),
						small: fields.object({
							src: fields.pathReference({
								label: "Src",
								pattern: "public/assets/images/official/*",
							}),
							alt: fields.text({
								label: "Alt.",
							}),
						}, { layout: [6, 6], label: "Small Icon" }),
					}, {
						label: "Darkmode Image",
						description: "Site icon you want to use.",
					}),
				}),
				navigation: fields.relationship({
					label: "Navigation",
					description: "Path to the navigation",
					collection: "navigation"
				}),
				backicon: fields.text({
					label: "Back Icon",
					description: "Icon you want for the back button.",
					validation: { isRequired: true },
				})
			}
		}),
		study_categories: singleton({
			label: "Subject Categories",
			path: "src/data/cms/study_categories",
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
							{ label: "Left Top", value: "left top" },
							{ label: "Top", value: "top" },
							{ label: "Right Top", value: "right top" },
							{ label: "Left", value: "left" },
							{ label: "Center", value: "center" },
							{ label: "Right", value: "right" },
							{ label: "Left Bottom", value: "left bottom" },
							{ label: "Bottom", value: "bottom" },
							{ label: "Right Bottom", value: "right bttom" },
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
						...SubjectCategories.categories.map((c) => (
							{ label: c.category.name, value: c.category.slug }
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
		subject_blog: collection({
			label: 'Subject Blog',
			slugField: 'title',
			path: 'src/content/subject_blog/*',
			entryLayout: 'content',
			format: { contentField: 'content' },
			schema: {
				draft: fields.checkbox({
					label: 'Draft',
				}),
				readtime: fields.checkbox({
					label: "Read Time",
					description: "Check if the read-time should be attached to the blog.",
					defaultValue: true,
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
				bannerImg: fields.conditional(
					fields.checkbox({
						label: "Add Banner",
						description: "Check if you want to add the banner image.",
						defaultValue: false,
					}),
					{
						true: fields.object({
							image: fields.image({
								label: "Banner",
								directory: 'src/assets/images/blog/subject_blog',
								publicPath: '../../assets/images/blog/subject_blog/',
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
						false: fields.empty()
					},
				),
				category: fields.array(
					fields.select({
						label: "Category",
						description: "Subject category of the book.",
						options: [
							{ label: "None", value: "none" },
							...SubjectCategories.categories.map((c) => (
								{ label: c.category.name, value: c.category.slug }
							)),
						],
						defaultValue: 'none',
					}), {
					label: "Category",
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
							directory: "src/assets/images/blog/subject_blog",
							publicPath: "../../assets/images/blog/subject_blog/",
						},
					},
					components: {
						DrivePreview: block({
							label: "Drive Preview",
							schema: {
								driveId: fields.text({
									label: "Drive Id",
									validation: { isRequired: true },
								}),
								name: fields.text({
									label: "Name",
									validation: { isRequired: true },
								}),
								type: fields.select({
									label: "File Type",
									description: "Select the type of file.",
									options: [
										{ label: "PDF", value: "pdf" },
										{ label: "JPG", value: "jpg" },
										{ label: "WEBP", value: "webp" },
										{ label: "PNG", value: "png" },
									],
									defaultValue: "pdf",
								})
							},
							ContentView: (props) => (
								<div>
									<iframe className='w-full mx-auto mb-4 border rounded-md' src={`https://drive.google.com/file/d/${props.value.driveId}/preview`} width="300" height="300" allow="autoplay"></iframe>
									<p>ID: {props.value.driveId}</p>
									<p>Name: {props.value.name}</p>
									<p>Type: {props.value.type}</p>
								</div>),
						}),
						YoutubeVideo: block({
							label: "Youtube Video",
							schema: {
								videoId: fields.text({
									label: "Video ID",
									validation: { isRequired: true },
								}),
								position: fields.select({
									label: "Position",
									description: "Position for the video.",
									options: [
										{ label: "Left", value: "left" },
										{ label: "Center", value: "center" },
										{ label: "Right", value: "right" },
									],
									defaultValue: 'center',
								}),
								timestamp: fields.object({
									hour: fields.integer({
										label: "Hour",
										description: "Hour of the video",
										defaultValue: 0,
										validation: { isRequired: true },
									}),
									minute: fields.integer({
										label: "Minute",
										description: "Minute of the video",
										defaultValue: 0,
										validation: { isRequired: true },
									}),
									second: fields.integer({
										label: "Second",
										description: "Second of the video",
										defaultValue: 0,
										validation: { isRequired: true },
									}),
								}, {
									label: "Timestamp",
									layout: [4, 4, 4],
								})
							},
							ContentView: (props) => (
								<div>
									<iframe className={`w-full max-w-[800px] rounded-md mb-4 aspect-video ml-auto mr-auto ${props.value.position === 'left' && 'mr-auto'} ${props.value.position === 'right' && 'ml-auto'} ${props.value.position === 'center' && 'mx-auto'}`} src={`https://www.youtube.com/embed/${props.value.videoId}${(props.value.timestamp.hour * 60 * 60) + (props.value.timestamp.minute * 60) + props.value.timestamp.second !== 0 ? `?start=${(props.value.timestamp.hour * 60 * 60) + (props.value.timestamp.minute * 60) + props.value.timestamp.second}` : ''}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
									<p>ID: {props.value.videoId}</p>
									<p>Position: {props.value.position}</p>
									<p>Hour: {props.value.timestamp.hour}</p>
									<p>Minute: {props.value.timestamp.minute}</p>
									<p>Secdon: {props.value.timestamp.second}</p>
								</div>),
						}),
					},
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
				img: fields.object({
					src: fields.image({
						label: "Src",
						description: "Choose image that best fit the course.",
						directory: "src/assets/images/course",
						publicPath: "../../../assets/images/course/",
						validation: { isRequired: true },
					}),
					alt: fields.text({
						label: "Alt",
						description: "Text to show for the image for accessibility.",
						validation: { isRequired: true },
					}),
					position: fields.select({
						label: "Position",
						description: "Choose the postion that will best show the content",
						options: [
							{ label: "Left Top", value: "left top" },
							{ label: "Top", value: "top" },
							{ label: "Right Top", value: "right top" },
							{ label: "Left", value: "left" },
							{ label: "Center", value: "center" },
							{ label: "Right", value: "right" },
							{ label: "Left Bottom", value: "left bottom" },
							{ label: "Bottom", value: "bottom" },
							{ label: "Right Bottom", value: "right bttom" },
						],
						defaultValue: "center",
					})
				}, {
					label: "Course Image",
					layout: [4, 4, 4],
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
					duration: fields.number({
						label: 'Duration (Year)',
						description: "Years on left and months within decimal point. Avoid trailing zeros. e.g 1.20 = 1.2 1.00 = 1 etc.",
						step: 0.1,
						validation: {
							isRequired: true,
							min: 0.1,
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
				course_section: fields.multiRelationship({
					label: "Section",
					collection: "course_sections",
					description: "Select the course section you wanna add. Or make a new one.",
				}),
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
				subjects: fields.multiRelationship({
					label: "Subject",
					collection: "subjects",
					description: "Subject part of this course section",
				}),
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
				reference_materials: fields.multiRelationship({
					label: "Reference Materials",
					description: "Reference a book from the library.",
					collection: "library",
				}),
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
					designation: fields.multiRelationship({
						label: "Desgination",
						description: "The main position given the person.",
						collection: 'designations',
					}),
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
