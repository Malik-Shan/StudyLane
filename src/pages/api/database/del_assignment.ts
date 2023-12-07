export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {app} from '../../../firebase/server';

export const DELETE: APIRoute = async ({request}) => {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const sessionCookie = request.headers.get('cookie').split('session=')[1];
  let decodedCookie;
  try {
    decodedCookie = await auth.verifySessionCookie(sessionCookie);
  }catch(err){
    return new Response("Not Authorized",{
      status:400,
    })
  }
  if(!decodedCookie.admin){
    return new Response("Unauthorized",{
      status:401,
    })
  }

  const id = request.headers.get('assign-id');
  try{
    await db.collection('assignments').doc(id).delete();
  }catch(err){
    return new Response("Something went wrong",{
      status:400,
    })
  }

  return new Response( '' ,{
    status:200,
  })

}
