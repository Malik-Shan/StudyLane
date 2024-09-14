import { config, fields, collection } from '@keystatic/core';

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
				'---',
				'courses', 'subjects'],
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
			slugField: 'title',
			path: 'src/content/courses/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: {
						label: 'Title',
						validation: { isRequired: true }
					}
				}),
				information: fields.object({
					type: fields.select({
						label: "Type",
						options: [
							{ label: "None", value: "none" },
							{ label: "Intermediate", value: "intermediate" },
							{ label: "ADS", value: "ads" },
							{ label: "BS", value: "bs" },
							{ label: "Masters", value: "masters" }
						],
						defaultValue: "none"
					}),
					exam_system: fields.select({
						label: "Exam System",
						options: [
							{ label: "None", value: "none" },
							{ label: "Semester", value: "semester" },
							{ label: "Annual", value: "annual" }
						],
						defaultValue: 'none',
					}),
					duration: fields.integer({
						label: 'Duration',
						validation: {
							isRequired: true,
							min: 1,
							max: 5,
						},
						defaultValue: 0,
					}),
					eligibility: fields.text({
						label: "Eligibility",
						multiline: true,
					}),
				}, {
					layout: [4, 4, 4, 12],
				}),
				schedule: fields.array(
					fields.object({
						subject: fields.relationship({
							label: "Subject",
							collection: "subjects",
							validation: { isRequired: true },
						}),
						time: fields.text({
							label: "Time",
							validation: { isRequired: true },
							defaultValue: '00:00AM'
						}),
						teacher: fields.relationship({
							label: "Lecturer",
							collection: "faculty",
						}),
					}), {
					label: "Schedule",
					itemLabel: props => props.fields.subject.value,
				},
				),
				subjects: fields.array(
					fields.relationship({
						label: 'Subject',
						collection: 'subjects',
						validation: {
							isRequired: true,
						},
					}),
					{
						label: 'Subjects',
						itemLabel: props => props.value ?? 'Select a subject'
					},
				),
				content: fields.markdoc({
					extension: 'md',
					label: 'About',
				}),
			},
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
