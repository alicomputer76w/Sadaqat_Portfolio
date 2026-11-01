
// =====================================
// SADAQAT ALI - PORTFOLIO JAVASCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. AUTOMATIC COPYRIGHT YEAR

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 2. MOBILE NAVIGATION

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });

  navItems.forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  // 3. ACTIVE NAVIGATION LINK

  const sections = document.querySelectorAll("main section[id]");

  function updateActiveLink() {

    let currentSection = "home";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 130;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }

    });

    navItems.forEach((link) => {

      const isActive =
        link.getAttribute("href") === `#${currentSection}`;

      link.classList.toggle("active", isActive);

    });

  }


  // 4. BACK TO TOP BUTTON

  const backToTop = document.getElementById("backToTop");

  function handleScroll() {

    if (window.scrollY > 450) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    updateActiveLink();

  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();


  // 5. SCROLL REVEAL ANIMATIONS

  const revealElements = document.querySelectorAll(
    ".section-heading, .about-intro, .detail-card, " +
    ".skill-card, .project-card, .service-card, .contact-box"
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {

    revealElements.forEach((element) => {
      element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observerInstance.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  }

  // 6. HERO PROFILE PHOTO FALLBACK
  // If assets/profile.jpg is missing or fails to load, show the "SA"
  // placeholder instead of a broken image icon.

  const heroPhoto = document.getElementById("heroPhoto");
  const heroPhotoImg = document.getElementById("heroPhotoImg");

  if (heroPhoto && heroPhotoImg) {

    const showPlaceholder = () => heroPhoto.classList.add("is-missing");

    heroPhotoImg.addEventListener("error", showPlaceholder);

    // Covers the case where the image failed before this script ran
    if (heroPhotoImg.complete && heroPhotoImg.naturalWidth === 0) {
      showPlaceholder();
    }

  }

});
