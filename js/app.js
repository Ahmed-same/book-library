/* Waraq Library — app */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const MAX_BORROW = 3;
const BORROW_DAYS = 14;
const SHIPPING = 30;
const FREE_SHIPPING = 600;

const state = {
  cart: load("waraq.cart", {}),
  borrows: load("waraq.borrows", {}),
  query: "",
  cat: "all",
  borrowOnly: false,
  sort: "featured"
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
function save() {
  localStorage.setItem("waraq.cart", JSON.stringify(state.cart));
  localStorage.setItem("waraq.borrows", JSON.stringify(state.borrows));
}
const book = (slug) => BOOKS.find((b) => b.slug === slug);
const money = (n) => `${n.toLocaleString("en-US")} <small>EGP</small>`;
const sectionName = (id) => (SECTIONS.find((s) => s.id === id) || {}).name || id;
const inCart = (slug) => state.cart[slug] || 0;
const isBorrowed = (slug) => Boolean(state.borrows[slug]);

/* ---------------- sections ---------------- */
function renderSections() {
  const grid = $("#sectionGrid");
  grid.innerHTML = SECTIONS.map((s) => {
    const books = BOOKS.filter((b) => b.section === s.id);
    const thumbs = books.slice(0, 3)
      .map((b) => `<img src="${b.image}" alt="" loading="lazy">`).join("");
    return `
      <button class="section-card reveal" data-cat="${s.id}">
        <div class="thumb">${thumbs}</div>
        <h3>${s.name}</h3>
        <span>${books.length} books · ${s.blurb}</span>
      </button>`;
  }).join("");

  $("#footerSections").innerHTML = SECTIONS
    .map((s) => `<li><a href="#catalog" data-cat="${s.id}">${s.name}</a></li>`).join("");
}

function renderChips() {
  const chips = [{ id: "all", name: "All books" }, ...SECTIONS];
  $("#catChips").innerHTML = chips.map((c) => `
    <button class="chip ${state.cat === c.id ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`).join("");
}

/* ---------------- catalog ---------------- */
function visibleBooks() {
  let list = BOOKS.slice();
  const q = state.query.trim().toLowerCase();
  if (q) {
    list = list.filter((b) =>
      (b.title + " " + b.author + " " + sectionName(b.section)).toLowerCase().includes(q));
  }
  if (state.cat !== "all") list = list.filter((b) => b.section === state.cat);
  if (state.borrowOnly) list = list.filter((b) => b.borrow);
  if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (state.sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));
  return list;
}

function cardHTML(b) {
  const borrowed = isBorrowed(b.slug);
  const badge = b.borrow
    ? `<span class="badge">Borrow</span>`
    : `<span class="badge sale">Buy only</span>`;
  const borrowBtn = b.borrow
    ? `<button class="btn btn-ghost btn-sm" data-borrow="${b.slug}" ${borrowed ? "disabled" : ""}>${borrowed ? "On your shelf" : "Borrow"}</button>`
    : "";
  return `
    <article class="book-card reveal">
      <div class="cover-wrap" data-open="${b.slug}" role="link" tabindex="0" aria-label="Open ${b.title}">
        <img src="${b.image}" alt="Cover of ${b.title}" loading="lazy">
        ${badge}
      </div>
      <div class="book-info">
        <h3><a href="#/book/${b.slug}">${b.title}</a></h3>
        <p class="author">${b.author} · ${b.year}</p>
        <p class="rating"><span class="stars">★</span> <b>${b.rating}</b> <span>· ${b.pages} pages</span></p>
        <div class="price-row">
          <span class="price">${money(b.price)}</span>
          <div class="actions">
            ${borrowBtn}
            <button class="btn btn-primary btn-sm" data-add="${b.slug}">Add</button>
          </div>
        </div>
      </div>
    </article>`;
}

