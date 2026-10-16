/* ============================================================
   LUMIÈRE — 多币种货币模块
   基准货币：SGD（新加坡元）
   汇率按固定基准写死在 rates 里，接入真实汇率时替换此对象即可
   ============================================================ */

const CURRENCIES = {
  SGD: { code: "SGD", symbol: "S$",   name: "新加坡元",    rate: 1,        decimals: 2, locale: "en-SG" },
  MYR: { code: "MYR", symbol: "RM",   name: "马来西亚林吉特", rate: 3.42,   decimals: 2, locale: "ms-MY" },
  THB: { code: "THB", symbol: "฿",    name: "泰铢",        rate: 26.4,     decimals: 0, locale: "th-TH" },
  PHP: { code: "PHP", symbol: "₱",    name: "菲律宾比索",  rate: 42.8,     decimals: 0, locale: "en-PH" },
  IDR: { code: "IDR", symbol: "Rp",   name: "印尼盾",      rate: 11850,    decimals: 0, locale: "id-ID" },
  VND: { code: "VND", symbol: "₫",    name: "越南盾",      rate: 18900,    decimals: 0, locale: "vi-VN" },
  USD: { code: "USD", symbol: "$",    name: "美元",        rate: 0.745,    decimals: 2, locale: "en-US" },
};

const Currency = {
  STORAGE_KEY: "lumiere_currency",
  _code: "SGD",

  get current() {
    return CURRENCIES[this._code] || CURRENCIES.SGD;
  },

  get code() {
    return this._code;
  },

  init() {
    let saved = null;
    try {
      saved = localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {
      /* localStorage 不可用时静默降级 */
    }
    if (saved && CURRENCIES[saved]) this._code = saved;
    return this;
  },

  set(code) {
    if (!CURRENCIES[code]) return;
    this._code = code;
    try {
      localStorage.setItem(this.STORAGE_KEY, code);
    } catch (e) {
      /* 忽略写入失败 */
    }
    document.dispatchEvent(new CustomEvent("currency:change", { detail: { code } }));
  },

  /**
   * 把基准货币（SGD）金额换算成当前货币
   * @param {number} baseAmount 基准货币金额
   * @returns {number} 换算后金额
   */
  convert(baseAmount) {
    return baseAmount * this.current.rate;
  },

  /**
   * 格式化金额（自动加符号、千分位、按币种保留小数）
   * @param {number} baseAmount 基准货币金额
   */
  format(baseAmount) {
    const c = this.current;
    const val = this.convert(baseAmount);
    let body;
    try {
      body = new Intl.NumberFormat(c.locale, {
        minimumFractionDigits: c.decimals,
        maximumFractionDigits: c.decimals,
      }).format(val);
    } catch (e) {
      body = val.toFixed(c.decimals);
    }
    // 符号后是否留空格（Rp 需要空格，其余不需要）
    const sep = c.code === "IDR" || c.code === "VND" ? " " : "";
    return `${c.symbol}${sep}${body}`;
  },

  /** 仅返回当前货币符号 */
  symbol() {
    return this.current.symbol;
  },

  /** 供下拉框使用的列表 */
  list() {
    return Object.values(CURRENCIES);
  },
};

window.Currency = Currency;
