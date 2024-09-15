import { defineCollection, reference, z } from 'astro:content';

const subjectsCollection = defineCollection({});
const newsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		draft: z.boolean(),
		published: z.date(),
		title: z.string(),
		bannerImg: z.string(),
		category: z.array(reference('categories')),
		tag: z.array(z.string()),
		postedBy: z.string(),
	})
});
const categoriesCollection = defineCollection({});
const coursesCollection = defineCollection({});

export const collections = {
	'subjects': subjectsCollection,
	'categories': categoriesCollection,
	'news': newsCollection,
	'courses': coursesCollection,
}

