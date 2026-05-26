# Za IV 後五章視覺化教材｜ChatGPT 任務包

> 配合 `za_iv16` 到 `za_iv20` 五份 HTML 教材使用
> 目的：第二次迭代時，把 ChatGPT 生成的圖像嵌入 HTML，把這套教材推到更華麗的層次
> 交付時間：陽明交大尼采通識課，遠距 Google Meet 授課

---

## Part A ｜ 統一視覺風格綱領（每次提問都要附上）

每次給 ChatGPT 下繪圖指令時，先貼這段「風格基底」，再貼具體場景。這樣五張圖的風格會統一。

### 中文版（簡短）

> **風格綱領**：19 世紀末德奧象徵主義油畫風格（Symbolism），參考 Arnold Böcklin、Franz von Stuck、Gustav Klimt、Fernand Khnopff、Odilon Redon。深沉、神秘、哲學性的氛圍。強烈明暗對比（chiaroscuro）。古典構圖。電影定格般的莊嚴感。色調以暗赭、深褐、月光藍、火焰橙、古金色為主。油畫質感，可見筆觸。
>
> **嚴格要求**：
> - 整張圖**不能有任何文字、標題、簽名、書頁、書寫符號**
> - 比例 16:9（適合做 HTML hero 圖）
> - 構圖必須有清楚的視覺焦點，避免雜亂
> - 避免現代元素，所有場景設定在 1880 年代的時間質感
> - 人物面孔不要太精細（保持象徵性，避免肖像感）

### English version (for direct ChatGPT/DALL-E input)

> **Style guideline**: Late 19th-century German/Austrian Symbolist oil painting, in the manner of Arnold Böcklin, Franz von Stuck, Gustav Klimt, Fernand Khnopff, and Odilon Redon. Deep, mystical, philosophical atmosphere. Strong chiaroscuro. Classical composition. Cinematic gravitas, like a film still. Color palette: dark ochre, deep umber, moonlit blues, flame orange, antique gold. Visible oil-paint brushwork.
>
> **Strict requirements**:
> - **No text, no titles, no signatures, no books, no written symbols anywhere in the image**
> - Aspect ratio 16:9
> - Clear visual focal point, avoid clutter
> - No modern elements; 1880s temporal quality
> - Faces should be symbolic rather than portrait-realistic

---

## Part B ｜ 五張主視覺 Prompt（每章一張）

### 圖 1 ｜ IV-16 沙漠女兒

**檔名建議**：`hero_iv16_sand_daughters.jpg`
**放置位置**：HTML header 下方，作為章節開場
**對應 HTML 元素**：插入到 `<header class="chapter-header">` 結束之後，作為 `<div class="hero-image">`

#### English prompt

```
[Style guideline above]

A solitary European wanderer in dark traveler's clothes sits cross-legged at the base of a palm tree in a vast moonlit desert oasis. He clutches an ancient harp loosely; his eyes are closed in self-absorbed reverie. Behind him, half-dissolved in indigo shadow, two veiled feminine figures stand silently — almost feline in posture, faces unseen, like sphinxes carved from sand. The desert horizon recedes into deep violet dusk. A massive crescent moon hangs low and gold. Date palms cast long shadows. The wanderer's pose is theatrical, almost performative — as if he is reciting a poem only he hears. Aesthetic: oneiric Orientalist romanticism, mixed with the cold detachment of a Symbolist critique. Color palette: deep indigo, antique gold, dusty rose, bronze. 16:9.
```

#### 中文補充說明（如果你想加細節）

> 重點是**影子的姿態**：他的閉眼必須帶有「自我陶醉」的味道，他抱著豎琴的方式應該透露一種「我在表演給自己看」的氣質。兩個東方女子要在背景中——不要太搶眼，但要能感覺到她們的沉默重量。整張圖應該讓觀者立刻感覺到：**這個歐洲男人愛上了自己想像出來的東方**。

---

### 圖 2 ｜ IV-17 喚醒

**檔名建議**：`hero_iv17_erweckung.jpg`
**放置位置**：HTML header 下方

#### English prompt

```
[Style guideline above]

A torchlit mountain cave at midnight, seen from the outside. Through the cave entrance, thick incense smoke billows out — bluish, curling. Inside, eight gaunt aged figures kneel on bare stone, hands clasped in fervent prayer, their backs to the viewer. At the center stands a golden-grey donkey, illuminated as if sacred, its long ears casting strange shadows. Before the donkey, the ugliest old man raises one trembling hand toward the beast in liturgical gesture. Pine cones burn in a brazier, smoking. Outside the cave, just barely visible at the edge, the silhouette of Zarathustra peeks in — half-turned, witnessing in horror. The atmosphere is sacred-grotesque: a real religious ceremony performed for a false object. Aesthetic: Franz von Stuck's "Lucifer" meets medieval folk Christianity. Color palette: deep umber, ember orange, smoke grey-blue, donkey gold. 16:9.
```

