/* =========================================================
   DENTAVIA — Optional video loader
   Each video appears automatically once the matching file is
   added to assets/video/. Nothing breaks while files are absent.

   Expected filenames:
     assets/video/hero.mp4          → hero background
     assets/video/reel.mp4          → homepage video section
     assets/video/gallery-1.mp4 …   → video gallery (up to 8)
     assets/video/demo-<id>.mp4     → product page demo
   ========================================================= */

(function () {
  const exists = (url) =>
    fetch(url, { method: "HEAD", cache: "no-store" }).then((r) => r.ok).catch(() => false);

  document.addEventListener("DOMContentLoaded", async () => {
    /* 1) Hero background video */
    const hv = document.getElementById("heroVideo");
    if (hv) {
      if (await exists("assets/video/hero.mp4")) {
        hv.hidden = false;
        const p = hv.play();
        if (p) p.catch(() => {});
      } else {
        hv.remove();
      }
    }

    /* 2) Homepage reel section */
    const rs = document.getElementById("videoSection");
    if (rs) {
      if (await exists("assets/video/reel.mp4")) rs.hidden = false;
      else rs.remove();
    }

    /* 3) Video gallery (gallery-1 … gallery-8) */
    const grid = document.getElementById("vgalleryGrid");
    if (grid) {
      const found = [];
      for (let i = 1; i <= 8; i++) {
        const u = `assets/video/gallery-${i}.mp4`;
        if (await exists(u)) found.push(u);
      }
      if (found.length) {
        grid.innerHTML = found
          .map(
            (u) => `<figure class="vcard">
              <video src="${u}" muted loop playsinline preload="metadata"></video>
              <button class="vcard__play" aria-label="Lire / Pause">▶</button>
            </figure>`
          )
          .join("");
        document.getElementById("videoGallery").hidden = false;

        const cards = [...grid.querySelectorAll(".vcard")];
        const viewport = grid.parentElement; // .vcarousel
        const GAP = parseFloat(getComputedStyle(grid).columnGap) || 16;
        const step = () => (cards[0] ? cards[0].getBoundingClientRect().width + GAP : 260);
        const perView = () => Math.max(1, Math.round(viewport.clientWidth / step()));
        const maxIdx = () => Math.max(0, cards.length - perView());
        let idx = 0;
        const nav = document.querySelector(".carousel-nav");
        const prevBtn = document.getElementById("galPrev");
        const nextBtn = document.getElementById("galNext");
        const updateNav = () => {
          const mi = maxIdx();
          if (nav) nav.style.display = mi === 0 ? "none" : "flex";
          if (prevBtn) prevBtn.disabled = idx <= 0;
          if (nextBtn) nextBtn.disabled = idx >= mi;
        };
        const apply = (animate = true) => {
          idx = Math.min(Math.max(0, idx), maxIdx());
          grid.style.transition = animate ? "" : "none";
          grid.style.transform = `translateX(${-idx * step()}px)`;
          updateNav();
        };
        prevBtn?.addEventListener("click", () => { idx--; apply(); });
        nextBtn?.addEventListener("click", () => { idx++; apply(); });
        window.addEventListener("resize", () => apply(false));

        // per-card play/pause (hover + tap), suppressed while swiping
        let moved = false, dragging = false, sx = 0, base = 0;
        cards.forEach((c) => {
          const v = c.querySelector("video");
          c.addEventListener("mouseenter", () => v.play().catch(() => {}));
          c.addEventListener("mouseleave", () => { if (!c.classList.contains("is-playing")) v.pause(); });
          c.addEventListener("click", () => {
            if (moved) return;
            if (v.paused) { v.play().catch(() => {}); c.classList.add("is-playing"); }
            else { v.pause(); c.classList.remove("is-playing"); }
          });
        });

        // touch / pointer swipe
        grid.addEventListener("pointerdown", (e) => {
          dragging = true; moved = false; sx = e.clientX; base = -idx * step();
          grid.style.transition = "none";
        });
        grid.addEventListener("pointermove", (e) => {
          if (!dragging) return;
          const dx = e.clientX - sx;
          if (Math.abs(dx) > 6) moved = true;
          grid.style.transform = `translateX(${base + dx}px)`;
        });
        const endDrag = (e) => {
          if (!dragging) return;
          dragging = false; grid.style.transition = "";
          const dx = ((e.clientX ?? sx) - sx);
          if (dx < -40) idx++; else if (dx > 40) idx--;
          apply();
          setTimeout(() => { moved = false; }, 30);
        };
        grid.addEventListener("pointerup", endDrag);
        grid.addEventListener("pointercancel", endDrag);
        grid.addEventListener("pointerleave", endDrag);

        apply(false);
      } else {
        document.getElementById("videoGallery").remove();
      }
    }

    /* 4) Product page demo video */
    const dv = document.getElementById("demoVideo");
    if (dv) {
      const src = dv.dataset.src;
      if (src && (await exists(src))) {
        dv.querySelector("source").src = src;
        dv.load();
        document.getElementById("demoSection").hidden = false;
      } else {
        document.getElementById("demoSection")?.remove();
      }
    }
  });
})();
