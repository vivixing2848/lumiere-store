/* ============================================================
   LUMIÈRE — 通用 UI 模块
   图标 / 页头 / 页脚 / 购物车抽屉 / Toast / 数据加载
   ============================================================ */

/* ---------- 图标库（内联 SVG，避免额外请求） ---------- */
const Icons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6.5"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 13 9 19 21 5"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h11v9H2z"/><path d="M13 10h4l4 3v3h-8z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.4-3 8-7 9-4-1-7-4.6-7-9V6z"/><polyline points="9 12 11 14 15 10"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 20v-4h4"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v5H5.5A1.5 1.5 0 0 1 4 17.5z"/><path d="M20 14h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
};

/* ---------- 页面头部 ---------- */
const NAV_LINKS = [
  { href: "index.html", label: "首页" },
  { href: "shop.html", label: "全部商品" },
  { href: "shop.html?cat=women", label: "女装" },
  { href: "shop.html?cat=men", label: "男装" },
  { href: "shop.html?cat=bags", label: "包袋" },
  { href: "shop.html?cat=shoes", label: "鞋履" },
  { href: "shop.html?cat=acce", label: "配饰" },
];

function renderHeader(activeHref = "") {
  const el = document.getElementById("site-header");
  if (!el) return;

  const navHtml = NAV_LINKS.map((l) => {
    const active = l.href === activeHref ? " is-active" : "";
    return `<a href="${l.href}" class="${active}">${l.label}</a>`;
  }).join("");

  const currencyOptions = Currency.list()
    .map((c) => `<option value="${c.code}"${c.code === Currency.code ? " selected" : ""}>${c.code} ${c.symbol}</option>`)
    .join("");

  el.innerHTML = `
    <div class="announce">
      <div class="wrap">
        <span>🌏 东南亚全境配送 · 满 <strong>${Currency.format(Shipping.FREE_THRESHOLD)}</strong> 免运费</span>
        <span>·</span>
        <span>30 天无理由退换</span>
        <span>·</span>
        <span>支持货到付款</span>
      </div>
    </div>
    <header class="header">
      <div class="wrap header__inner">
        <button class="icon-btn nav-toggle" id="nav-toggle" aria-label="菜单">${Icons.menu}</button>
        <a href="index.html" class="logo">LUMI<span>È</span>RE</a>
        <nav class="nav" id="site-nav">${navHtml}</nav>
        <div class="header__actions">
          <select class="currency-select" id="currency-select" aria-label="选择货币">
            ${currencyOptions}
          </select>
          <button class="icon-btn" aria-label="搜索">${Icons.search}</button>
          <button class="icon-btn" aria-label="账户">${Icons.user}</button>
          <button class="icon-btn" id="cart-open" aria-label="购物车">
            ${Icons.cart}
            <span class="cart-badge" id="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  `;

  // 货币切换
  const sel = document.getElementById("currency-select");
  sel.addEventListener("change", (e) => {
    Currency.set(e.target.value);
  });

  // 移动端菜单
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => nav.classList.toggle("is-open"));

  // 打开购物车
  document.getElementById("cart-open").addEventListener("click", () => CartDrawer.open());

  updateCartBadge();
}

/* ---------- 更新购物车角标 ---------- */
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const n = Cart.count();
  badge.textContent = n > 99 ? "99+" : String(n);
  badge.classList.toggle("is-visible", n > 0);
}

/* ---------- 页脚 ---------- */
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;

  el.innerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div>
            <div class="logo">LUMI<span style="color:var(--brand)">È</span>RE</div>
            <p class="footer__about">为热带气候设计的现代衣橱。精选天然面料，新加坡直邮东南亚各国。</p>
            <p class="footer__about" style="margin-top:12px">
              📧 hello@lumiere-store.com<br>
              💬 WhatsApp ${"+65 8123 4567"}
            </p>
          </div>
          <div>
            <h4>选购</h4>
            <ul>
              <li><a href="shop.html">全部商品</a></li>
              <li><a href="shop.html?cat=women">女装</a></li>
              <li><a href="shop.html?cat=men">男装</a></li>
              <li><a href="shop.html?cat=bags">包袋鞋履</a></li>
              <li><a href="shop.html?cat=acce">配饰</a></li>
            </ul>
          </div>
          <div>
            <h4>帮助</h4>
            <ul>
              <li><a href="#" data-info="shipping">配送与时效</a></li>
              <li><a href="#" data-info="returns">退换货政策</a></li>
              <li><a href="#" data-info="size">尺码指南</a></li>
              <li><a href="#" data-info="payment">支付方式</a></li>
              <li><a href="#" data-info="contact">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4>加入会员</h4>
            <p class="footer__about" style="margin-top:0">订阅获取新品首发与专属折扣，新客立减 10%。</p>
            <form class="subscribe" id="subscribe-form">
              <input type="email" placeholder="你的邮箱地址" required aria-label="邮箱">
              <button type="submit">订阅</button>
            </form>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} LUMIÈRE. 保留所有权利。</span>
          <div class="pay-marks">
            <span class="pay-mark">VISA</span>
            <span class="pay-mark">Mastercard</span>
            <span class="pay-mark">GrabPay</span>
            <span class="pay-mark">ShopeePay</span>
            <span class="pay-mark">GCash</span>
            <span class="pay-mark">货到付款</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  const form = document.getElementById("subscribe-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Toast.show("订阅成功，优惠码 WELCOME10 已发送至你的邮箱");
      form.reset();
    });
  }

  el.querySelectorAll("[data-info]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      Toast.show("该页面为演示内容，上线前可在 footer 中替换为真实链接");
    });
  });
}

