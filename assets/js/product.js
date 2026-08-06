/* =========================================================
   DENTAVIA — Product detail page renderer
   Reads ?id= from the URL and builds the page from PRODUCTS.
   ========================================================= */

(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "purple";
  const p = getProduct(id);
  const main = document.getElementById("productMain");
  if (!p || !main) {
    if (main) main.innerHTML = `<section class="wrap"><p>Produit introuvable. <a href="index.html">Retour à l'accueil</a></p></section>`;
    return;
  }

  document.title = `DentaVia — ${p.name}`;

  const li = (arr, cls = "") => arr.map((x) => `<li class="${cls}">${x}</li>`).join("");

  main.innerHTML = `
  <nav class="wrap crumb">
    <a href="index.html">Accueil</a> <span>/</span>
    <a href="index.html#products">Produits</a> <span>/</span>
    <span class="crumb__here">${p.name}</span>
  </nav>

  <section class="wrap pdp">
    <div class="pdp__media${mediaClass(p)}" style="--accent:${p.color}">
      ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
      <img src="${imgOf(p)}" alt="${p.name}" onerror="this.style.opacity=0" />
    </div>

    <div class="pdp__info">
      <span class="eyebrow">${p.cat} · ${p.size}</span>
      <h1 class="pdp__name">${p.name}</h1>
      <p class="pdp__subtitle">${p.subtitle}</p>
      <p class="pdp__price">${fmt(p.price)}</p>
      <p class="pdp__blurb">${p.blurb}</p>

      <div class="pdp__buy">
        <div class="qty" id="pdpQty">
          <button data-q="-1" aria-label="Moins">−</button>
          <span id="pdpQtyVal">1</span>
          <button data-q="1" aria-label="Plus">+</button>
        </div>
        <button class="btn btn--solid btn--lg" id="pdpAdd" data-add="${p.id}">Ajouter au panier · ${fmt(p.price)}</button>
      </div>

      <p class="pdp__usage"><strong>Conseil d'utilisation :</strong> ${p.usage}</p>

      <ul class="pdp__trust">
        <li>🚚 Paiement à la livraison</li>
        <li>✨ Sourire visiblement plus blanc</li>
        <li>🇩🇿 Livraison partout en Algérie</li>
      </ul>
    </div>
  </section>

  <section class="vsection" id="demoSection" hidden>
    <div class="wrap">
      <div class="sec-head"><div><span class="eyebrow">En démonstration</span><h2>Voir le produit en action.</h2></div></div>
      <div class="vplayer">
        <video id="demoVideo" class="vplayer__video" data-src="assets/video/demo-${p.id}.mp4" controls playsinline preload="none" poster="${imgOf(p)}">
          <source src="" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>

  <section class="pdp__section feature">
    <div class="wrap feature__grid">
      <div class="feature__media" style="background:radial-gradient(120% 120% at 30% 20%, ${p.color}33 0%, var(--mint-2) 55%, #fff 100%)"></div>
      <div>
        <span class="eyebrow">Le produit</span>
        <h2>${p.subtitle}</h2>
        <p class="muted">${p.overview}</p>
        <ul class="feature__list">
          ${p.how.map((h, i) => `<li><span class="feature__num">0${i + 1}</span><div><p>${h}</p></div></li>`).join("")}
        </ul>
      </div>
    </div>
  </section>

  <section class="wrap">
    <div class="sec-head"><div><span class="eyebrow">Bienfaits</span><h2>Ce que DentaVia apporte à votre sourire.</h2></div></div>
    <div class="benefits">
      ${p.benefits.map((b) => `<div class="benefit"><h4>${b.title}</h4><p>${b.text}</p></div>`).join("")}
    </div>
  </section>

  <section class="ingredients-sec">
    <div class="wrap">
      <div class="sec-head"><div><span class="eyebrow">Formule</span><h2>Ingrédients &amp; rôles</h2></div><p>La transparence, comme un laboratoire — chaque actif est nommé et justifié.</p></div>
      <div class="ingredients">
        ${p.ingredients.map((ing) => `
          <div class="ing">
            <div class="ing__dot" style="background:${p.color}"></div>
            <div><h4>${ing.name}</h4><p>${ing.benefit}</p></div>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="wrap">
    <div class="sec-head"><div><span class="eyebrow">La routine</span><h2>Complétez votre rituel.</h2></div><a class="btn btn--ghost" href="index.html#products">Voir tout →</a></div>
    <div class="products" id="crossGrid"></div>
  </section>
  `;

  /* Cross-sell: other products */
  const cross = document.getElementById("crossGrid");
  if (cross) {
    cross.innerHTML = PRODUCTS.filter((x) => x.id !== p.id).map((x) => `
      <article class="card">
        <a class="card__media${mediaClass(x)}" href="product.html?id=${x.id}">
          ${x.tag ? `<span class="card__tag">${x.tag}</span>` : ""}
          <img src="${imgOf(x)}" alt="${x.name}" onerror="this.style.opacity=0" />
        </a>
        <div class="card__body">
          <span class="card__ey">${x.cat} · ${x.size}</span>
          <h3 class="card__name"><a href="product.html?id=${x.id}">${x.name}</a></h3>
          <p class="card__desc">${x.blurb}</p>
          <div class="card__foot">
            <span class="card__price">${fmt(x.price)}</span>
            <button class="card__mini" data-add="${x.id}">Ajouter +</button>
          </div>
        </div>
      </article>`).join("");
  }

  /* Quantity stepper — adds N to cart on click */
  let qty = 1;
  const qtyVal = document.getElementById("pdpQtyVal");
  document.getElementById("pdpQty")?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-q]");
    if (!b) return;
    qty = Math.max(1, qty + parseInt(b.dataset.q, 10));
    qtyVal.textContent = qty;
  });
  /* Override the default single-add for the main button to add `qty` */
  document.getElementById("pdpAdd")?.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    for (let i = 0; i < qty; i++) addToCart(p.id);
  }, true);
})();
