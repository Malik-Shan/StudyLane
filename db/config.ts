import { column, defineDb, defineTable } from 'astro:db';

const Subjects = defineTable({
  columns: {
    sid: column.text({primaryKey: true}),
    sname: column.text({optional: false}),
    ssname: column.text({optional: false}),
    simg: column.text({optional: false}),
  },
  indexes: [
    {on: ["sid"], unique: true},
  ]
})
const Data = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    a: column.text(),
    s: column.text(),
  }
})
const Courses = defineTable({
  columns: {
    cid: column.text({primaryKey: true}),
    duration: column.number(),
    data: column.json(),
  },
  indexes: [
    {on: ["cid"], unique: true},
  ]
})

export default defineDb({
  tables: {Subjects, Data, Courses},
})
