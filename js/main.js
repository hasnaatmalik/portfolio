// DOM Elements
const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");
const contactForm = document.getElementById("contactForm");
const sections = document.querySelectorAll("section");
const themeToggle = document.getElementById("theme-toggle-checkbox");
const htmlElement = document.documentElement;
const logoDot = document.querySelector(".logo-dot");

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlElement.className = savedTheme;
  if (savedTheme === "dark-mode") {
    themeToggle.checked = true;
  }
} else {
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (prefersDarkMode) {
    htmlElement.classList.add("dark-mode");
    themeToggle.checked = true;
  }
}

// Theme Toggle
themeToggle.addEventListener("change", function () {
  if (this.checked) {
    htmlElement.classList.remove("light-mode");
    htmlElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
  } else {
    htmlElement.classList.remove("dark-mode");
    htmlElement.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
  }
});

// Logo dot animation
setInterval(() => {
  logoDot.style.transform = "translateY(-15px)";
  setTimeout(() => {
    logoDot.style.transform = "translateY(0)";
  }, 500);
}, 3000);

// Sticky Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Active nav link based on scroll position
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple form validation
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".project-card, .skill-tags span");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial styles for animation
document
  .querySelectorAll(".project-card, .skill-tags span")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Run animation on scroll
window.addEventListener("scroll", animateOnScroll);
// Run once on page load
window.addEventListener("load", animateOnScroll);

// Typing effect for hero section
const typingEffect = () => {
  const text = "Building innovative solutions through code";
  const typingElement = document.querySelector(".hero-text p");
  let i = 0;

  if (typingElement) {
    typingElement.textContent = "";

    const typing = setInterval(() => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
  }
};

// Run typing effect on page load
window.addEventListener("load", typingEffect);

// Fix for profile image responsiveness
window.addEventListener("resize", () => {
  const imageContainer = document.querySelector(".image-container");
  if (imageContainer) {
    const width = imageContainer.offsetWidth;
    imageContainer.style.height = `${width}px`;
  }
});
