/* 沿線而行 — 互動腳本：行動選單、樂章高亮、年份 */
(function () {
  "use strict";

  /* ---- 行動裝置漢堡選單 ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 點選連結後收合
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    // Esc 收合
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---- 章內樂章導引：捲動高亮 ---- */
  var mvLinks = Array.prototype.slice.call(
    document.querySelectorAll(".movement-nav a[href^='#']")
  );
  var movements = mvLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if (movements.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          mvLinks.forEach(function (a) {
            a.setAttribute(
              "aria-current",
              a.getAttribute("href") === "#" + id ? "true" : "false"
            );
          });
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    movements.forEach(function (m) { io.observe(m); });
  }

  /* ---- 頁尾年份 ---- */
  var y = document.querySelector("[data-year]");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
