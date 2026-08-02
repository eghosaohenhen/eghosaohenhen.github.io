// Smooth scrolling for navigation links
document.querySelectorAll('.nav-item[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile navigation toggle
const mobileNavToggle = document.getElementById("mobileNavToggle");
const verticalNav = document.getElementById("verticalNav");

mobileNavToggle.addEventListener("click", function () {
  verticalNav.classList.toggle("nav-open");
  mobileNavToggle.classList.toggle("active");
});

// Close mobile nav when clicking outside
document.addEventListener("click", function (e) {
  if (!verticalNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
    verticalNav.classList.remove("nav-open");
    mobileNavToggle.classList.remove("active");
  }
});

// Highlight active navigation item based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id], header[id], h3[id]");
  const navItems = document.querySelectorAll('.nav-item[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === "#" + current) {
      item.classList.add("active");
    }
  });
}

// Update active nav on scroll
window.addEventListener("scroll", updateActiveNav);

// Initial call
updateActiveNav();
