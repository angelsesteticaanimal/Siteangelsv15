(() => {
  "use strict";
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");
  const menuBtn = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const opened = menu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(opened));
      menuBtn.textContent = opened ? "✕" : "☰";
    });
    document.querySelectorAll(".menu a").forEach(link => link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    }));
  }
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach(item => observer.observe(item));
    window.setTimeout(() => revealItems.forEach(item => item.classList.add("visible")), 1200);
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        await navigator.serviceWorker.register("./service-worker.js?v=16", { scope: "./", updateViaCache: "none" });
      } catch (error) {
        console.warn("Service worker não registrado:", error);
      }
    });
  }
})();
