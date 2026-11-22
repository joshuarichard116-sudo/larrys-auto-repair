// Mobile menu: open/close the nav on small screens
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Keep the copyright year current
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
