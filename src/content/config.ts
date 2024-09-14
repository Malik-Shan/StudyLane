import { defineCollection, z } from 'astro:content';

const subjectsCollection = defineCollection({});
const news = defineCollection({
	type: 'content',
	schema: z.object({
		draft: z.boolean(),
		published: z.date(),
		title: z.string(),
		bannerImg: z.string(),
		category: z.array(z.string()),
		tag: z.array(z.string()),
		postedBy: z.string(),
	})
});

export const collections = {
	'subjects': subjectsCollection,
	news,
}

