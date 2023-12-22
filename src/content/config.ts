import {defineCollection} from 'astro:content';

const subjectsCollection = defineCollection({});
const news = defineCollection({});

export const collections = {
  'subjects' : subjectsCollection,
  news,
}

