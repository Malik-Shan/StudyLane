export const prerender = false;

export const POST = async ({cookies}) => {
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
