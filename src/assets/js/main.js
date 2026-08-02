/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// Modern JavaScript with jQuery compatibility
(function ($) {
  "use strict";

  const $window = $(window);
  const $body = $("body");
  const $main = $("#main");

  // Breakpoints configuration
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Initialize page
  function initPage() {
    // Remove preload class immediately when DOM is ready
    $body.removeClass("is-preload");

    // Add background accent shape to all pages
    addBackgroundAccentShape();

    // Initialize navigation
    initNavigation("#nav");

    verticalNavigation(".nav-menu");

    // Initialize smooth scrolling
    initSmoothScrolling();
  }

  // Add background accent shape to all pages
  function addBackgroundAccentShape() {
    const existingShape = document.querySelector(".bg-accent-shape");

    if (!existingShape) {
      const shapeDiv = document.createElement("div");
      shapeDiv.className = "bg-accent-shape";
      shapeDiv.innerHTML =
        '<div class="bg-circle"></div><div class="bg-rect"></div>';
      document.body.insertBefore(shapeDiv, document.body.firstChild);
    }
  }
  function markPrevDimmed($navItems, $activeItem) {
    // $itemsContainer should be a collection of .nav-item elements (li)
    $itemsContainer.removeClass("dimmed");

    if (!$activeAnchor || $activeAnchor.length === 0) return;

    // get the li.nav-item that contains the anchor
    const $activeLi = $activeAnchor.closest(".nav-item");
    if ($activeLi.length === 0) return;

    // select previous siblings that are .nav-item
    const $prevItems = $activeLi.prevAll(".nav-item");
    $prevItems.addClass("dimmed");
  }
  function verticalNavigation(nav_id) {
    const $verticalNav = $(nav_id);
    if ($verticalNav.length === 0) return;

    // find anchors and the li items
    const $navAnchors = $verticalNav.find("a");
    const $navItems = $verticalNav.find(".nav-item");

    // attach click to anchors so $this is the anchor
    $navAnchors.on("click", function (e) {
      const $this = $(this);

      // update dimming
      markPrevDimmed($navItems, $this);
    });
  }

  // Initialize navigation functionality
  function initNavigation(nav_id) {
    const $nav = $(nav_id);

    if ($nav.length === 0) return;

    // Shrink effect on scroll
    $main.scrollex({
      mode: "top",
      enter: () => $nav.addClass("alt"),
      leave: () => $nav.removeClass("alt"),
    });

    // Handle navigation links
    const $navLinks = $nav.find("a");

    $navLinks
      .scrolly({
        speed: 1000,
        offset: () => $nav.height(),
      })
      .on("click", function () {
        const $this = $(this);
        const href = $this.attr("href");

        // Skip external links
        if (href.charAt(0) !== "#") return;

        // Deactivate all links
        $navLinks.removeClass("active active-locked");

        // Activate current link
        $this.addClass("active active-locked");
      })
      .each(function () {
        const $this = $(this);
        const id = $this.attr("href");
        const $section = $(id);

        // Skip if no matching section
        if ($section.length === 0) return;

        // Initialize scrollex for section
        $section.scrollex({
          mode: "middle",
          initialize: function () {
            if (browser.canUse("transition")) {
              $section.addClass("inactive");
            }
          },
          enter: function () {
            $section.removeClass("inactive");

            // Handle active link states
            if ($navLinks.filter(".active-locked").length === 0) {
              $navLinks.removeClass("active");
              $this.addClass("active");
              // update dimmed when section becomes active via scroll
            } else if ($this.hasClass("active-locked")) {
              $this.removeClass("active-locked");
            }
          },
        });
      });
  }

  // Initialize smooth scrolling
  function initSmoothScrolling() {
    $(".scrolly").scrolly({
      speed: 1000,
    });
  }

  // Mobile navigation toggle (for your new navbar)
  function initMobileNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navToggle.classList.remove("active");
          navMenu.classList.remove("active");
        });
      });
    }
  }

  // Initialize everything when DOM is ready
  $(document).ready(() => {
    initPage();
    initMobileNav();
  });
})(jQuery);