#### 中文補充

> 重點是**禮拜的真實性**：跪拜的人們不能有「在玩」的感覺，必須非常認真——這正是尼采的觀點：他們真的回到了宗教。查拉的身影只要一小部分（一個側影、一個眼睛），他在偷看。焚香的煙是重要的視覺元素，因為文本特別強調「鼻子聞到松脂的煙」。

---

### 圖 3 ｜ IV-18 驢子節

**檔名建議**：`hero_iv18_eselsfest.jpg`

#### English prompt

```
[Style guideline above]

A grand torchlit subterranean hall opens up to reveal a chaotic medieval carnival scene. A golden donkey, crowned with a wreath of laurels and adorned with garlands, stands triumphantly on a low stone altar. Around it, six or seven aged figures dance and gesture in mock-liturgical procession — one wearing a tattered papal mitre, one in a magician's robe, one in beggar's rags, one a king with crown askew. A bonfire crackles. Wine spills from overturned goblets. To the right, at the cave entrance, Zarathustra stands tall in white robes, gripping a long wooden staff — his expression caught between fury and an emerging dark amusement, his head slightly tilted. The atmosphere is Bakhtinian carnival: sacred and profane fused, mockery and worship indistinguishable. Composition recalls Bosch's "Garden of Earthly Delights" filtered through Klimt's gold. Color palette: gold leaf, ember red, midnight blue, candle-white. 16:9.
```

#### 中文補充

> 重點是**嘉年華式的混亂秩序**：所有人在跳舞，但跳的是某種禮拜舞，所以是「失序的秩序」。查拉的表情是這張圖的關鍵——他不能完全憤怒，也不能完全笑，要在兩者之間。如果可以，讓他的拐杖舉起一半。

---

### 圖 4 ｜ IV-19 夢遊者之歌

**檔名建議**：`hero_iv19_nachtwandler.jpg`

#### English prompt

```
[Style guideline above]

A high mountain plateau at the deepest hour of midnight. An enormous full moon — almost unnaturally large — fills the upper half of the sky in pale silver-gold. Below, a small group of aged figures stand in a loose semicircle, their faces turned upward in reverent silence. At the center, Zarathustra stands alone, swaying slightly like a drunk man, his white beard catching moonlight, one finger pressed against his lips in a gesture of silence-commanding revelation. From the dark valley below, faint concentric ripples of bell-sound rise toward him, visualized as luminous expanding circles in the night air. An ancient bell tower is barely visible in the deep distance. A few stars. The night is so still it feels solid. Atmosphere: Caspar David Friedrich's metaphysical solitude meets Klimt's gold leaf, with a touch of Bocklin's "Isle of the Dead" darkness. Color palette: deep midnight blue, moon-silver, antique gold, faint star-white. 16:9.
```

#### 中文補充

> 這張圖最重要的元素是「**鐘聲的視覺化**」——從山谷下升上來的同心圓波紋，要做得像光環一樣，半透明，讓人看了感覺「能聽見」。查拉手指放在嘴上的姿態是文本明確記載的，必須有。月亮要做得異常大——超出寫實比例——以強調這是夢境化的時刻。

---

### 圖 5 ｜ IV-20 徵兆（全書終）

**檔名建議**：`hero_iv20_zeichen.jpg`

#### English prompt

```
[Style guideline above]

Dawn on a high mountain. Soft golden-pink light floods the sky from a sun just beginning to rise from behind dark distant peaks — the sun is still LOW, not yet near zenith. In the foreground, Zarathustra sits on a large weathered grey stone outside his cave entrance. A great golden lion lies at his feet, its enormous head resting tenderly on his knees, eyes half-closed in devotion. A cloud of doves swirls in soft motion around his head and shoulders, several perched on his arms and stone. One tear visibly slides down Zarathustra's bearded face — the lion gently licks his hand. His expression: serene, transformed, no longer striving. Behind him, the cave mouth is dark and quiet — the higher men have fled, invisible. The mountain landscape stretches into hazy golden infinity. Aesthetic: Odilon Redon's late mystical pastels meet Bocklin's "Self-Portrait with Death". Color palette: dawn rose-gold, lion's tawny gold, dove-grey-white, stone violet-grey, deep mountain blue. 16:9.
```

#### 中文補充

