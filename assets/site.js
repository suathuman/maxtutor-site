// MAX Tutor — language switch (EN/DE, remembered per browser), desktop dropdown menus, mobile drawer with accordion.
(function () {
  var body = document.body;

  // Language
  var langButtons = document.querySelectorAll("[data-set]");
  function setLang(l) {
    body.setAttribute("data-lang", l);
    document.documentElement.lang = l;
    langButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-set") === l)); });
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved || ((navigator.language || "").toLowerCase().indexOf("de") === 0 ? "de" : "en"));
  langButtons.forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-set")); }); });

  // Desktop dropdowns: open on hover (pointer devices) and on click/keyboard; one at a time.
  var dds = Array.prototype.slice.call(document.querySelectorAll(".dd"));
  function closeAll(except) {
    dds.forEach(function (d) {
      if (d === except) return;
      d.classList.remove("open");
      d.querySelector(".dd-btn").setAttribute("aria-expanded", "false");
    });
  }
  dds.forEach(function (d) {
    var btn = d.querySelector(".dd-btn");
    var timer = null;
    var openedAt = 0;
    function open() { if (!d.classList.contains("open")) openedAt = Date.now(); closeAll(d); d.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    function close() { d.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    // A click right after the hover opened the panel must not close it again.
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (d.classList.contains("open") && Date.now() - openedAt > 500) close(); else open();
    });
    d.addEventListener("mouseenter", function () { if (window.matchMedia("(hover: hover)").matches) { clearTimeout(timer); open(); } });
    d.addEventListener("mouseleave", function () { if (window.matchMedia("(hover: hover)").matches) { timer = setTimeout(close, 140); } });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); btn.focus(); }
      if (e.key === "ArrowDown" && !d.classList.contains("open")) { e.preventDefault(); open(); var first = d.querySelector(".dd-panel a"); if (first) first.focus(); }
    });
    d.addEventListener("focusout", function (e) { if (!d.contains(e.relatedTarget)) close(); });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest || !e.target.closest(".dd")) closeAll(null); });

  // Mobile drawer + accordion
  var menuBtn = document.querySelector(".menu-btn");
  var drawer = document.getElementById("drawer");
  if (menuBtn && drawer) {
    function closeDrawer() { drawer.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
    menuBtn.addEventListener("click", function () {
      var open = !drawer.classList.contains("open");
      drawer.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
    drawer.querySelectorAll(".acc").forEach(function (acc) {
      var b = acc.querySelector(".acc-btn");
      if (!b) return;
      b.addEventListener("click", function () {
        var open = !acc.classList.contains("open");
        acc.classList.toggle("open", open);
        b.setAttribute("aria-expanded", String(open));
      });
    });
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
  }
})();
