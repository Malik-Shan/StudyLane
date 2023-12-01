export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {app} from '../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
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
  const rolesLength = Object.keys(customClaims).length;
  try {
    const user = await auth.createUser({
      email,
      password,
      displayName:name,
      photoURL:'https://i.postimg.cc/V6YpBkFt/profile-Img.webp'
    })
    const uid = user.uid;
    await auth.setCustomUserClaims(uid, customClaims);

  } catch(err){
    return new Response("Something went wrong",{
      status:400,
    })
  }

  return new Response("User Registered" ,{
    status:200,
  })

}
