export function slugify(text){
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
export function formatAllPosts(posts, {
    filterOutDraft = true,
    sortByDate = true,
    limit = undefined,
} = {}){
    const filteredPosts = posts.reduce((acc, post) => {
        const {draft} = post.data;
        
        //filterOutDrafts if true
        if(filterOutDraft && draft) return acc;

        //add game to acc
        acc.push(post)
        return acc;
    }, [])

    // sortyByDate or randomize
    if(sortByDate){
        filteredPosts.sort((a, b) => new Date(b.data.published) - new Date(a.data.published))
    } else {
        filteredPosts.sort(() => Math.random() - .5)
    }

    // limit if number is passed
    if(typeof limit === "number"){
        return filteredPosts.slice(0 , limit);
    }
    return filteredPosts;
}
export function formatDate(date){
    const d = new Date(date);
    const f = new Intl.DateTimeFormat('en-PK',{timeZone:"Asia/Karachi",day: '2-digit',month:'short',year:'2-digit'}).format(d);
    return f
}
export function formDate(date){
    const d = new Date(date);
    const f = new Intl.DateTimeFormat('en-PK',{timeZone:"Asia/Karachi"}).format(d).split('/').reverse().join('-');
    return f;
}
export function showSuccess(msg){
    const html = `
    <span id='toast' hx-swap-oob='true' class='relative block p-2 border-2 mb-2 border-green-600 bg-green-400 text-white rounded-md pr-8'>
        ${msg}
        <i class="fa-solid fa-circle-exclamation text-white absolute right-2 top-2"></i>
    </span>
    `
    return html;
}
export function ImgToBit(img){
    const reader = new FileReader();
    reader.readAsDataURL(img);
    let bit;
    reader.onload = function(){
        bit = reader.result;
    }
    return bit;
}
export function toUTC(d){
    const s = new Date(d);
    const u = s.toUTCString();
    return u;
};
