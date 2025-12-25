// Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const desktopNav = document.getElementById("desktopNav");
const headerBtnPrimary = document.querySelector(".header-container .btn-primary");

if (mobileMenuBtn && desktopNav) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = desktopNav.classList.contains("mobile-active");
    
    if (isOpen) {
      desktopNav.classList.remove("mobile-active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      desktopNav.classList.add("mobile-active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      
      // Ajouter le bouton devis au menu mobile s'il n'existe pas déjà
      if (headerBtnPrimary && !desktopNav.querySelector(".mobile-devis-btn")) {
        const mobileDevisBtn = document.createElement("a");
        mobileDevisBtn.href = "devis.html";
        mobileDevisBtn.className = "mobile-devis-btn";
        mobileDevisBtn.textContent = "Demander un Devis Gratuit";
        mobileDevisBtn.style.cssText = `
          background: var(--red);
          color: white;
          padding: 0.85rem 1.2rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        `;
        desktopNav.appendChild(mobileDevisBtn);
      }
    }
  });

  // Fermer le menu quand on clique sur un lien
  document.addEventListener("click", (e) => {
    if (e.target.closest("#desktopNav a")) {
      if (window.innerWidth <= 968) {
        desktopNav.classList.remove("mobile-active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });

  // Fermer le menu si on clique ailleurs
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 968) {
      if (!mobileMenuBtn.contains(e.target) && !desktopNav.contains(e.target)) {
        desktopNav.classList.remove("mobile-active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
}

// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close mobile menu after clicking
      if (window.innerWidth <= 968 && desktopNav) {
        desktopNav.style.display = "none";
      }
    }
  });
});

// Hero Carousel Functionality
const heroSlides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  showSlide(currentSlide);
}

// Auto-advance carousel every 5 seconds
if (heroSlides.length > 0) {
  setInterval(nextSlide, 5000);
  showSlide(0);
}

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".product-card, .gallery-item, .stat-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});
