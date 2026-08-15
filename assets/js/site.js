// Theme toggle: cycles system -> light -> dark, persisted in localStorage.
// Applied ASAP (called inline in <head>) to avoid a flash of the wrong theme.
function initTheme() {
  var saved = localStorage.getItem("theme-setting") || "system";
  document.documentElement.setAttribute("data-theme-setting", saved);
  applyTheme();
}

function applyTheme() {
  var setting = document.documentElement.getAttribute("data-theme-setting");
  var theme = setting;
  if (setting === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  updateToggleIcon(setting);
}

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme-setting") || "system";
  var next = current === "system" ? "light" : current === "light" ? "dark" : "system";
  localStorage.setItem("theme-setting", next);
  document.documentElement.setAttribute("data-theme-setting", next);
  applyTheme();
}

function updateToggleIcon(setting) {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  var icons = { system: "◐", light: "☀", dark: "☽" };
  btn.textContent = icons[setting] || icons.system;
  btn.setAttribute("title", "Theme: " + setting + " (click to change)");
}

function toggleNav() {
  var links = document.getElementById("navbar-links");
  if (links) links.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  updateToggleIcon(document.documentElement.getAttribute("data-theme-setting") || "system");

  var lastUpdated = document.getElementById("last-updated");
  if (lastUpdated) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var now = new Date();
    lastUpdated.textContent = months[now.getMonth()] + " " + now.getFullYear();
  }
});
