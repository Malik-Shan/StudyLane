export const prerender = false;
import type { APIRoute } from "astro";
import { db, eq,Audits } from 'astro:db';

export const DELETE: APIRoute = async (req) => {
  const ID:number = parseInt(req.params.id);
  await db.delete(Audits).where(eq(Audits.id,ID));
  return new Response(null, { status: 204 });
}
