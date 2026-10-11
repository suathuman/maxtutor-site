// MAX Tutor — language switch (EN/DE, remembered per browser) and mobile menu.
(function () {
  var body = document.body;
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

  var btn = document.querySelector(".menu-btn");
  var drawer = document.getElementById("drawer");
  if (btn && drawer) {
    function close() { drawer.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function () {
      var open = !drawer.classList.contains("open");
      drawer.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
  }
})();
