export const prerender = false;
import type { APIRoute } from "astro";
import { db,Audits as zAudits } from 'astro:db';


export const POST:APIRoute = async ({request}) => {
  const formData = await request.formData();
  const l = formData.get("links")?.toString().replace(/\r?\n/g, '\\n');
  const text = formData.get("links")?.toString()  
  const d = new Date().getTime();
  const r = await db.insert(zAudits).values({date:d,links:l});
  const html = `
    <div class="card" id='card-${r.lastInsertRowid}'>
    <button hx-delete='/api/db/delete/${r.lastInsertRowid}' hx-swap="outerHTML" hx-target='#card-${r.lastInsertRowid}'>Delete</button>
    <h2>${new Date(d).toLocaleString('en-US',{timeZone:'Asia/Karachi'})}</h2>
    <p>${text}</p>
    </div>
  `;
  if(r.rowsAffected === 1){
    return new Response(html,{
      status:200});
  }else{
    return new Response('Error adding data',{status:400});
  }
};