/* ---------- Toast 提示 ---------- */
const Toast = {
  wrap: null,
  ensure() {
    if (!this.wrap) {
      this.wrap = document.createElement("div");
      this.wrap.className = "toast-wrap";
      document.body.appendChild(this.wrap);
    }
  },
  show(msg, withIcon = true) {
    this.ensure();
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `${withIcon ? Icons.check : ""}<span>${msg}</span>`;
    this.wrap.appendChild(t);
    setTimeout(() => {
      t.classList.add("is-out");
      setTimeout(() => t.remove(), 260);
    }, 2600);
  },
};

/* ---------- 购物车抽屉 ---------- */
const CartDrawer = {
  el: null,
  overlay: null,

  mount() {
    if (document.getElementById("cart-drawer")) return;

    this.overlay = document.createElement("div");
    this.overlay.className = "overlay";
    this.overlay.id = "cart-overlay";
    this.overlay.addEventListener("click", () => this.close());

    this.el = document.createElement("aside");
    this.el.className = "drawer";
    this.el.id = "cart-drawer";
    this.el.setAttribute("aria-hidden", "true");

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.el);

    document.addEventListener("cart:update", () => {
      updateCartBadge();
      if (this.el.classList.contains("is-open")) this.render();
    });
    document.addEventListener("currency:change", () => {
      this.render();
    });

    this.render();
  },

  open() {
    this.render();
    this.overlay.classList.add("is-open");
    this.el.classList.add("is-open");
    this.el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  close() {
    this.overlay.classList.remove("is-open");
    this.el.classList.remove("is-open");
    this.el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  },

  render() {
    if (!this.el) return;
    const items = Cart.items;
    const count = Cart.count();

    let bodyHtml;
    if (items.length === 0) {
      bodyHtml = `
        <div class="empty-state" style="padding:64px 0">
          ${Icons.bag}
          <p style="margin-top:12px">购物车还是空的</p>
          <a href="shop.html" class="btn btn--primary btn--sm" style="margin-top:16px">去逛逛</a>
        </div>`;
    } else {
      const list = items
        .map(
          (i) => `
        <div class="cart-line">
          <div class="cart-line__img"><img src="${i.image}" alt="${i.title}" loading="lazy"></div>
          <div class="cart-line__info">
            <div class="cart-line__title">${i.title}</div>
            <div class="cart-line__variant">${i.color} / ${i.size}</div>
            <div class="cart-line__row">
              <div class="qty-mini">
                <button data-act="dec" data-key="${i.key}" aria-label="减少">−</button>
                <span>${i.qty}</span>
                <button data-act="inc" data-key="${i.key}" aria-label="增加">+</button>
              </div>
              <span class="cart-line__price">${Currency.format(i.price * i.qty)}</span>
            </div>
            <button class="link-remove" data-act="rm" data-key="${i.key}" style="margin-top:8px">移除</button>
          </div>
        </div>`
        )
        .join("");

      const sub = Cart.subtotal();
      const gap = Shipping.gapToFree(sub);
      const pct = Math.min(100, (sub / Shipping.FREE_THRESHOLD) * 100);
      const shipHint =
        gap > 0
          ? `再买 <b>${Currency.format(gap)}</b> 即可免标准运费`
          : `🎉 已享免标准运费`;

      bodyHtml = list;
      var footHtml = `
        <div class="ship-bar">
          <div class="ship-bar__text">${shipHint}</div>
          <div class="ship-bar__track"><div class="ship-bar__fill" style="width:${pct}%"></div></div>
        </div>
        <div class="sum-row"><span>小计（${count} 件）</span><span>${Currency.format(sub)}</span></div>
        <div class="sum-row" style="color:var(--ink-3);font-size:12.5px"><span>运费与优惠在结算页计算</span></div>
        <a href="checkout.html" class="btn btn--primary btn--block" style="margin-top:16px">去结算</a>
        <button class="btn btn--ghost btn--block" style="margin-top:8px" data-act="continue">继续购物</button>
      `;
    }

    this.el.innerHTML = `
      <div class="drawer__head">
        <h3>购物车 <span class="count">(${count})</span></h3>
        <button class="icon-btn" id="cart-close" aria-label="关闭">${Icons.close}</button>
      </div>
      <div class="drawer__body">${bodyHtml}</div>
      ${items.length ? `<div class="drawer__foot">${footHtml}</div>` : ""}
    `;

    this.el.querySelector("#cart-close").addEventListener("click", () => this.close());

    this.el.querySelectorAll("[data-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const act = btn.dataset.act;
        const key = btn.dataset.key;
        if (act === "continue") return this.close();
        if (act === "rm") {
          Cart.remove(key);
          Toast.show("已移除商品", false);
          return;
        }
        const item = Cart.items.find((i) => i.key === key);
        if (!item) return;
        if (act === "inc") Cart.setQty(key, item.qty + 1);
        if (act === "dec") Cart.setQty(key, item.qty - 1);
      });
    });
  },
};

