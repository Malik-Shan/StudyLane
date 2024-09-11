import { config, fields, collection } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},

	collections: {
		posts: collection({
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
				duration: fields.integer({
					label: 'Duration',
					validation: {
						isRequired: true,
						min: 1,
						max: 5,
					}
				}),
				subjects: fields.array(
					fields.relationship({
						label: 'Subjects',
						collection: 'subjects',
						validation: {
							isRequired: true,
						},
					}),
					{
						label: 'Subject',
						itemLabel: props => props.value ?? 'Select a subject'
					}
				),
				content: fields.markdoc({
					extension: 'md',
					label: 'About',
				}),
			},
		}),
		subjects: collection({
			label: 'Subjects',
			slugField: 'title',
			path: 'src/content/subjects/*',
			format: { contentField: 'content' },
			schema: {
				code: fields.text({ label: 'Subject Code' }),
				title: fields.slug({
					name: { label: 'Title' },
				}),
				content: fields.markdoc({
					extension: 'md',
					label: 'Content',
				}),
			},
		}),
		blog: collection({
			label: 'Blog Posts',
			slugField: 'title',
			path: 'src/content/blogs/*',
			entryLayout: 'content',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'Title' },
				}),
				duration: fields.number({
					label: 'Duration',
					step: 1,
					validation: {
						min: 1,
						max: 5,
					}
				}),
				content: fields.markdoc({
					extension: 'md',
					label: 'Content',
				}),
			},
		}),
	},
});
