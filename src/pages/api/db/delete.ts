export const prerender = false;
import type { APIRoute } from "astro";
import { db, Audits, eq } from 'astro:db';

export const DELETE: APIRoute = async (ctx) => {
  await db.delete(Audits).where(eq(Audits.id, ctx.params.id ));
  return new Response(null, { status: 204 });
}
