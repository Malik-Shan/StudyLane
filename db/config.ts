import { column, defineDb, defineTable } from 'astro:db';

const Data = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    a: column.text(),
    s: column.text(),
  }
})

export default defineDb({
  tables: {Data},
})