/* ---------- 数据加载 ---------- */
const Store = {
  _data: null,
  async load() {
    if (this._data) return this._data;
    const res = await fetch("data/products.json");
    if (!res.ok) throw new Error("商品数据加载失败");
    this._data = await res.json();
    return this._data;
  },
  async products() {
    return (await this.load()).products;
  },
  async product(id) {
    return (await this.load()).products.find((p) => p.id === id);
  },
  async categories() {
    return (await this.load()).categories;
  },
  async reviews() {
    return (await this.load()).reviewsSample;
  },
};

/* ---------- 通用工具 ---------- */
const Util = {
  /** 读取 URL 查询参数 */
  param(name) {
    return new URLSearchParams(location.search).get(name);
  },

  /** 星级渲染 */
  stars(rating, reviews) {
    const full = Math.round(rating);
    let s = "";
    for (let i = 0; i < 5; i++) {
      s += `<span style="opacity:${i < full ? 1 : 0.25}">${Icons.star}</span>`;
    }
    return `<span class="stars">${s}<span>${rating.toFixed(1)}${
      reviews != null ? ` (${reviews})` : ""
    }</span></span>`;
  },

  /** 折扣百分比 */
  discountPct(price, compareAt) {
    if (!compareAt || compareAt <= price) return 0;
    return Math.round(((compareAt - price) / compareAt) * 100);
  },

  /** 转义 HTML，防止数据里的特殊字符破坏结构 */
  esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },
};

/* ---------- 商品卡片模板 ---------- */
function productCardHtml(p) {
  const pct = Util.discountPct(p.price, p.compareAt);
  let flag = "";
  if (p.stock === 0) flag = `<span class="card__flag card__flag--soldout">已售罄</span>`;
  else if (pct > 0) flag = `<span class="card__flag card__flag--sale">-${pct}%</span>`;
  else if (p.badge) flag = `<span class="card__flag">${Util.esc(p.badge)}</span>`;

  const swatches = p.colors
    .slice(0, 5)
    .map((c) => `<i class="swatch" style="background:${c.hex}" title="${Util.esc(c.name)}"></i>`)
    .join("");

  const was = p.compareAt && p.compareAt > p.price
    ? `<span class="was">${Currency.format(p.compareAt)}</span>` : "";

  return `
    <article class="card">
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="card__media">
        ${flag}
        <img src="${p.images[0]}" alt="${Util.esc(p.title)}" loading="lazy">
      </a>
      <div class="card__quick">
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="btn btn--dark btn--sm btn--block">查看详情</a>
      </div>
      <div class="card__body">
        <div class="card__cat">${Util.esc(p.title_en)}</div>
        <a href="product.html?id=${encodeURIComponent(p.id)}"><h3 class="card__title">${Util.esc(p.title)}</h3></a>
        <div class="card__price">
          <span class="now">${Currency.format(p.price)}</span>
          ${was}
        </div>
        <div class="card__swatches">${swatches}</div>
        <div style="margin-top:6px">${Util.stars(p.rating, p.reviews)}</div>
      </div>
    </article>
  `;
}

/* ---------- 全站初始化 ---------- */
async function initSite(opts = {}) {
  Currency.init();
  Cart.init();
  renderHeader(opts.active || "");
  renderFooter();
  CartDrawer.mount();

  document.addEventListener("currency:change", () => {
    // 页面级重渲染由各页面自行监听
    const badge = document.getElementById("cart-badge");
    if (badge) updateCartBadge();
  });
}

window.Icons = Icons;
window.Toast = Toast;
window.CartDrawer = CartDrawer;
window.Store = Store;
window.Util = Util;
window.productCardHtml = productCardHtml;
window.initSite = initSite;
window.updateCartBadge = updateCartBadge;
