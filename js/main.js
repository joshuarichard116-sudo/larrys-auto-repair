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

// ---------- Night Garage: gentle scroll-in and count-up numbers ----------
(function () {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (calm || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js");

  // Fade sections in as they scroll into view (cards in a row follow each other)
  const items = document.querySelectorAll(
    ".section-head, .grid > *, .why > div, .contact-wrap > *, .map, .cta .container, .page-banner .container"
  );
  items.forEach((el) => {
    el.classList.add("reveal");
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 90 + "ms");
  });
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); seen.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => seen.observe(el));

  // Count the "Why Larry's" numbers up; they always end on the original text
  const nums = document.querySelectorAll(".why .num");
  const count = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      count.unobserve(e.target);
      const el = e.target, original = el.textContent;
      const m = original.match(/[\d,]+(\.\d+)?/);
      if (!m) return;
      const target = parseFloat(m[0].replace(/,/g, ""));
      const decimals = m[1] ? m[1].length - 1 : 0;
      const commas = m[0].includes(",");
      const start = performance.now(), dur = 1400;
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        let v = (target * eased).toFixed(decimals);
        if (commas) v = Number(v).toLocaleString("en-US", { minimumFractionDigits: decimals });
        el.textContent = p < 1 ? original.replace(m[0], v) : original;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => count.observe(n));
})();
