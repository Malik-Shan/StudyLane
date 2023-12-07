import type {APIRoute} from 'astro';

export const POST: APIRoute = async ({cookies}) => {
  cookies.delete("session", {
    path: "/",
  })
  return new Response("Logout Successful", {
    status: 303,
    headers: {
      "HX-Redirect" : "/",
    }
  })
}