> 這是全書最重的一張。重點：
> - **太陽必須是「在升起」，不是「已經升上來」**——因為偉大正午沒有到達，這是 IV-20 的核心。讓太陽很低，光是被預示的光。
> - **獅子的姿態必須是溫柔的**——「像終於找回主人的狗」。不是威武的獅子，是被愛馴服的獅子。
> - **眼淚**——文本明確提到「眼淚落在他的手上」，這個細節要有。
> - **沒有高等人**——他們已經逃了。洞穴空了。

---

## Part C ｜ 嵌入 HTML 的方法

每張圖生成後，命名好（用上面建議的檔名），放到 HTML 同目錄，然後在每章 `<header class="chapter-header">` 後面（meta-tag、標題、定位句之後）加入：

```html
<div class="hero-image">
  <img src="hero_iv16_sand_daughters.jpg" alt="影子在沙漠中對著虛構的東方女子吟唱" />
</div>
```

然後在 `<style>` 區塊加上：

```css
.hero-image {
  margin: 48px auto 60px;
  max-width: 920px;
  border: 1px solid var(--rule);
  border-radius: 4px;
  overflow: hidden;
}
.hero-image img {
  display: block;
  width: 100%;
  height: auto;
}
```

如果想要更講究——加一個古典畫框感的暗影：

```css
.hero-image {
  margin: 48px auto 60px;
  max-width: 920px;
  border: 1px solid var(--rule);
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 0 40px rgba(196, 96, 47, 0.08),
    inset 0 0 80px rgba(0, 0, 0, 0.3);
  position: relative;
}
.hero-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(15, 13, 10, 0.4) 100%);
  pointer-events: none;
}
```

下半部漸層暗淡，模擬油畫的暗角，配合暗色背景渾然一體。

---

## Part D ｜ 額外裝飾圖建議（次要 prompt，選擇性）

如果想做得更華麗，每章可以再加 1-2 張**小幅裝飾圖**，放在關鍵 section 開頭。以下是建議：

### IV-16

- **七個 Sela 旁邊的小圖**：a single drop of crimson ink suspended in candlelight, art-nouveau marginalia, ornamental gold filigree — 用來標記「自反性的痕跡」

### IV-17

- **§ 4 八段應答禮拜旁邊**：a stylized medieval illuminated manuscript margin showing a donkey wearing a bishop's mitre, gold leaf, ironic religious illumination — 用來強化 Festum Asinorum 的中世紀來源

### IV-19

- **§ 3 十二鐘聲時間軸頂端**：an ancient bronze bell suspended in moonlight, visible sound ripples emanating outward, hyperreal Symbolist still life — 強化鐘的核心地位

### IV-20

- **§ 6 偉大正午 SVG 旁邊**：a distant lone figure walking toward a horizon where a sun is forever about to rise, silhouette, gold-rose dawn, infinite distance — 視覺化「不到達」這個概念

---

## Part E ｜ 給 ChatGPT 的「資料提供任務」（不限繪圖）

繪圖之外，可以讓 ChatGPT 補強這套教材的幾個方向。以下任務直接複製貼給 ChatGPT 即可：

### 任務 1 ｜ 製作中德術語對照速查表（給學生課前預習用）

```
請為《查拉圖斯特拉如是說》第四卷第 16-20 章製作一份中德術語對照速查表。
格式：表格（德文 | 中文 | 一句話定義 | 出現章節）
範圍：以下術語必收，每條一句話定義（不超過 30 字）：

Unter Töchtern der Wüste, Sela, Die Wüste wächst,
Sprach-Sünde, Erweckung, Festum Asinorum,
I-A / Ja Homophonie, Eselsfest, Parodie der Parodie,
Erdenreich, Nachtwandler, Mitternachts-Lied,
Rundgesang, Noch Ein Mal, Lust will Ewigkeit,
Das Zeichen, Mitleiden, letzte Sünde,
grosser Mittag, Ringschliessung

語言：臺灣繁體中文。風格：學術精確、簡短可記憶。
輸出為 markdown 表格。
```

### 任務 2 ｜ 為每章設計 5 個課堂討論問題（給老師備課用）

```
請為《查拉圖斯特拉如是說》第四卷第 16-20 章每章設計 5 個課堂討論問題，
適用於陽明交通大學通識課大學生（多為理工背景，少數哲學背景）。

要求：
- 每章 5 題，由淺入深
- 第 1 題是「進入問題」（10 分鐘內可討論完）
- 第 2-3 題是「核心問題」（涉及文本細節）
- 第 4 題是「對台灣的應用」（連結當代社會）
- 第 5 題是「開放性的思想實驗」（沒有標準答案）

語言：臺灣繁體中文。風格：尖銳、可操作、避免空泛。
不要給標準答案。
```

