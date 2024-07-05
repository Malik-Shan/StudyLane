export const prerender = false;
import type { APIRoute } from "astro";
import { db, eq,Audits } from 'astro:db';

export const DELETE: APIRoute = async (req) => {
  const ID:number = parseInt(req.params.id);
  const r = await db.delete(Audits).where(eq(Audits.id,ID));
  if(r.rowsAffected === 1){
    return new Response(null,{status:200});
  }else{
    return new Response(null, { status: 400 });
  };
}