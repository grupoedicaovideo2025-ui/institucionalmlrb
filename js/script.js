// Ano dinâmico no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu mobile
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Sombra do header ao rolar
const header = document.getElementById("siteHeader");
if (header) {
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 20 ? "0 4px 20px rgba(0,0,0,0.06)" : "none";
  });
}

// Animação suave ao rolar (scroll reveal)
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

// Carrossel de depoimentos
const track = document.getElementById("testimonialTrack");
const dotsWrap = document.getElementById("testimonialDots");
const prevBtn = document.getElementById("testimonialPrev");
const nextBtn = document.getElementById("testimonialNext");

if (track && dotsWrap && prevBtn && nextBtn) {
  const slides = Array.from(track.querySelectorAll(".testimonial-slide"));
  let current = 0;
  let autoplayId = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Ir para depoimento ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".testimonial-dot"));

  function render() {
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 6500);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  nextBtn.addEventListener("click", () => { next(); startAutoplay(); });
  prevBtn.addEventListener("click", () => { prev(); startAutoplay(); });

  const carousel = document.getElementById("testimonialCarousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
  }

  render();
  startAutoplay();
}
