document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

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

const tabButtons = document.querySelectorAll(".tab-btn");
const serviceCards = document.querySelectorAll(".service-card");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    serviceCards.forEach((card) => {
      card.hidden = card.dataset.category !== category;
    });
  });
});

const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 20 ? "0 4px 20px rgba(0,0,0,0.06)" : "none";
});

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.textContent = "Obrigado pelo contato. Nossa equipe responderá em breve.";
  contactForm.reset();
});
