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

if (mobileMenuBtn && desktopNav) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = desktopNav.style.display === "flex";
    
    if (isOpen) {
      desktopNav.style.display = "none";
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      desktopNav.style.display = "flex";
      desktopNav.style.position = "absolute";
      desktopNav.style.top = "100%";
      desktopNav.style.left = "0";
      desktopNav.style.right = "0";
      desktopNav.style.background = "white";
      desktopNav.style.flexDirection = "column";
      desktopNav.style.padding = "1.5rem";
      desktopNav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
      desktopNav.style.gap = "0.8rem";
      desktopNav.style.zIndex = "999";
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      
      // Style les liens du menu mobile
      const navLinks = desktopNav.querySelectorAll("a");
      navLinks.forEach(link => {
        link.style.color = "var(--navy)";
        link.style.padding = "0.8rem 1rem";
        link.style.borderRadius = "8px";
        link.style.transition = "all 0.3s ease";
        link.addEventListener("mouseenter", () => {
          link.style.background = "var(--off-white)";
        });
        link.addEventListener("mouseleave", () => {
          link.style.background = "transparent";
        });
      });
    }
  });

  // Fermer le menu quand on clique sur un lien
  const navLinks = desktopNav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 968) {
        desktopNav.style.display = "none";
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Fermer le menu si on clique ailleurs
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 968) {
      if (!mobileMenuBtn.contains(e.target) && !desktopNav.contains(e.target)) {
        desktopNav.style.display = "none";
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
