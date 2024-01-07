export const prerender = false;
import type {APIRoute} from 'astro';

export const POST: APIRoute = async ({request}) => {
const u = `https://script.google.com/macros/s/AKfycbykVviLWwTy2gCldA8UeY5LbM0TOeyOLN8JU6niwelsntCsOE5ylht09YWlUch93yiDOQ/exec?id=8`;
  const formData = new FormData();
  formData.append('id','5');
  try{
    await fetch(u,{
      method: "POST",
    })
  } catch(err){
    return new Response("Error", {
      status:400,
    })
  }

  return new Response( 'Success' ,{
    status:200,
  })

}
