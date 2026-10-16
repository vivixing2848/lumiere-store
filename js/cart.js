/* ============================================================
   LUMIÈRE — 购物车模块
   localStorage 持久化，支持多 SKU（颜色 + 尺码）
   ============================================================ */

const Cart = {
  STORAGE_KEY: "lumiere_cart_v1",
  items: [],

  init() {
    this.load();
    document.dispatchEvent(new CustomEvent("cart:update", { detail: { items: this.items } }));
    return this;
  },

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(this.items)) this.items = [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      /* 忽略配额或隐私模式错误 */
    }
    document.dispatchEvent(new CustomEvent("cart:update", { detail: { items: this.items } }));
  },

  /** 生成 SKU 唯一键 */
  lineKey(productId, color, size) {
    return `${productId}::${color}::${size}`;
  },

  /**
   * 加入购物车
   * @returns {object} 当前行
   */
  add(product, color, size, qty = 1, image = null) {
    const key = this.lineKey(product.id, color, size);
    const exist = this.items.find((i) => i.key === key);
    if (exist) {
      exist.qty = Math.min(exist.qty + qty, 99);
    } else {
      this.items.push({
        key,
        id: product.id,
        title: product.title,
        price: product.price,       // 基准货币 SGD
        compareAt: product.compareAt || 0,
        image: image || product.images[0],
        color,
        size,
        qty: Math.min(qty, 99),
      });
    }
    this.save();
    return this.items.find((i) => i.key === key);
  },

  setQty(key, qty) {
    const item = this.items.find((i) => i.key === key);
    if (!item) return;
    const n = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    item.qty = n;
    this.save();
  },

  remove(key) {
    this.items = this.items.filter((i) => i.key !== key);
    this.save();
  },

  clear() {
    this.items = [];
    this.save();
  },

  /** 商品总件数 */
  count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  },

  /** 小计（基准货币 SGD） */
  subtotal() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  },

  isEmpty() {
    return this.items.length === 0;
  },
};

/* ============================================================
   运费与优惠规则
   ============================================================ */

const Shipping = {
  /** 免运费门槛（基准货币 SGD） */
  FREE_THRESHOLD: 80,

  methods: [
    {
      id: "standard",
      name: "标准配送",
      eta: "5–8 个工作日",
      note: "新加坡直邮，全程可追踪",
      fee: 6.9,
    },
    {
      id: "express",
      name: "快速配送",
      eta: "2–3 个工作日",
      note: "优先出库，DHL / Ninja Van",
      fee: 14.9,
    },
    {
      id: "pickup",
      name: "自提点取货",
      eta: "4–6 个工作日",
      note: "就近自提柜，免运费",
      fee: 0,
    },
  ],

  /** 计算运费（基准货币 SGD） */
  fee(methodId, subtotal) {
    const m = this.methods.find((x) => x.id === methodId);
    if (!m) return 0;
    if (methodId === "standard" && subtotal >= this.FREE_THRESHOLD) return 0;
    if (methodId === "express" && subtotal >= 150) return 0;
    return m.fee;
  },

  /** 距离免运费还差多少 */
  gapToFree(subtotal) {
    return Math.max(0, this.FREE_THRESHOLD - subtotal);
  },
};

/* ============================================================
   优惠码
   ============================================================ */
const Promos = {
  codes: {
    WELCOME10: { type: "percent", value: 10, label: "新客首单 9 折" },
    SEA20:     { type: "fixed",   value: 20, label: "东南亚专享立减 S$20" },
    FREESHIP:  { type: "freeship", value: 0, label: "免运费" },
  },

  /** 校验并返回优惠信息 */
  apply(code, subtotal) {
    const c = String(code || "").trim().toUpperCase();
    if (!c) return { ok: false, msg: "请输入优惠码" };
    const promo = this.codes[c];
    if (!promo) return { ok: false, msg: "优惠码无效或已过期" };
    if (c === "SEA20" && subtotal < 60) {
      return { ok: false, msg: "该优惠码需订单满 S$60 可用" };
    }
    return { ok: true, code: c, promo };
  },

  /** 计算折扣额（基准货币 SGD） */
  discount(promo, subtotal) {
    if (!promo) return 0;
    if (promo.type === "percent") return subtotal * (promo.value / 100);
    if (promo.type === "fixed") return Math.min(promo.value, subtotal);
    return 0;
  },
};

window.Cart = Cart;
window.Shipping = Shipping;
window.Promos = Promos;
