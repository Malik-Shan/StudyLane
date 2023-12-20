import {defineCollection} from 'astro:content';

const subjectsCollection = defineCollection({});
const calc_s1 = defineCollection({});

export const collections = {
  'subjects' : subjectsCollection,
  'calculus-and-analytic-geometry-s1' : calc_s1,
}