function renderGrid() {
  const list = visibleBooks();
  $("#bookGrid").innerHTML = list.map(cardHTML).join("");
  $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "book" : "books"}`;
  $("#emptyState").hidden = list.length > 0;
  observeReveals();
}

/* ---------------- detail ---------------- */
function renderDetail(slug) {
  const b = book(slug);
  const view = $("#view-book");
  if (!b) { view.innerHTML = `<div class="detail"><p>We could not find that book. <a href="#catalog">Back to the shelf</a>.</p></div>`; return; }
  const related = BOOKS.filter((x) => x.section === b.section && x.slug !== b.slug).slice(0, 3);
  const qty = inCart(b.slug) || 1;
  const low = b.copies <= 2;
  view.innerHTML = `
    <div class="detail">
      <div>
        <div class="detail-cover"><img src="${b.image}" alt="Cover of ${b.title}"></div>
      </div>
      <div>
        <a class="back-link" href="#catalog">← Back to the shelf</a>
        <h1>${b.title}</h1>
        <p class="byline">${b.author} · ${b.year} · ${sectionName(b.section)}</p>
        <p class="desc">${b.desc}</p>
        <dl class="meta">
          <div><dt>Price</dt><dd>${money(b.price)}</dd></div>
          <div><dt>Pages</dt><dd>${b.pages}</dd></div>
          <div><dt>Rating</dt><dd>${b.rating} / 5</dd></div>
          <div><dt>Shelf</dt><dd>${b.shelf}</dd></div>
        </dl>
        <p class="stock"><span class="dot ${low ? "low" : ""}"></span>
          ${b.copies} ${b.copies === 1 ? "copy" : "copies"} on the shelf${low ? " · almost gone" : ""}
        </p>
        <div class="buy-row" style="margin-top:18px">
          <div class="qty" aria-label="Quantity">
            <button data-qty="-1" aria-label="One less">−</button>
            <span id="detailQty">${qty}</span>
            <button data-qty="1" aria-label="One more">+</button>
          </div>
          <button class="btn btn-primary" data-add="${b.slug}">Add to cart</button>
          ${b.borrow
            ? `<button class="btn btn-ghost" data-borrow="${b.slug}" ${isBorrowed(b.slug) ? "disabled" : ""}>${isBorrowed(b.slug) ? "On your shelf" : `Borrow for ${BORROW_DAYS} days`}</button>`
            : `<span class="muted small">Reference copy · not for borrowing</span>`}
        </div>
        <p class="muted small">Delivery in Giza 1–2 days · free over ${FREE_SHIPPING} EGP</p>
      </div>
    </div>
    ${related.length ? `
    <div class="more">
      <h2>Also in ${sectionName(b.section)}</h2>
      <div class="book-grid">${related.map(cardHTML).join("")}</div>
    </div>` : ""}
  `;
  observeReveals();
}

/* ---------------- cart ---------------- */
function addToCart(slug, qty) {
  const amount = qty || 1;
  state.cart[slug] = inCart(slug) + amount;
  save();
  updateCounts();
  renderCart();
  toast(`Added “${book(slug).title}” to your cart`);
  openDrawer();
}

function changeQty(slug, delta) {
  const next = inCart(slug) + delta;
  if (next <= 0) delete state.cart[slug];
  else state.cart[slug] = next;
  save();
  updateCounts();
  renderCart();
}

function cartTotals() {
  const items = Object.entries(state.cart).map(([slug, qty]) => ({ book: book(slug), qty }));
  const subtotal = items.reduce((sum, i) => sum + i.book.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;
  return { items, subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  const { items, subtotal, shipping, total } = cartTotals();
  const body = $("#cartBody");
  const foot = $("#cartFoot");

  if (!items.length) {
    body.innerHTML = `<p class="cart-empty">Your cart is empty.<br>Every book on the shelf is one tap away.</p>`;
    foot.innerHTML = `<a class="btn btn-ghost btn-block" href="#catalog" data-close-drawer>Browse the shelf</a>`;
    return;
  }
  body.innerHTML = items.map(({ book: b, qty }) => `
    <div class="cart-item">
      <img src="${b.image}" alt="">
      <div>
        <h3>${b.title}</h3>
        <p class="author">${b.author}</p>
        <div class="qty">
          <button data-qty="-1" data-slug="${b.slug}" aria-label="One less">−</button>
          <span>${qty}</span>
          <button data-qty="1" data-slug="${b.slug}" aria-label="One more">+</button>
        </div>
      </div>
      <span class="line-total">${money(b.price * qty)}</span>
    </div>`).join("");

  foot.innerHTML = `
    <div class="cart-summary">
      <div><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <div><span>Delivery</span><span>${shipping ? money(shipping) : "Free"}</span></div>
      <div class="total"><span>Total</span><span>${money(total)}</span></div>
    </div>
    <button class="btn btn-primary btn-block" id="checkoutBtn">Checkout</button>
    <p class="muted small" style="text-align:center;margin-top:10px">Cash on delivery, or card at the desk.</p>`;
}

/* ---------------- borrowing ---------------- */
function borrowBook(slug) {
  const b = book(slug);
  if (!b.borrow || isBorrowed(slug)) return;
  if (Object.keys(state.borrows).length >= MAX_BORROW) {
    toast(`You already have ${MAX_BORROW} books. Return one first.`);
    return;
  }
  const due = new Date();
  due.setDate(due.getDate() + BORROW_DAYS);
  state.borrows[slug] = due.toISOString();
  save();
  updateCounts();
  renderGrid();
  toast(`Borrowed “${b.title}” · due ${fmtDate(due)}`);
  if (!$("#view-borrow").hidden) renderBorrows();
}

function returnBook(slug) {
  delete state.borrows[slug];
  save();
  updateCounts();
  renderBorrows();
  renderGrid();
  toast(`Returned “${book(slug).title}”. Thank you!`);
}

function fmtDate(d) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function renderBorrows() {
  const list = $("#borrowList");
  const entries = Object.entries(state.borrows).sort((a, b) => new Date(a[1]) - new Date(b[1]));
  if (!entries.length) {
    list.innerHTML = `<div class="borrow-empty">
      <p>Nothing borrowed yet. Pick any book marked <em>Borrow</em> and it lands here for ${BORROW_DAYS} days.</p>
      <p style="margin-top:12px"><a href="#catalog">Browse the shelf →</a></p>
    </div>`;
    return;
  }
  list.innerHTML = entries.map(([slug, iso]) => {
    const b = book(slug);
    const due = new Date(iso);
    const days = Math.ceil((due - new Date()) / 86400000);
    return `
      <div class="borrow-row">
        <img src="${b.image}" alt="">
        <div>
          <h3>${b.title}</h3>
          <p>${b.author}</p>
          <p class="due">Due ${fmtDate(due)} · ${days} ${days === 1 ? "day" : "days"} left</p>
        </div>
        <button class="btn btn-ghost btn-sm" data-return="${slug}">Return</button>
      </div>`;
  }).join("") + `<p class="muted small" style="margin-top:6px">${entries.length} of ${MAX_BORROW} books borrowed.</p>`;
}

/* ---------------- checkout ---------------- */
function openCheckout() {
  const { items, subtotal, shipping, total } = cartTotals();
  if (!items.length) return;
  const rows = items.map(({ book: b, qty }) =>
    `<div style="display:flex;justify-content:space-between;gap:12px;font-size:.9rem;margin-bottom:6px">
       <span>${b.title} × ${qty}</span><span>${b.price * qty} EGP</span></div>`).join("");
  $("#modalBody").innerHTML = `
    <h2 id="modalTitle">Confirm your order</h2>
    <p>${items.length} ${items.length === 1 ? "title" : "titles"} · delivered inside Giza in 1–2 days.</p>
    ${rows}
    <div style="display:flex;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-weight:600">
      <span>Total</span><span>${total} EGP</span>
    </div>
    <p class="small muted" style="margin:16px 0 18px">This is a demo store: no payment is taken.</p>
    <button class="btn btn-primary btn-block" id="placeOrder">Place order</button>`;
  $("#modal").hidden = false;
  document.body.classList.add("locked");
}

function placeOrder() {
  const { items, total } = cartTotals();
  const id = "WRQ-" + String(Date.now()).slice(-6);
  const titles = items.map((i) => i.book.title).join(", ");
  state.cart = {};
  save();
  updateCounts();
  renderCart();
  $("#modalBody").innerHTML = `
    <h2 id="modalTitle">Order placed</h2>
    <p>Thank you! We will call you to confirm delivery. Keep this number if you want to ask about it:</p>
    <span class="order-id">${id}</span>
    <p class="small muted">${titles} · ${total} EGP · demo order, nothing was charged.</p>
    <button class="btn btn-primary btn-block" data-close-modal>Back to the shelf</button>`;
}

/* ---------------- drawer / modal / toast ---------------- */
let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

function openDrawer() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
  requestAnimationFrame(() => $("#overlay").classList.add("show"));
  document.body.classList.add("locked");
}

function closeDrawer() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#overlay").classList.remove("show");
  document.body.classList.remove("locked");
  setTimeout(() => { if (!$("#cartDrawer").classList.contains("open")) $("#overlay").hidden = true; }, 350);
}

function closeModal() {
  $("#modal").hidden = true;
  document.body.classList.remove("locked");
}

function updateCounts() {
  const count = Object.values(state.cart).reduce((a, b) => a + b, 0);
  const badge = $("#cartCount");
  badge.textContent = count;
  badge.hidden = count === 0;
}

/* ---------------- routing ---------------- */
function showView(id) {
  ["home", "book", "borrow", "about"].forEach((v) => {
    $("#view-" + v).hidden = v !== id;
  });
  $$(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === id));
}

function route() {
  const hash = location.hash || "#/";
  if (hash.startsWith("#/book/")) {
    showView("book");
    renderDetail(hash.replace("#/book/", ""));
    window.scrollTo({ top: 0 });
  } else if (hash === "#/about") {
    showView("about");
    window.scrollTo({ top: 0 });
  } else if (hash === "#/borrow") {
    showView("borrow");
    renderBorrows();
    window.scrollTo({ top: 0 });
  } else {
    showView("home");
    if (hash === "#catalog") {
      const el = $("#catalog");
      if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }
}

/* ---------------- reveal on scroll ---------------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }
  $$(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
}

/* ---------------- events ---------------- */
function setCategory(id) {
  state.cat = id;
  renderChips();
  renderGrid();
  const el = $("#catalog");
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-add],[data-borrow],[data-return],[data-qty],[data-open],[data-cat],[data-close-drawer],[data-close-modal]");
  if (!target) return;

  if (target.dataset.add) {
    const qtyEl = $("#detailQty");
    const onDetail = !$("#view-book").hidden && qtyEl;
    addToCart(target.dataset.add, onDetail ? Number(qtyEl.textContent) : 1);
    return;
  }
  if (target.dataset.borrow) { borrowBook(target.dataset.borrow); return; }
  if (target.dataset.return) { returnBook(target.dataset.return); return; }
  if (target.dataset.qty) {
    const slug = target.dataset.slug;
    const delta = Number(target.dataset.qty);
    if (slug) { changeQty(slug, delta); return; }
    const qtyEl = $("#detailQty");
    if (qtyEl) qtyEl.textContent = Math.max(1, Number(qtyEl.textContent) + delta);
    return;
  }
  if (target.dataset.open) { location.hash = "#/book/" + target.dataset.open; return; }
  if (target.dataset.cat) { setCategory(target.dataset.cat); return; }
  if (target.hasAttribute("data-close-drawer")) { closeDrawer(); return; }
  if (target.hasAttribute("data-close-modal")) { closeModal(); return; }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeDrawer(); closeModal(); }
  if ((e.key === "Enter" || e.key === " ") && document.activeElement?.dataset.open) {
    e.preventDefault();
    location.hash = "#/book/" + document.activeElement.dataset.open;
  }
});

$("#cartBtn").addEventListener("click", openDrawer);
$("#overlay").addEventListener("click", closeDrawer);
$("#cartFoot").addEventListener("click", (e) => {
  if (e.target.id === "checkoutBtn") openCheckout();
});
$("#modalBody").addEventListener("click", (e) => {
  if (e.target.id === "placeOrder") placeOrder();
});

$("#heroSearch").addEventListener("submit", (e) => {
  e.preventDefault();
  state.query = $("#heroInput").value;
  $("#searchInput").value = state.query;
  renderGrid();
  const el = $("#catalog");
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
});

$("#searchInput").addEventListener("input", (e) => {
  state.query = e.target.value;
  renderGrid();
});
$("#borrowOnly").addEventListener("change", (e) => {
  state.borrowOnly = e.target.checked;
  renderGrid();
});
$("#sortSelect").addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderGrid();
});

$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  toast("Request sent. We will get back to you within a day.");
});

window.addEventListener("scroll", () => {
  $("#siteHeader").classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

window.addEventListener("hashchange", route);

/* ---------------- boot ---------------- */
$("#year").textContent = new Date().getFullYear();
renderSections();
renderChips();
renderGrid();
renderCart();
updateCounts();
route();
observeReveals();
