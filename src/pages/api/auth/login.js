export const prerender = false;
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const POST = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      "No token found",
      { status: 401 }
    );
  }
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }
  const validFor = 60 * 60 * 24 * 1 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: validFor,
  });
  cookies.set("session", sessionCookie, {
    path: "/",
  });
  return redirect("/");
};
