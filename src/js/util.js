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
        filteredPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
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
    const f = new Intl.DateTimeFormat('en-PK',{timeZone: 'Pakistan/Karachi',day: '2-digit',month:'short',year:'2-digit'}).format(d);
    return f
}
export function formDate(date){
    const d = new Date(date);
    const f = new Intl.DateTimeFormat('en-PK').format(d).split('/').reverse().join('-');
    return f;
}
