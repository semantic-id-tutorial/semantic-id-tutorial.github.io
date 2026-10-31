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
  onThemeChange();
}

// Everything that depends on the active theme.
function onThemeChange() {
  updateToggleIcon();
  updateVenueMapTiles();
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
  darkQuery.addEventListener("change", onThemeChange);
}

document.addEventListener("DOMContentLoaded", updateToggleIcon);

// Venue map: loads MapLibre only when the map scrolls into view, then draws
// OpenFreeMap vector tiles (OpenStreetMap data, no API key) in a light or dark
// style to match the theme, with an orange pin at the venue.
var MAPLIBRE_JS = {
  src: "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.js",
  integrity: "sha384-5+cfbwT0iiub6VsQAdn6yz16nr6sDiQoHx6tm4O8OVYXHYOxcffFmCJBL0dgdvGp"
};
var MAPLIBRE_CSS = {
  href: "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.css",
  integrity: "sha384-uTttxo/aOKbdE5RlD/SPzSDoDmNvGlUYPjONi2MN/b7c9HPSvW07OIuyP7uL6jxK"
};
var MAP_STYLES = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark"
};

var VENUE_PIN_SVG =
  '<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 1C7.3 1 1 7.2 1 14.9 1 25.3 15 41 15 41s14-15.7 14-26.1C29 7.2 22.7 1 15 1z" ' +
  'fill="#f28c28" stroke="#ffffff" stroke-width="2"/>' +
  '<circle cx="15" cy="15" r="5.5" fill="#ffffff"/></svg>';

var venueMap = null;

function updateVenueMapTiles() {
  if (venueMap) venueMap.setStyle(MAP_STYLES[currentTheme()]);
}

function drawVenueMap(el) {
  var lat = parseFloat(el.getAttribute("data-lat"));
  var lon = parseFloat(el.getAttribute("data-lon"));
  venueMap = new maplibregl.Map({
    container: el,
    style: MAP_STYLES[currentTheme()],
    center: [lon, lat - 0.0008],
    zoom: 15,
    scrollZoom: false,
    dragRotate: false,
    pitchWithRotate: false
  });
  venueMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

  var pin = document.createElement("div");
  pin.className = "venue-pin";
  pin.innerHTML = '<span class="venue-pin-label">Faculty of Engineering · Aula 7</span>' + VENUE_PIN_SVG;
  new maplibregl.Marker({ element: pin, anchor: "bottom" }).setLngLat([lon, lat]).addTo(venueMap);
}

function loadVenueMap(el) {
  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = MAPLIBRE_CSS.href;
  css.integrity = MAPLIBRE_CSS.integrity;
  css.crossOrigin = "anonymous";
  document.head.appendChild(css);

  var script = document.createElement("script");
  script.src = MAPLIBRE_JS.src;
  script.integrity = MAPLIBRE_JS.integrity;
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
