import { column, defineDb, defineTable } from 'astro:db';

const Data = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    a: column.text(),
    s: column.text(),
  }
})
const Courses = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    name: column.text(),
    duration: column.number(),
  }
})

export default defineDb({
  tables: {Data, Courses},
})
