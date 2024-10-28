export const prerender = false;
import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { app } from '../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
	const auth = getAuth(app);
	const url = import.meta.env.ASSIGN_API;
	const id = request.headers.get('assign-id')?.toString();
	const appscript = `${url}?type=delete&id=${id}&course=bs-it-s1`;

	if (!id) {
		return new Response(showError('Missing Input'), {
			status: 400,
			headers: {
				'HX-Trigger': 'input_error',
			}
		})
	}

	const sessionCookie = request.headers.get('cookie').split('session=')[1];
	let decodedCookie;
	try {
		decodedCookie = await auth.verifySessionCookie(sessionCookie);
	} catch (err) {
		return new Response("Not Authorized", {
			status: 400,
			headers: {
				'HX-Trigger': 'error',
			}
		})
	}
	if (!decodedCookie.roles.includes('admin')) {
		return new Response("Unauthorized", {
			status: 401,
			headers: {
				'HX-Trigger': 'error',
			}
		})
	}

	let d;
	let res;
	try {
		d = await fetch(appscript, {
			method: 'POST',
		})
		res = await d.json();
	} catch (err) {
		return new Response(showError("Entry failed"), {
			status: 400,
			headers: {
				'HX-Trigger': 'error',
			}
		})
	}


	return new Response(showSuccess(res.response.message), {
		status: 200,
	})

	function showError(msg: string) {
		const html = `
	      <span id='toast' class='relative block p-2 border-2 mb-2 border-red-600 bg-red-400 text-white rounded-md pr-8'>
		      ${msg}
		      <i class="fa-solid fa-circle-exclamation text-white absolute right-2 top-2"></i>
	      </span>
  `
		return html;
	}
	function showSuccess(msg: string) {
		const html = `
	      <span id='toast' hx-swap-oob='true' class='relative block p-2 border-2 mb-2 border-green-600 bg-green-400 text-white rounded-md pr-8'>
		      ${msg}
		      <i class="fa-solid fa-circle-exclamation text-white absolute right-2 top-2"></i>
	      </span>
  `
		return html;
	}
}
