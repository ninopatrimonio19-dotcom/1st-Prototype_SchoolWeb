document.addEventListener("DOMContentLoaded", () => {
  // 1. PAGE LOADER
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }, 1000);

  // 2. NAVBAR SCROLL EFFECT & MOBILE MENU
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // 3. GENERATE DYNAMIC HERO STARS
  const starsContainer = document.getElementById("starsContainer");
  const starCount = 50;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 3 + 1 + "px";
    star.style.width = size;
    star.style.height = size;
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.setProperty("--duration", (Math.random() * 3 + 2) + "s");
    starsContainer.appendChild(star);
  }

  // 4. ANIMATED STAT COUNTERS (TRIGGERED ON SCROLL)
  const counters = document.querySelectorAll(".counter");
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = target / 30;

      function updateCount() {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 40);
        } else {
          counter.innerText = target;
        }
      }
      updateCount();
    });
  }

  // 5. INTERACTIVE DEPARTMENT TABS
  const tabBtns = document.querySelectorAll(".tab-btn");
  const deptPanes = document.querySelectorAll(".dept-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      deptPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const deptId = btn.getAttribute("data-dept");
      document.getElementById(deptId).classList.add("active");
    });
  });

  // 6. CONTACT FORM VALIDATION
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      formFeedback.style.color = "var(--cyan)";
      formFeedback.innerText = "Thank you, " + name + "! Your message has been received successfully.";
      contactForm.reset();
    } else {
      formFeedback.style.color = "#FFD166";
      formFeedback.innerText = "Please fill out all required fields before submitting.";
    }
  });

  // OBSERVER FOR STATS ANIMATION TRIGGER
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        runCounters();
        animated = true;
      }
    });
  }, { threshold: 0.4 });

  if (aboutSection) observer.observe(aboutSection);
});
