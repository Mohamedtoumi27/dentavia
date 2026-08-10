/* =========================================================
   DENTAVIA — Checkout (Cash on Delivery)
   Depends on products.js (PRODUCTS, fmt) + store.js (cart).
   ========================================================= */

/* ---------- CONFIG — edit these ---------- */
const CONFIG = {
  freeShippingMin: Infinity, // no free delivery — customer always pays shipping
  feeDomicile: 600,        // DA — home delivery
  feeStopdesk: 400,        // DA — desk pickup
  // Where orders are sent. Put YOUR WhatsApp number in international format
  // (e.g. "213661234567" — no +, no spaces). Leave "" to disable WhatsApp.
  whatsapp: "",
  // Google Sheet: Apps Script Web App URL that logs every order.
  sheetEndpoint: "https://script.google.com/macros/s/AKfycbwkytfnWaUsmQtokMTWeXxpPwIG4X4jH8CJlloCDyZqkwkhKrrYH2XJjyo1lcUYi02Q/exec",
  // SKU per product id (must match the SKU column in your sheet).
  sku: {
    powder: "0126",
    purple: "0120",
    pink: "0121",
    duo: "0122",
    routine: "0128",
  },
};

/* ---------- 58 wilayas ---------- */
const WILAYAS = [
  "01 - Adrar","02 - Chlef","03 - Laghouat","04 - Oum El Bouaghi","05 - Batna","06 - Béjaïa",
  "07 - Biskra","08 - Béchar","09 - Blida","10 - Bouira","11 - Tamanrasset","12 - Tébessa",
  "13 - Tlemcen","14 - Tiaret","15 - Tizi Ouzou","16 - Alger","17 - Djelfa","18 - Jijel",
  "19 - Sétif","20 - Saïda","21 - Skikda","22 - Sidi Bel Abbès","23 - Annaba","24 - Guelma",
  "25 - Constantine","26 - Médéa","27 - Mostaganem","28 - M'Sila","29 - Mascara","30 - Ouargla",
  "31 - Oran","32 - El Bayadh","33 - Illizi","34 - Bordj Bou Arréridj","35 - Boumerdès","36 - El Tarf",
  "37 - Tindouf","38 - Tissemsilt","39 - El Oued","40 - Khenchela","41 - Souk Ahras","42 - Tipaza",
  "43 - Mila","44 - Aïn Defla","45 - Naâma","46 - Aïn Témouchent","47 - Ghardaïa","48 - Relizane",
  "49 - Timimoun","50 - Bordj Badji Mokhtar","51 - Ouled Djellal","52 - Béni Abbès","53 - In Salah",
  "54 - In Guezzam","55 - Touggourt","56 - Djanet","57 - El M'Ghair","58 - El Meniaa",
];

/* ---------- Read cart (from store.js localStorage) ---------- */
const orderCart = JSON.parse(localStorage.getItem("dentavia_cart") || "{}");
const lines = Object.entries(orderCart)
  .map(([id, qty]) => ({ p: getProduct(id), qty }))
  .filter((l) => l.p);

const subtotal = () => lines.reduce((s, l) => s + l.p.price * l.qty, 0);

/* ---------- Populate wilaya select ---------- */
const wilayaSel = document.getElementById("wilaya");
if (wilayaSel) {
  wilayaSel.innerHTML = `<option value="" disabled selected>Choisir…</option>` +
    WILAYAS.map((w) => `<option value="${w}">${w}</option>`).join("");
}

/* ---------- Shipping ---------- */
function shippingFee() {
  if (subtotal() >= CONFIG.freeShippingMin) return 0;
  const type = document.querySelector('input[name="shipType"]:checked')?.value || "domicile";
  return type === "stopdesk" ? CONFIG.feeStopdesk : CONFIG.feeDomicile;
}

/* ---------- Render summary ---------- */
function renderSummary() {
  const box = document.getElementById("summaryItems");
  if (!box) return;

  if (lines.length === 0) {
    box.innerHTML = `<p class="muted">Votre panier est vide. <a href="index.html#products">Voir les produits →</a></p>`;
    document.getElementById("orderForm")?.setAttribute("hidden", "");
  } else {
    box.innerHTML = lines.map((l) => `
      <div class="summary__line">
        <div class="summary__media${mediaClass(l.p)}"><img src="${imgOf(l.p)}" alt="" onerror="this.style.opacity=0"><span class="summary__qty">${l.qty}</span></div>
        <div class="summary__info"><strong>${l.p.name}</strong><small>${l.p.size}</small></div>
        <span class="summary__price">${fmt(l.p.price * l.qty)}</span>
      </div>`).join("");
  }

  const free = subtotal() >= CONFIG.freeShippingMin;
  const fee = shippingFee();
  document.getElementById("sumSubtotal").textContent = fmt(subtotal());
  document.getElementById("sumShipping").textContent = free ? "Gratuite" : fmt(fee);
  document.getElementById("sumTotal").textContent = fmt(subtotal() + fee);

  const dom = document.getElementById("feeDomicile");
  const sd = document.getElementById("feeStopdesk");
  if (dom) dom.textContent = free ? "Gratuit" : fmt(CONFIG.feeDomicile);
  if (sd) sd.textContent = free ? "Gratuit" : fmt(CONFIG.feeStopdesk);
}

