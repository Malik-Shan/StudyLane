export const prerender = false;
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { app } from '../../../firebase/server';

export const DELETE = async ({ request }) => {
	const db = getFirestore(app);
	const auth = getAuth(app);

	const uid = request.headers.get('uid');
	const sessionCookie = request.headers.get('cookie').split('session=')[1];
	let decodedCookie;
	try {
		decodedCookie = await auth.verifySessionCookie(sessionCookie);
	} catch (err) {
		return new Response("Something went wrong", {
			status: 400,
		})
	}
	if (!decodedCookie.roles.includes('admin')) {
		return new Response("You're not an admin", {
			status: 400,
		})
	};
	auth.deleteUser('klsjfslfsljf').then(()=>{
		db.collection('user').doc(`${uid}`).delete().catch((e)=>{
			return new Response(JSON.stringify({errorInfo:e.errorInfo}))
		});
	}).catch((e)=>{
		return new Response(JSON.stringify({errorInfo:e.errorInfo}),{
			status:400,
		});
	});

	return new Response('', {
		status: 400,
	})

}
