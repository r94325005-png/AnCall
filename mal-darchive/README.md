# 燼與痕——與德希達《Mal d'archive》的在地對話

**Cinders & Traces — Reading Derrida's *Archive Fever* in Taiwan**

本站是 Jacques Derrida《Mal d'archive : une impression freudienne》（Galilée, 1995；英譯 *Archive Fever*, University of Chicago Press, 1996）的讀書會延伸網站，為研究生與學術讀書會而作。全站以臺灣繁體中文撰寫，導讀為原創詮釋，並以法／英／中三語對校窗口、臺灣在地脈絡接線（轉型正義檔案、原住民記憶政治、數位典藏）與讀書會提問設計為三條主軸。

## 使用方式

純靜態 HTML／CSS／JS，無任何建置步驟與外部相依（僅載入 Google Fonts）。下載後直接以瀏覽器開啟 `index.html` 即可（支援 `file://` 直開）；或部署至 GitHub Pages 等任何靜態主機，將本資料夾設為網站根目錄即可。

## 站點結構（15 頁）

```
website/
├── index.html            全書地圖（五章導覽、概念星叢、閱讀指引）
├── about.html            關於本站（德希達與本書、AI 協作方法論）
├── glossary.html         三語術語表（133 詞條，全站錨點目標）
├── excerpts.html         精選段落（14 段法英中三語對照＋譯注）
├── genealogy.html        概念系譜（Freud→Yerushalmi→Derrida 流轉單）
├── taiwan.html           臺灣脈絡（archive 概念的在地共振六區）
├── resources.html        延伸資源（書目與機構，零外連設計）
├── reading-guide.html    讀書會帶領指南（週數方案、流程、倫理）
├── trilingual.html       翻譯方法論（對校管線、事故報告、不可譯性）
├── license.html          授權聲明（七條）
├── chapters/             五章導讀，每章五段樂章
│   ├── exergue.html      題銘（§1–§14）——命名政治與 arkheîon
│   ├── preambule.html    序曲（§1–§12）——impression 三重疊印
│   ├── avantpropos.html  前言（§1–§66）——對死者說話與轉型正義
│   ├── theses.html       論題（§1–§16）——幽靈的語種與在地語彙
│   └── postscriptum.html 後記（§1–§8）——灰燼、災難記憶與數位典藏極限
└── assets/
    ├── style.css         視覺系統 v2「焦夜公文」唯一樣式來源
    ├── nav.js            導覽、戳記入場、塗黑顯影機關
    └── templates.html    建頁模板（內部檔案，已標 noindex）
```

每個章節頁均含五段樂章：① 論旨精煉 → ② 在地接線 → ③ 交錯提問 → ④ 三語窗口 → ⑤ 術語與延伸。

## 視覺系統：「焦夜公文」

設計概念是「從火場裡搶救出來的公文」——焦黑檔案室之夜（暗語境）與紅框公文紙、索引卡、解密戳記（紙語境）的並置。arkheîon 本來就是官署：德希達被歸檔在他所批判的公文美學裡，視覺即論證。互動機關包括塗黑顯影（`.redacted`）、戳記入場（`.stamp-in`）與餘燼裂縫分隔線（`hr.cinder`），全部尊重 `prefers-reduced-motion`，鍵盤可操作，符合 WCAG AA。

## 授權與引用

詳見 `license.html`。要點：法文原書版權屬 Éditions Galilée（1995）、英譯版權屬 University of Chicago Press（1996）；站內法／英引文均為研究性短段節錄並逐則標注頁碼，譯注與導讀為評論主體；全站導讀、在地接線、提問設計為原創內容，供非營利學術讀書會使用；全站視覺均為自製 CSS／SVG。中譯全文不公開。

## 製作說明

本站以人機協作方式建構（方法論詳見 `about.html` 與 `trilingual.html`）：三語對校以原書掃描與英譯本逐段核對，臺灣在地內容僅採用經查證之事實並標注查證時點。`_design_options/` 為開發期設計樣稿，非網站的一部分，不隨上架包發布（已列入 `.gitignore`）。

---

頁面內容查證時點：2026 年 6 月。發現錯誤或想延伸討論，歡迎開 issue。
