# LUMIÈRE 跨境电商独立站 — 使用与上线指南

这是一个**开箱即用**的东南亚跨境电商独立站，无需服务器、无需数据库、无需编程知识即可上线。

---

## 一、这个站有什么

| 功能 | 说明 |
|---|---|
| 首页 | 品牌展示、品类入口、热卖商品、新品、客户评价 |
| 商品列表（shop.html） | 品类筛选、价格区间、排序，支持链接直达（如 `shop.html?cat=women`） |
| 商品详情（product.html） | 多图切换、颜色/尺码选择、断码自动置灰、尺码表、面料说明 |
| 购物车 | 侧边抽屉、数量增减、自动保存（关掉浏览器不丢失）、免运费进度条 |
| 结算（checkout.html） | 六国地址表单（自动切换字段标签）、3 种配送、4 种支付（含货到付款）、优惠码、表单校验 |
| 下单成功（success.html） | 订单号、预计送达日期、支付方式摘要 |
| 多币种 | SGD / MYR / THB / PHP / IDR / VND / USD，全站价格实时换算，记忆用户选择 |
| 移动端 | 完全适配手机（东南亚 70% 以上流量来自手机） |

**内置优惠码（演示用）：** `WELCOME10` 首单 9 折 · `SEA20` 满 S$60 立减 20 · `FREESHIP` 免运费

---

## 二、上线只需 10 分钟（完全免费）

