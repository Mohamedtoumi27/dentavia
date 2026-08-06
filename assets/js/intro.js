/* =========================================================
   DENTAVIA — Intro logo reveal
   Smile swoosh draws in → full logo resolves → site opens.
   Plays once per browser session (sessionStorage).
   ========================================================= */

(function () {
  const intro = document.getElementById("intro");
  if (!intro) return;

  const KEY = "dentavia_intro_played";
  if (sessionStorage.getItem(KEY)) { intro.remove(); return; }
  sessionStorage.setItem(KEY, "1");

  intro.hidden = false;
  document.documentElement.style.overflow = "hidden";

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    intro.classList.add("is-done");
    setTimeout(() => {
      intro.remove();
      document.documentElement.style.overflow = "";
    }, 700);
  }

  const timer = setTimeout(close, 1400);   // smile draws (~0.9s) → logo resolves (~1.3s) → open
  intro.addEventListener("click", () => { clearTimeout(timer); close(); }); // tap to skip
})();