document.querySelectorAll('input[name="shipType"]').forEach((r) =>
  r.addEventListener("change", renderSummary)
);

/* ---------- Place order ---------- */
function orderId() {
  return "DV-" + Date.now().toString(36).toUpperCase().slice(-6);
}

document.getElementById("orderForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  // basic validation
  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (lines.length === 0) return;

  const data = Object.fromEntries(new FormData(form).entries());
  const id = orderId();
  const fee = shippingFee();
  const total = subtotal() + fee;

  const order = {
    id, date: new Date().toISOString(),
    customer: data, items: lines.map((l) => ({ name: l.p.name, qty: l.qty, price: l.p.price })),
    subtotal: subtotal(), shipping: fee, total,
  };

  // persist locally (so you have a record even before a backend)
  const past = JSON.parse(localStorage.getItem("dentavia_orders") || "[]");
  past.push(order);
  localStorage.setItem("dentavia_orders", JSON.stringify(past));

  // route to merchant via WhatsApp if configured
  if (CONFIG.whatsapp) {
    const msg =
      `*Nouvelle commande DentaVia* ${id}%0A%0A` +
      `👤 ${data.firstName} ${data.lastName}%0A` +
      `📞 ${data.phone}%0A` +
      `📍 ${data.wilaya}, ${data.commune}%0A${data.address}%0A` +
      `🚚 ${data.shipType === "stopdesk" ? "Stop Desk" : "À domicile"}%0A` +
      (data.notes ? `📝 ${data.notes}%0A` : "") +
      `%0A*Produits :*%0A` +
      lines.map((l) => `• ${l.qty}× ${l.p.name} — ${fmt(l.p.price * l.qty)}`).join("%0A") +
      `%0A%0ASous-total : ${fmt(subtotal())}%0ALivraison : ${fee ? fmt(fee) : "Gratuite"}%0A*Total : ${fmt(total)}*`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
  }

  // log the order to the Google Sheet (if configured)
  sendToSheet(data, id, fee, total);

  // clear cart + show confirmation
  localStorage.removeItem("dentavia_cart");
  showConfirmation(order);
});

/* ---------- Google Sheet logging ---------- */
function sendToSheet(data, id, fee, total) {
  if (!CONFIG.sheetEndpoint) return;

  // "16 - Alger" -> code "16", name "Alger"
  const wMatch = String(data.wilaya).match(/^(\d+)\s*-\s*(.+)$/);
  const provinceCode = wMatch ? wMatch[1] : "";
  const province = wMatch ? wMatch[2] : data.wilaya;
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const dateTime = new Date().toLocaleString("fr-DZ");

  // one row per product line, matching the sheet columns:
  // Date Time | Order Number | Full Name | Province | Province Code | City | Address 1 | Phone | SKU | Quantity | Total Price
  // leading "'" forces Sheets to keep leading zeros on phone & SKU (text, not number)
  const rows = lines.map((l, i) => ([
    dateTime, id, fullName, province, provinceCode, data.commune,
    data.address, "'" + data.phone,
    "'" + ((CONFIG.sku && CONFIG.sku[l.p.id]) || l.p.id),
    l.qty,
    i === 0 ? total : "",   // full COD total (incl. delivery) on the first row only
  ]));

  // text/plain avoids a CORS preflight to Apps Script; fire-and-forget.
  fetch(CONFIG.sheetEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ rows }),
  }).catch(() => {});
}

function showConfirmation(order) {
  document.getElementById("checkoutMain")?.setAttribute("hidden", "");
  const view = document.getElementById("confirmView");
  const badge = document.getElementById("cartOpen");
  if (badge) badge.setAttribute("data-count", "0");
  document.getElementById("confirmId").textContent = order.id;
  document.getElementById("confirmSummary").innerHTML =
    order.items.map((i) => `<div class="summary__row"><span>${i.qty}× ${i.name}</span><span>${fmt(i.price * i.qty)}</span></div>`).join("") +
    `<div class="summary__row summary__total"><span>Total (paiement à la livraison)</span><span>${fmt(order.total)}</span></div>`;
  view?.removeAttribute("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Init ---------- */
renderSummary();
