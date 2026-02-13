(function () {
  const STORAGE_KEY = "fml-portal-theme";
  const root = document.documentElement;
  const toggles = document.querySelectorAll("[data-theme-toggle]");
  const navLinks = document.querySelectorAll("[data-nav]");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggles.forEach((button) => {
      button.textContent = `Theme: ${theme === "dark" ? "Dark" : "Light"}`;
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  function currentPageName() {
    const path = window.location.pathname;
    if (!path || path === "/") return "index.html";
    const name = path.split("/").pop();
    return name && name.trim() ? name : "index.html";
  }

  function highlightActiveNav() {
    const active = currentPageName();
    navLinks.forEach((link) => {
      if (link.getAttribute("data-nav") === active) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const initial =
    saved ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initial);
  highlightActiveNav();

  toggles.forEach((button) => {
    button.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });
})();