### 任務 3 ｜ 推薦音樂搭配清單（給課堂播放用）

```
請為《查拉圖斯特拉如是說》第四卷第 16-20 章的課堂教學，
推薦適合在每章開頭或結尾播放的古典音樂（30-90 秒）。

要求：
- 每章 2-3 個選項
- 注明：作曲家、曲目、版本/演奏者（如有偏好）、Spotify 或 YouTube 可找到的連結指引、播放時長
- 必收：Mahler 第三交響曲第四樂章（IV-19 對應）、
  Richard Strauss 《查拉圖斯特拉如是說》交響詩開頭（IV-20 對應）
- 其餘曲目自由發揮，但要符合每章的氣質（沙漠主義詩、宗教覺醒、嘉年華、午夜、清晨）

語言：臺灣繁體中文。
輸出為 markdown 列表。
```

### 任務 4 ｜ 為每章寫 90 秒短講大綱（給學生課前自學）

```
請為《查拉圖斯特拉如是說》第四卷第 16-20 章每章寫一個 90 秒（約 250 字）的短講大綱，
適用於學生課前 YouTube/Podcast 自學。

要求：
- 每章 250 字（嚴格控制）
- 結構：[Hook 20 字] + [尼采在這章做了什麼 100 字] + [這對你有什麼意義 100 字] + [課堂問題 30 字]
- 語氣：直接、有重量、不哲學腔
- 第一人稱「你」與「我」

語言：臺灣繁體中文（陽明交大語境）。
五章合計 1250 字。
```

### 任務 5 ｜ 製作期末申論題與評分標準（給老師出題用）

```
請為《查拉圖斯特拉如是說》第四卷第 16-20 章，設計 8 道期末申論題，
適用於通識課申論考試（每題 25 分，學生選答 4 題）。

要求：
- 每題：題目（30-50 字）+ 評分標準（3 個層次：A 等、B 等、C 等的評分指引）
- 題目分布：2 題單章深度（任選 2 章）、3 題跨章比較、3 題對台灣／當代應用
- 避免「背誦型」題目，全部是「理解／論證／應用」型
- 不要給標準答案，給評分指引

語言：臺灣繁體中文。
輸出為 markdown，每題一個 section。
```

### 任務 6 ｜ 整理延伸閱讀清單（給有興趣的學生）

```
請為《查拉圖斯特拉如是說》第四卷研究製作一份延伸閱讀清單，
分四個層級：

L1（入門）：3 本中文書／中譯本，台灣可購買到的版本
L2（進階）：3 本英文學術專著（含出版社、年份）
L3（核心德文研究）：3 本德文文獻（Grätz 的 NK 4/2 必須在其中）
L4（後殖民／當代延伸）：3 本與 IV-16〈沙漠女兒〉相關的後殖民理論著作
  （Said、Spivak 路線）

每本書一句話說明「為什麼讀這本」（20-30 字）。
輸出為 markdown。
```

---

## Part F ｜ 工作流建議

如果你想第二次迭代把整套教材推到最華麗：

**第一輪（圖像）**：
1. 把 Part A 的風格綱領 + Part B 的五個 prompt，依序貼給 ChatGPT
2. 拿到五張 hero 圖
3. 重要：每張圖生出來如果第一版不滿意，加一句「make it more like Böcklin's late work, darker, more brooding」或「reduce the saturation, increase the chiaroscuro」可以反覆調
4. 把五張圖命名好，放到 HTML 同目錄
5. 在每個 HTML 加入 Part C 的 hero-image 片段

**第二輪（裝飾與資料）**：
6. Part D 的次要圖（選擇性，要把每章再推一層華麗的話做）
7. Part E 的任務 1-6 全部跑一遍，把產出整合進教材或當作課程資源

**第三輪（聲音/動畫，如果還要更華麗）**：
8. 用 Tone.js 加入點擊「鐘聲」的聲音效果（IV-19）
9. 用 CSS animation 給「沙漠在成長」的環形圖加上慢速旋轉
10. 給每個 hero 圖加上 Ken Burns 緩慢推進效果

---

## 最後一句

這套教材的設計哲學是：**讓尼采的論證結構自己被看見**，而不是用視覺去裝飾論證。
所以「華麗」不是目的——「華麗」是因為哲學本身夠重，所以裝它的器皿也應該夠重。

> Die Wüste wächst: weh Dem, der Wüsten birgt!
> 沙漠在成長：禍哉，藏匿沙漠者！

— Also sprach Zarathustra.
