import {defineCollection} from 'astro:content';

const subjectsCollection = defineCollection({});

export const collections = {
  'subjects' : subjectsCollection,
}

