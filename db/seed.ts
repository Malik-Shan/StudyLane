import { db, Data } from 'astro:db';

export default async function() {
  await db.insert(Data).values([
    {a:"Math test here", s: "Math"},
    {a: "English tet here", s: "English"},
  ])
}
