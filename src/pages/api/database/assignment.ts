export const prerender = false;
import type {APIRoute} from 'astro';
import {getAuth} from 'firebase-admin/auth';
import {app} from '../../../firebase/server';
import {formatDate, showSuccess} from '../../../js/util';
const url = import.meta.env.ASSIGN_API;

export const POST: APIRoute = async ({request}) => {
  const auth = getAuth(app);
  const appscript = `${url}?type=newentry&course=bs-it-s1`;

  const formData = await request.formData();
  const id = new Date().getTime().toString();
  formData.append('id', id);
  formData.append('status','open');
  const assignment = formData.get('assignment')?.toString();
  const link = formData.get('link')?.toString();
  const type = formData.get('assign_type')?.toString();
  const subject = formData.get('subject')?.toString();
  const date = formData.get('date')?.toString();

  const g = new Date(date);
  const c = new Date();
  
  const sessionCookie = request.headers.get('cookie').split('session=')[1];
  let decodedCookie;
  try {
    decodedCookie = await auth.verifySessionCookie(sessionCookie);
  }catch(err){
    return new Response("Not Authorized",{
      status:400,
      headers:{
        'HX-Trigger': 'error',
      }
    })
  }
  if(!decodedCookie.admin){
    return new Response("Unauthorized",{
      status:401,
      headers:{
        'HX-Trigger': 'error',
      }
    })
  }
  if(!assignment || !link || !subject || !date || !type){
    return new Response("Missing Input",{
      status:400,
      headers:{
        'HX-Trigger': 'input_error',
      }
    })
  }

  let d;
  let r;
  try{
    d = await fetch(appscript,{
      method: 'POST',
      body: formData,
    })
    r = await d.json();
  }catch(err){
    return new Response('Process Failed',{
      status:400,
      headers:{
        'HX-Trigger': 'error',
      }
    })
  }
  const html = `
    <div data-id='${id}' id='assign-${id}' class='assignment [&.htmx-request]:opacity-50 [&.htmx-request]:pointer-events-none [&.htmx-request]:animate-pulse relative group/assign bg-green-200 ${g < c ? "bg-red-200" : ""}'>
      ${
        decodedCookie.admin && (
          `<button hx-post="/api/database/del_assignment" hx-swap="delete swap:400ms" hx-confirm="Are you sure?" hx-target='#assign-${id}' hx-indicator='#assign-${id}' hx-headers='{"assign-id":"${id}"}' type="button" class="absolute hidden right-2 top-[calc(100%_-_25px)] -translate-y-1/2 group-hover/assign:block bg-red-500 text-white p-1 px-2 rounded-md "
          >
            <i class="fa-solid fa-trash-can" />
          </button>`
        )
      }
      <div class="imp">
        <span class="tag" data-type='${type.toLowerCase()}'>${type}</span>
        <span class="tag subject" data-subject='${subject.toLowerCase()}'>${subject}</span>
      </div>
      ${
      link === "" ? (
        `<p class="todo"><b>Todo: </b>${assignment}</p>`
      ): (

          `<a class='todo link' href='${link}'>
            <b>Todo: </b>${assignment}
          </a>`
        )
      }
      <p class="date"><b>Deadline: </b>${formatDate(date)}</p>
    </div>
  `

  return new Response( html ,{
    status:200,
  })

}
