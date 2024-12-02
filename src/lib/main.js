showMenu();
function showMenu() {
  document.body.addEventListener("htmx:afterSettle", (e) => {
    if (e.detail.elt.classList.contains("userMenu")) {
      const btn = e.detail.elt.querySelector("#menuBtn");
      document.querySelector("#menuBtn").addEventListener("click", () => {
        btn.classList.toggle("showMenu");
      });
    }
  });
}
function setupCopyCode() {
  if (!navigator.clipboard) return;
  const allPres = document.querySelectorAll("pre");
  if (allPres.length === 0) return;
  allPres.forEach((pre) => {
    const button = document.createElement("button");
    button.classList.add("copybtn");
    button.innerHTML = "Copy";
    pre.prepend(button);
    button.addEventListener("click", () => {
      const code = pre.querySelector("code");
      button.innerHTML = "COPIED";
      navigator.clipboard.writeText(code.innerText);
      setTimeout(() => {
        button.innerHTML = "Copy";
      }, 800);
    });
  });
}
setupCopyCode();
