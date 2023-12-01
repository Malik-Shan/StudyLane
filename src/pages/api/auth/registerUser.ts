export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {app} from '../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
  const db = getFirestore(app);
  const auth = getAuth(app);

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
    <div class='user' data-id='${uid}'>
    <p>${name}</p>
    <p>${email}</p>
    <p>${roles}</p>
    <button class='primaryBtn p-2 rounded-md border'><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
    </div>
`
  return new Response( html ,{
    status:200,
  })

}
