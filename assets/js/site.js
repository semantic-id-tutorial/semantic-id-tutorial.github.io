// Theme toggle: switches between light and dark. Until the visitor picks one,
// the site follows the system setting. The choice is saved in localStorage.
// The inline script in each page's <head> applies a saved choice early to avoid
// a flash of the wrong theme.
var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function readSavedTheme() {
  try {
    var saved = localStorage.getItem("theme-setting");
    return saved === "light" || saved === "dark" ? saved : null;
  } catch (e) {
    return null;
  }
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
}

function initTheme() {
  var saved = readSavedTheme();
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  updateToggleIcon();
}

function toggleTheme() {
  var next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme-setting", next);
  } catch (e) {}
  updateToggleIcon();
}

function updateToggleIcon() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var theme = currentTheme();
  btn.textContent = theme === "dark" ? "☽" : "☀";
  btn.setAttribute("title", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

function toggleNav() {
  var links = document.getElementById("navbar-links");
  if (links) links.classList.toggle("open");
}

// Keep the icon in sync if the system theme changes while no choice is saved.
if (darkQuery.addEventListener) {
  darkQuery.addEventListener("change", updateToggleIcon);
}

document.addEventListener("DOMContentLoaded", updateToggleIcon);
