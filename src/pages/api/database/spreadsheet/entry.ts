export const prerender = false;
import type {APIRoute} from 'astro';
import {formatDate} from '../../../../js/util';
import {getAuth} from 'firebase-admin/auth';
import {app} from '../../../../firebase/server';

export const POST: APIRoute = async ({request}) => {
  const auth = getAuth(app);
  const url = import.meta.env.APPSCRIPT_URL;
  const appscript = `${url}?type=newentry`;
  const uniqueID = new Date().getTime().toString();

  const formData = await request.formData();
  formData.append('id',uniqueID);
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


  if(!name || !course || !totalfee || !f_inst || !f_due || !s_inst || !s_due || !t_inst || !t_due || !fth_inst || !fth_due){
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
  let res
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
  const rowIndex = res.response.newIndex;
  const first = f_inst.split('/');
  const second = s_inst.split('/');
  const third = t_inst.split('/');
  const fourth = fth_inst.split('/');

  const cardHTML = `
    <div id='card-${uniqueID}' class='info-card [&.htmx-request]:opacity-50 bg-slate-100 border border-slate-300 shadow-sm shadow-slate-400 rounded-md p-2'>

      <div class='btnsGroup flex flex-row gap-1'>

	<a href='/admin/fees-payment/${rowIndex}' class='inline-block primaryBtn border p-1 px-2 rounded-md'>
	  <i class="fa-solid fa-pen-to-square"></i>
	</a>

	<button hx-post='/api/database/spreadsheet/deleteCard' hx-swap='delete'  hx-target='#card-${uniqueID}' hx-indicator='#card-${uniqueID}' hx-headers='{"id": "${uniqueID}"}' class='inline-block dangerBtn border p-1 px-2 rounded-md'>
	    <i class="fa-solid fa-trash-can"></i>
	</button>

      </div>

      <div class='tags flex flex-row gap-1 mb-2 justify-center'>
	<span>${course}</span>
	  ${
	  (first[0] === first[1] && second[0] === second[1] && third[0] === third[1] && fourth[0] === fourth[1]) ? ("<span class='complete-payment'>Complete</span>") : ('')
	  }
      </div>
      <div class='student-info bg-slate-200 p-1 rounded-md mb-2 text-center'>
	<h3 id='id-${uniqueID}' class='font-bold'>#${uniqueID}</h3>
	<h3 id='name-${uniqueID}' class='font-bold'>${name}</h3>
      </div>

      <div class='installments flex flex-col w-full items-center gap-1 p-1 bg-slate-200 rounded-md'>
	<span class='info-title'>1st Installment (${formatDate(f_due)})</span>
	<span class='installment' data-type=${first[0] !== first[1] ? ('unpaid') : ('')}>${f_inst}</span>
	<span class='info-title'>2nd Installment (${formatDate(s_due)})</span>
	<span class='installment' data-type=${second[0] !== second[1] ? ('unpaid') : ('')}>${s_inst}</span>
	<span class='info-title'>3rd Installment (${formatDate(t_due)})</span>
	<span class='installment' data-type=${third[0] !== third[1] ? ('unpaid') : ('')}>${t_inst}</span>
	<span class='info-title'>4th Installment (${formatDate(fth_due)})</span>
	<span class='installment' data-type=${fourth[0] !== fourth[1] ? ('unpaid') : ('')}>${fth_inst}</span>
	<span class='info-title'>Total Fee</span>
	<span class='total w-full p-1 rounded-md text-center bg-sky-800 text-sky-200'>${totalfee}</span>
      </div>
    </div>
  `

  return new Response( cardHTML ,{
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
}
