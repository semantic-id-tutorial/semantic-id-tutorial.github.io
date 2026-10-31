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

// Venue map: loads Leaflet only when the map scrolls into view, then draws
// OpenStreetMap tiles in the Humanitarian (HOT) style, which skips most
// church and monument icons, with an orange pin at the venue.
var LEAFLET_JS = {
  src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
  integrity: "sha384-NElt3Op+9NBMCYaef5HxeJmU4Xeard/Lku8ek6hoPTvYkQPh3zLIrJP7KiRocsxO"
};
var LEAFLET_CSS = {
  href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  integrity: "sha384-c6Rcwz4e4CITMbu/NBmnNS8yN2sC3cUElMEMfP3vqqKFp7GOYaaBBCqmaWBjmkjb"
};

var VENUE_PIN_SVG =
  '<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 1C7.3 1 1 7.2 1 14.9 1 25.3 15 41 15 41s14-15.7 14-26.1C29 7.2 22.7 1 15 1z" ' +
  'fill="#f28c28" stroke="#ffffff" stroke-width="2"/>' +
  '<circle cx="15" cy="15" r="5.5" fill="#ffffff"/></svg>';

function drawVenueMap(el) {
  var lat = parseFloat(el.getAttribute("data-lat"));
  var lon = parseFloat(el.getAttribute("data-lon"));
  var map = L.map(el, { scrollWheelZoom: false }).setView([lat - 0.0008, lon], 16);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: "abc",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'style by <a href="https://www.hotosm.org/">HOT</a>, hosted by <a href="https://openstreetmap.fr/">OSM France</a>'
  }).addTo(map);
  var pin = L.divIcon({
    className: "venue-pin",
    html: VENUE_PIN_SVG,
    iconSize: [30, 42],
    iconAnchor: [15, 41],
    tooltipAnchor: [0, -40]
  });
  L.marker([lat, lon], { icon: pin, title: "Sapienza Faculty of Engineering" })
    .addTo(map)
    .bindTooltip("Faculty of Engineering · Aula 7", { permanent: true, direction: "top" });
}

function loadVenueMap(el) {
  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = LEAFLET_CSS.href;
  css.integrity = LEAFLET_CSS.integrity;
  css.crossOrigin = "anonymous";
  document.head.appendChild(css);

  var script = document.createElement("script");
  script.src = LEAFLET_JS.src;
  script.integrity = LEAFLET_JS.integrity;
  script.crossOrigin = "anonymous";
  script.onload = function () { drawVenueMap(el); };
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("venue-map");
  if (!el) return;
  if (!("IntersectionObserver" in window)) {
    loadVenueMap(el);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      loadVenueMap(el);
    }
  }, { rootMargin: "200px" });
  observer.observe(el);
});
