document.documentElement.classList.add('js');

  const menuBtn = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".menu");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
      });
    });
  }

  // Mostra o conteúdo imediatamente para evitar páginas em branco
  const elementos = document.querySelectorAll(".reveal");

  elementos.forEach((elemento) => {
    elemento.classList.add("visible");
  });

  // Mantém a animação somente quando o navegador oferecer suporte
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elementos.forEach((elemento) => {
      observador.observe(elemento);
    });
  }

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});

// Remove versões antigas armazenadas pelo service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registros = await navigator.serviceWorker.getRegistrations();

      for (const registro of registros) {
        await registro.unregister();
      }

      if ("caches" in window) {
        const nomesDosCaches = await caches.keys();

        await Promise.all(
          nomesDosCaches.map((nome) => caches.delete(nome))
        );
      }
    } catch (erro) {
      console.log("Limpeza de cache não concluída:", erro);
    }
  });
}
