export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {app} from '../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const sessionCookie = request.headers.get('cookie').split('session=')[1];

  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const roles = formData.get('roles')?.toString();
  
  if(!name || !email || !password){
    return new Response("Missing Input",{
      status:400,
    })
  }

  let decodedCookie;
  try{
    decodedCookie = await auth.verifySessionCookie(sessionCookie);
  }catch(err){
    return new Response("Something went wrong", {
      status:400,
    })
  }
  if(!decodedCookie.admin){
    return new Response("You're not an admin",{
      status:400,
    })
  }

  const customClaims = {};
  const rolesMap = roles.split(',');
  rolesMap.map((r) => {
    customClaims[r] = true
  })
  let uid;
  try {
    const user = await auth.createUser({
      email,
      password,
      displayName:name,
      photoURL:'https://i.postimg.cc/V6YpBkFt/profile-Img.webp'
    })
    uid = user.uid;
    await auth.setCustomUserClaims(uid, customClaims);
    const usersRef = db.collection('users').doc(uid);
    await usersRef.set({
      name,
      email,
      roles
    })
  } catch(err){
    return new Response("Something went wrong",{
      status:400,
    })
  }
const html = `
				<div class='user' data-id={u.uid} id='uid-${uid}'}>
					<p>${name}</p>
					<p>${email}</p>
					<p>${roles}</p>
					<button class='secondaryBtn p-1 px-2 rounded-md border'><i class="fa-solid fa-pen-to-square"></i></button>
					<button class='dangerBtn p-1 px-2 rounded-md border'
						hx-delete='/api/auth/del_user'
						hx-swap='delete swap:400ms'
						hx-headers=''{"uid":"${uid}"}'
						hx-target='#uid-${uid}'
						hx-trigger='click'
						hx-confirm='Are you sure?'
						type='button'><i class="fa-solid fa-trash"></i></button>
				</div>
`
  return new Response( html ,{
    status:200,
  })

}
