document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme");
  const themeIcon = themeBtn.querySelector(".theme-icon");
  const themeText = themeBtn.querySelector(".theme-text");

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateButtonUI(theme) {
    if (theme === "dark") {
      themeIcon.textContent = "☀️";
      themeText.textContent = "Light";
    } else {
      themeIcon.textContent = "🌙";
      themeText.textContent = "Dark";
    }
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    updateButtonUI(theme);
  }

  // Initial load theme state
  let currentTheme = null;
  try {
    currentTheme = localStorage.getItem("theme");
  } catch (e) {}

  if (!currentTheme) {
    currentTheme = getSystemTheme();
  }
  
  setTheme(currentTheme);

  // Toggle button event
  themeBtn.onclick = function () {
    const activeTheme = root.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  // Sync with OS settings if user hasn't explicitly overridden preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    try {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    } catch (err) {}
  });
});