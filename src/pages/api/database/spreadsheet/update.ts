export const prerender = false;
import type {APIRoute} from 'astro';
import {formatDate} from '../../../../js/util';
import {getAuth} from 'firebase-admin/auth';
import {app} from '../../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
  const auth = getAuth(app);
  const url = import.meta.env.APPSCRIPT_URL;
  const id = request.headers.get('rowIndex')?.toString();
  const appscript = `${url}?type=update&id=${id}`;

  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const course = formData.get('course')?.toString();
  const totalfee = formData.get('totalfee')?.toString();
  const f_inst = formData.get('f_inst')?.toString();
  const f_due = formData.get('f_due')?.toString();
  const s_inst = formData.get('s_inst')?.toString();
  const s_due = formData.get('s_due')?.toString();
  const t_inst = formData.get('t_inst')?.toString();
  const t_due = formData.get('t_due')?.toString();
  const fth_inst = formData.get('fth_inst')?.toString();
  const fth_due = formData.get('fth_due')?.toString();


  if(!name || !course || !totalfee || !f_inst || !f_due || !s_inst || !s_due || !t_inst || !t_due || !fth_inst || !fth_due || !id){
    return new Response(showError('Missing Input'), {
      status:200,
    })
  }
  
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

  let d;
  let res;
  try{
    d = await fetch(appscript,{
      method:'POST',
      body:formData,
    })
    res = await d.json();
  }catch(err){
    return new Response(showError("Entry failed"),{
      status:200,
    })
  }


  return new Response( showSuccess(res.response.message) ,{
    status:200,
  })

  function showError(msg:string){
  const html = `
	      <span id='formRes' hx-swap-oob='true' class='relative block p-2 border-2 mb-2 border-red-600 bg-red-400 text-white rounded-md pr-8'>
		      ${msg}
		      <i class="fa-solid fa-circle-exclamation text-white absolute right-2 top-2"></i>
	      </span>
  `
      return html;
  }
  function showSuccess(msg:string){
  const html = `
	      <span id='formRes' hx-swap-oob='true' class='relative block p-2 border-2 mb-2 border-green-600 bg-green-400 text-white rounded-md pr-8'>
		      ${msg}
		      <i class="fa-solid fa-circle-exclamation text-white absolute right-2 top-2"></i>
	      </span>
  `
      return html;
  }
}
