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
    id: column.number({primaryKey: true}),
    name: column.text(),
    duration: column.number(),
    subject: column.text({references: () => Subjects.columns.sid}),
  }
})

export default defineDb({
  tables: {Subjects, Data, Courses},
})
