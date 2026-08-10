/* =========================================================
   DENTAVIA — Store logic (catalog render + cart)
   Catalogue data lives in products.js (loaded first).
   ========================================================= */

/* ---------- Render catalog ---------- */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="card">
      <a class="card__media${mediaClass(p)}" href="product.html?id=${p.id}">
        ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
        <img src="${imgOf(p)}" alt="${p.name}" onerror="this.style.opacity=0" />
      </a>
      <div class="card__body">
        <span class="card__ey">${p.cat} · ${p.size}</span>
        <h3 class="card__name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <p class="card__desc">${p.blurb}</p>
        <div class="card__foot">
          <span class="card__price">${fmt(p.price)}</span>
          <button class="card__mini" data-add="${p.id}">Ajouter +</button>
        </div>
      </div>
    </article>`).join("");
}

/* ---------- Cart state ---------- */
const CART_KEY = "dentavia_cart";
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "{}");

const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const cartTotal = () =>
  Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); renderCart(); openDrawer();
}
function setQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart(); renderCart();
}
function removeItem(id) { delete cart[id]; saveCart(); renderCart(); }

/* ---------- Render cart ---------- */
function renderCart() {
  const items = document.getElementById("cartItems");
  const badge = document.getElementById("cartOpen");
  const total = document.getElementById("cartTotal");
  const count = cartCount();

  if (badge) badge.setAttribute("data-count", count);
  if (total) total.textContent = fmt(cartTotal());
  if (!items) return;

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    items.innerHTML = `<p class="drawer__empty">Votre panier est vide.</p>`;
    return;
  }
  items.innerHTML = ids.map((id) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return "";
    const qty = cart[id];
    return `
      <div class="line">
        <div class="line__media"><img src="assets/img/${p.id}.png" alt="" onerror="this.style.opacity=0"></div>
        <div>
          <div class="line__name">${p.name}</div>
          <div class="line__meta">${fmt(p.price)}</div>
          <div class="line__qty">
            <button data-dec="${id}" aria-label="Moins">−</button>
            <span>${qty}</span>
            <button data-inc="${id}" aria-label="Plus">+</button>
          </div>
          <button class="line__remove" data-rm="${id}">Retirer</button>
        </div>
        <div class="line__price">${fmt(p.price * qty)}</div>
      </div>`;
  }).join("");
}

/* ---------- Drawer ---------- */
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const openDrawer = () => { overlay?.classList.add("open"); drawer?.classList.add("open"); };
const closeDrawer = () => { overlay?.classList.remove("open"); drawer?.classList.remove("open"); };

/* ---------- Events ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-add],[data-inc],[data-dec],[data-rm]");
  if (!t) return;
  if (t.dataset.add) addToCart(t.dataset.add);
  else if (t.dataset.inc) setQty(t.dataset.inc, +1);
  else if (t.dataset.dec) setQty(t.dataset.dec, -1);
  else if (t.dataset.rm) removeItem(t.dataset.rm);
});
document.getElementById("cartOpen")?.addEventListener("click", openDrawer);
document.getElementById("cartClose")?.addEventListener("click", closeDrawer);
overlay?.addEventListener("click", closeDrawer);

/* ---------- Mobile menu ---------- */
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => document.body.classList.toggle("nav-open"));
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("nav-open"))
  );
}

/* ---------- Product search ---------- */
(function initSearch() {
  const btn = document.querySelector('[aria-label="Rechercher"]');
  if (!btn || typeof PRODUCTS === "undefined") return;

  const el = document.createElement("div");
  el.className = "search";
  el.id = "searchOverlay";
  el.hidden = true;
  el.innerHTML = `
    <div class="search__head wrap">
      <input type="search" id="searchInput" placeholder="Rechercher un produit…" autocomplete="off" />
      <button class="icon-btn" id="searchClose" aria-label="Fermer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="wrap search__results" id="searchResults"></div>`;
  document.body.appendChild(el);

  const input = el.querySelector("#searchInput");
  const results = el.querySelector("#searchResults");

  const open = () => { el.hidden = false; document.body.classList.add("search-open"); setTimeout(() => input.focus(), 50); render(""); };
  const close = () => { el.hidden = true; document.body.classList.remove("search-open"); input.value = ""; };

  function render(q) {
    const query = q.trim().toLowerCase();
    const list = query
      ? PRODUCTS.filter((p) => (p.name + " " + p.cat + " " + p.blurb).toLowerCase().includes(query))
      : PRODUCTS;
    if (!list.length) { results.innerHTML = `<p class="search__empty">Aucun produit pour « ${q} ».</p>`; return; }
    results.innerHTML = list.map((p) => `
      <a class="search__item" href="product.html?id=${p.id}">
        <span class="search__thumb${mediaClass(p)}"><img src="${imgOf(p)}" alt="" onerror="this.style.opacity=0"></span>
        <span class="search__info"><strong>${p.name}</strong><small>${p.cat} · ${p.size}</small></span>
        <span class="search__price">${fmt(p.price)}</span>
      </a>`).join("");
  }

  btn.addEventListener("click", open);
  el.querySelector("#searchClose").addEventListener("click", close);
  input.addEventListener("input", () => render(input.value));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !el.hidden) close(); });
})();

/* ---------- Init ---------- */
renderProducts();
renderCart();
