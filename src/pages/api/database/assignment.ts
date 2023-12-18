export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {app} from '../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const formData = await request.formData();
  const assignment = formData.get('assignment')?.toString();
  const link = formData.get('link')?.toString();
  const type = formData.get('type')?.toString();
  const subject = formData.get('subject')?.toString();
  const date = formData.get('date')?.toString();
  
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
  if(!assignment || !link || !subject || !date){
    return new Response("Missing Input",{
      status:400,
    })
  }

  const assignmentRef = db.collection('assignments');
  let id;
  try {
    id = await assignmentRef.add({
      assignment,
      link,
      type,
      subject,
      date,
    })
  }catch(err){
    return new Response("Something went wrong",{
      status:400,
    })
  }
  const html = `
  <div data-id='${id}' id='assign-${id}' class='assignment relative group/assign'>
    ${
    decodedCookie.admin && (
      `<button 
        hx-delete='/api/database/del_assignment'
        hx-swap='delete swap:400ms'
        hx-confirm='Are you sure?'
        hx-target='#assign-${id}'
        hx-indicator='#assign-${id}'
        hx-headers='{"assign-id":"${id}"}'
        type='button' class='absolute hidden right-0 top-1/2 -translate-y-1/2 group-hover/assign:block bg-red-500 text-white p-1 px-2 rounded-md max-sm:block max-sm:right-2 max-sm:top-[calc(100%_-_25px)]'>
        <i class="fa-solid fa-trash-can"></i>
      </button>`
    )
    }
    <p class='todo'>${assignment}</p>
    <div class='imp px-4'>
      <span class='tag' data-type='${type.toLowerCase()}'>${type}</span>
      <span class='tag' data-subject='${subject.toLowerCase()}'>${subject}</span>
      ${
      link !== '/' &&     `<a class='tag' data-type='link' href=${link}>Link</a>`
      }
    </div>
    <p class='date'>${date}</p>
  </div>
  `

  return new Response( html ,{
    status:200,
  })

}
