import { optional } from 'astro/zod';
import { column, defineDb, defineTable,NOW } from 'astro:db';

const Audits = defineTable({
  columns:{
    id:column.number({primaryKey:true}),
    links:column.text({optional:true,default:""}),
    date: column.number({optional:false}),
  }
})

const Subjects = defineTable({
  columns: {
    id: column.text({primaryKey: true,unique:true}),
    name: column.text({optional: false}),
    sname: column.text({optional: false}),
    simg: column.text({optional: false}),
    outline: column.json({optional: false}),
    assignments: column.number({default:0}),
    t_topics: column.number({default:0,optional:false}),
    c_topics: column.number({default:0,optional:false}),
  },
  indexes: [
    {on: ["id"], unique: true},
  ]
})
const Courses = defineTable({
  columns: {
    cid: column.text({primaryKey: true, unique: true}),
    duration: column.number({optional:false}),
    data: column.json({optional: false}),
  },
  indexes: [
    {on: ["cid"], unique: true},
  ]
})

export default defineDb({
  tables: {Audits,Subjects ,Courses},
})