### 步骤 1：注册 Vercel 账号
打开 [vercel.com](https://vercel.com)，用邮箱注册（或直接用 Google 账号登录）。

### 步骤 2：上传网站
1. 登录后点 **「Add New」→「Project」**
2. 如果没有代码仓库，可以直接把 `lumiere-store` 整个文件夹**拖拽**到 Vercel 的部署页面
   （更简单的方式：把文件夹压缩成 zip，在 Vercel 选择「Import Third-Party Repository」或先用 GitHub 中转，见下方"最简路径"）

**最简路径（推荐零基础用户）：**
1. 注册 [github.com](https://github.com)，新建一个仓库（选 Public）
2. 点「uploading an existing file」，把 `lumiere-store` 文件夹里**所有文件**拖进去，点 Commit
3. 回到 Vercel，点「Add New → Project → Import」选中刚建的仓库，直接点 Deploy
4. 30 秒后你会得到一个网址，如 `https://lumiere-store.vercel.app`，任何人在任何国家都能访问

### 步骤 3：绑定自己的域名（可选，但强烈建议）
1. 在阿里云/腾讯云/GoDaddy/Namecheap 购买域名（推荐 `.com` 或 `.shop`，约 ¥60–100/年）
2. 在 Vercel 项目设置 → Domains → 添加你的域名
3. 按提示在域名服务商那里加一条 CNAME 记录指向 `cname.vercel-dns.com`
4. 等 10 分钟～几小时生效，网站自动获得 HTTPS

### 其他可选托管平台
- **Netlify**（netlify.com）：同样免费，也支持拖拽部署
- **Cloudflare Pages**（pages.cloudflare.com）：免费且在东南亚访问速度通常最好

---

## 三、日常运营怎么做

### 上架 / 修改商品（不用写代码）
用任何文本编辑器（Windows 记事本、VS Code）打开 `data/products.json`，照着现有格式改：

```json
{
  "id": "my-new-product",        ← 唯一编号，不能重复
  "title": "商品中文名",
  "title_en": "English Name",
  "category": "women",           ← women/men/bags/shoes/acce 五选一
  "price": 49,                   ← 基准价（新加坡元 SGD）
  "compareAt": 69,               ← 划线原价（不打折就填 0）
  "rating": 4.8, "reviews": 214,
  "flag": "sale", "badge": "热卖",
  "images": ["图片链接1", "图片链接2"],
  "colors": [ { "name": "颜色名", "hex": "#EFE9E0" } ],
  "sizes": ["S", "M", "L"],
  "soldOutSizes": ["S"],         ← 断码填这里
  "desc": "商品描述",
  "material": "面料成分",
  "care": "洗护说明",
  "stock": 100
}
```

图片链接怎么来：把商品图上传到 [imgur.com](https://imgur.com) 或阿里云 OSS，复制图片直链填入即可。
改完后把文件重新上传到 GitHub，Vercel 会自动重新发布（约 1 分钟）。

### 修改免运费门槛 / 运费
打开 `js/cart.js`，找到 `FREE_THRESHOLD: 80`（免运费门槛，SGD）和 `methods` 里的运费数字。

### 修改汇率
打开 `js/currency.js`，改 `rate` 字段。建议每月手动更新一次（搜索"SGD to MYR"等即可查到当日汇率）。上线做大后可接入自动汇率 API。

---

## 四、接入真实收款（重要）

当前网站的支付流程是**演示模式**（不会真实扣款）。正式收款需要接入支付网关，东南亚常用：

| 网关 | 覆盖 | 特点 |
|---|---|---|
| **Stripe** | 新加坡、马来西亚、泰国 | 体验最好，需公司主体 |
| **2C2P** | 东南亚全境 | 本地化程度高 |
| **Xendit** | 印尼、菲律宾 | 印尼菲律宾首选，支持 COD 管理 |
| **PayPal** | 全球 | 跨境买家信任度高，可作为补充 |

接入方式：注册网关 → 拿到 API 密钥 → 将 checkout.html 的提交逻辑改为跳转到网关收银台（每种网关都有官方中文/英文文档和现成代码示例，照抄即可）。**没有公司主体时**，初期可先用 Shopify Buy Button 或第三方收款工具过渡。

> ⚠️ 合规提醒：正式经营需要营业执照；新加坡/马来西亚站需附上公司注册号和隐私政策；卖往印尼/越南注意进口电商税务新规。

---

## 五、物流怎么发

独立站订单的常见发货方式（无需自建物流）：

1. **专线小包**（推荐起步）：4PX、燕文、云途等，官网下单→寄到仓库→他们发往东南亚，3–8 天妥投，支持 COD 代收
2. **新加坡海外仓**：批量备货到新加坡仓，出库快（2–3 天达全境），适合稳定出单后
3. **国际快递**（DHL/FedEx）：高客单价商品用，成本高

结算页里的配送时效文案可在 `js/cart.js` 的 `Shipping.methods` 中按你的实际渠道修改。

---

## 六、目录结构

```
lumiere-store/
├── index.html          首页
├── shop.html           商品列表
├── product.html        商品详情
├── checkout.html       结算
├── success.html        下单成功
├── css/style.css       全部样式（改配色/字体在这里）
├── js/currency.js      货币与汇率
├── js/cart.js          购物车、运费、优惠码
├── js/ui.js            页头页脚、商品卡片、通用组件
└── data/products.json  商品数据（上架改这里）
```

## 七、本地预览（三种方式任选）

**方式一：一键启动（推荐）**
- Windows：双击 `start.bat`
- macOS / Linux：终端里运行 `bash start.sh`

脚本会自动检测 Python、自动打开浏览器、端口被占用时自动顺延，并打印出访问地址。

**方式二：手动启动**
在任何电脑上，进入文件夹运行：
```bash
python3 -m http.server 8080
```
然后浏览器打开 `http://localhost:8080`。

**方式三：直接打开**
直接双击 `index.html` 也能看视觉，但商品数据（`data/products.json`）在部分浏览器下会因本地文件安全策略加载失败，**建议用前两种方式**。

---

## 八、项目已初始化 Git 版本管理

项目已经是一个 Git 仓库，首次提交已完成。改完内容后想留个存档：

```bash
git add -A
git commit -m "说明这次改了什么"
git log --oneline        # 查看历史
```

如果误改想回退：`git checkout -- 文件名`（放弃该文件的未提交修改）。

想备份到云端（同时方便 Vercel 部署）：
```bash
git remote add origin https://github.com/你的用户名/lumiere-store.git
git push -u origin main
```

