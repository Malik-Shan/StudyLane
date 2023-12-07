showMenu();


function showMenu(){
  document.body.addEventListener('htmx:afterSettle', (e) => {
    if(e.detail.elt.classList.contains('userMenu')){
      const btn = e.detail.elt.querySelector("#menuBtn");
      document.querySelector('#menuBtn').addEventListener('click', (e) => {
        btn.classList.toggle('showMenu');
      })
    }
  })
}
