import { writeFileSync } from "node:fs";

const item = (id, th, en, ja, price, image) => ({ id, th, en, ja, price, image });
const rows = (category, data) => data.map((r, index) => item(`${category}.${index + 1}`, ...r));
const category = (id, th, en, ja, data, note) => ({ id, th, en, ja, items: rows(id, data), ...(note ? { note } : {}) });

const catalog = [
  category("01", "ชิโอะปัง", "Shio Pan", "塩パン", [
    ["ออริจินัล", "Original", "オリジナル", 39, "assets/catalog/01/004.jpg"],
    ["ออริจินัลช็อกโกแลต", "Original Chocolate", "オリジナルチョコレート", 49, "assets/catalog/01/001.jpg"],
    ["ออริจินัลชาร์โคล", "Original Charcoal", "オリジナル・チャコール", 49, "assets/catalog/01/005.jpg"],
    ["บานอฟฟี่", "Banoffee", "バノフィー", 59, "assets/catalog/01/010.jpg"],
    ["บลูเบอร์รีวิป", "Blueberry Whipped", "ブルーベリーホイップ", 59, "assets/catalog/01/006.jpg"],
    ["บราวนี่วิป", "Brownie Whipped", "ブラウニーホイップ", 59, "assets/catalog/01/016.jpg"],
    ["คาราเมลบานานครัมเบิล", "Caramel Banana Crumble", "キャラメルバナナクランブル", 59, "assets/catalog/01/015.jpg"],
    ["ดาร์กช็อกโกแลตอัลมอนด์", "Dark Chocolate Almond", "ダークチョコアーモンド", 59, "assets/catalog/01/008.jpg"],
    ["ฝอยทองวิป", "Foi Thong Whipped", "フォイトーンホイップ", 59, "assets/catalog/01/012.jpg"],
    ["มาร์ชเมลโลว์วิป", "Marshmallow Whipped", "マシュマロホイップ", 59, "assets/catalog/01/007.jpg"],
    ["นูเทลล่ากล้วย", "Nutella Banana", "ヌテラバナナ", 59, "assets/catalog/01/017.jpg"],
    ["นูเทลล่ากล้วยครัมเบิล", "Nutella Banana Crumble", "ヌテラバナナクランブル", 59, "assets/catalog/01/014.jpg"],
    ["นูเทลล่าสตรอว์เบอร์รีครัมเบิล", "Nutella Strawberry Crumble", "ヌテラいちごクランブル", 59, "assets/catalog/01/002.jpg"],
    ["โอรีโอวิป", "Oreo Whipped", "オレオホイップ", 59, "assets/catalog/01/003.jpg"],
    ["สตรอว์เบอร์รีวิปครัมเบิล", "Strawberry Whip Crumble", "いちごホイップクランブル", 59, "assets/catalog/01/011.jpg"],
    ["สตรอว์เบอร์รีวิป", "Strawberry Whipped", "いちごホイップ", 59, "assets/catalog/01/013.jpg"]
  ]),
  category("02", "ชีสเค้กหน้าไหม้", "Burnt Cheesecake", "バスクチーズケーキ", [
    ["มินิบาสก์ชีสเค้ก", "Mini Basque Cheesecake", "ミニバスクチーズケーキ", 50, "assets/catalog/02/001.jpg"],
    ["สตรอว์เบอร์รี", "Strawberry", "ストロベリー", 89, "assets/catalog/02/002.jpg"],
    ["นูเทลล่ากล้วย", "Nutella Banana", "ヌテラバナナ", 89, "assets/catalog/02/003.jpg"],
    ["ออริจินัล", "Original", "オリジナル", 89, "assets/catalog/02/004.jpg"],
    ["โอรีโอวิป", "Oreo Whipped Cream", "オレオホイップ", 89, "assets/catalog/02/005.jpg"],
    ["บลูเบอร์รี", "Blueberry", "ブルーベリー", 89, "assets/catalog/02/006.jpg"]
  ]),
  category("03", "ฟัดจ์เค้ก", "Fudge Cake", "ファッジケーキ", [
    ["ช็อกโกแลตฟัดจ์", "Chocolate Fudge", "チョコレートファッジ", 89, "assets/catalog/03/002.jpg"],
    ["สตรอว์เบอร์รีฟัดจ์", "Strawberry Fudge", "ストロベリーファッジ", 89, "assets/catalog/03/003.jpg"],
    ["บลูเบอร์รีฟัดจ์", "Blueberry Fudge", "ブルーベリーファッジ", 89, "assets/catalog/03/004.jpg"],
    ["โอรีโอฟัดจ์", "Oreo Fudge", "オレオファッジ", 89, "assets/catalog/03/005.jpg"],
    ["มิกซ์เบอร์รีฟัดจ์", "Mixed Berry Fudge", "ミックスベリーファッジ", 89, "assets/catalog/03/006.jpg"]
  ], "3.1 was deleted from the canonical Drive folder and is intentionally not recreated."),
  category("04", "บัตเตอร์ครีมเค้ก", "Buttercream Cake", "バタークリームケーキ", [
    ["สวิสเมอแรงก์บัตเตอร์ครีม", "Swiss Meringue Buttercream", "スイスメレンゲバタークリーム", 89, "assets/catalog/04/001.jpg"],
    ["มะพร้าวบัตเตอร์ครีม", "Coconut Buttercream", "ココナッツバタークリーム", 89, "assets/catalog/04/002.jpg"],
    ["ช็อกโกแลตบัตเตอร์ครีม", "Chocolate Buttercream", "チョコレートバタークリーム", 89, "assets/catalog/04/003.jpg"]
  ]),
  category("05", "โรลเค้ก", "Roll Cake", "ロールケーキ", [
    ["ใบเตย", "Pandan Roll", "パンダンロール", 30, "assets/catalog/05/001.jpg"],
    ["สตรอว์เบอร์รี", "Strawberry Roll", "ストロベリーロール", 30, "assets/catalog/05/002.jpg"],
    ["วานิลลา", "Vanilla Roll", "バニラロール", 30, "assets/catalog/05/003.jpg"],
    ["ช็อกโกแลต", "Chocolate Roll", "チョコレートロール", 30, "assets/catalog/05/004.jpg"],
    ["เรดเวลเวต", "Red Velvet Roll", "レッドベルベットロール", 30, "assets/catalog/05/005.jpg"],
    ["ซอฟต์ช็อกโกแลต", "Soft Chocolate Roll", "ソフトチョコレートロール", 39, "assets/catalog/05/006.jpg"]
  ]),
  category("06", "วาฟเฟิล", "Waffle", "ワッフル", [
    ["กล้วยครัมเบิล", "Banana Crumble", "バナナクランブル", 69, "assets/catalog/06/001.jpg"],
    ["ออริจินัล", "Original", "オリジナル", 69, "assets/catalog/06/002.jpg"],
    ["น้ำผึ้ง", "Honey", "ハニー", 69, "assets/catalog/06/003.jpg"],
    ["สตรอว์เบอร์รี", "Strawberry", "ストロベリー", 69, "assets/catalog/06/004.jpg"],
    ["บลูเบอร์รี", "Blueberry", "ブルーベリー", 69, "assets/catalog/06/005.jpg"],
    ["คาราเมล", "Caramel", "キャラメル", 69, "assets/catalog/06/006.jpg"],
    ["เพลน", "Plain", "プレーン", 69, "assets/catalog/06/007.jpg"],
    ["ผลไม้รวม", "Mixed Fruit", "ミックスフルーツ", 69, "assets/catalog/06/008.jpg"]
  ]),
  category("07", "ชิฟฟอนเค้ก", "Chiffon Cake", "シフォンケーキ", [
    ["วานิลลาชิฟฟอน", "Vanilla Chiffon", "バニラシフォン", 75, "assets/catalog/07/001.jpg"],
    ["ช็อกโกแลตชิฟฟอน", "Chocolate Chiffon", "チョコレートシフォン", 75, "assets/catalog/07/002.jpg"]
  ]),
  category("08", "บานอฟฟี่", "Banoffee", "バノフィー", [
    ["บานอฟฟี่บลูเบอร์รี", "Blueberry Banoffee", "ブルーベリーバノフィー", 120, "assets/catalog/08/003.jpg"],
    ["บานอฟฟี่สตรอว์เบอร์รี", "Strawberry Banoffee", "ストロベリーバノフィー", 120, "assets/catalog/08/004.jpg"]
  ]),
  category("09", "มัฟฟิน & คัพเค้ก", "Muffin & Cupcake", "マフィン＆カップケーキ", [
    ["มัฟฟินคลาสสิก", "Classic Muffin", "プレーンマフィン", 45, "assets/catalog/09/001.jpg"],
    ["มัฟฟินช็อกโกแลตอัลมอนด์", "Chocolate Almond Muffin", "チョコアーモンドマフィン", 55, "assets/catalog/09/002.jpg"],
    ["คัพเค้กมะม่วงครีม", "Mango Cream Cupcake", "マンゴークリームカップケーキ", 55, "assets/catalog/09/003.jpg"],
    ["คัพเค้กเบอร์รีครีม", "Mixed Berry Cream Cupcake", "ベリークリームカップケーキ", 55, "assets/catalog/09/004.jpg"],
    ["คัพเค้กสตรอว์เบอร์รีครีม", "Strawberry Cream Cupcake", "いちごクリームカップケーキ", 55, "assets/catalog/09/005.jpg"],
    ["มัฟฟินอัลมอนด์", "Almond Muffin", "アーモンドマフィン", 55, "assets/catalog/09/008.jpg"]
  ], "9.6 is absent from the canonical Drive folder; the next live item remains 9.7."),
  category("10", "เค้กปอนด์สั่งทำ", "Custom Pound Cake", "カスタムホールケーキ", [
    ["เค้กส้มแมนดาริน", "Mandarin Orange Whole Cake", "みかんホールケーキ", "500–2,200", "assets/catalog/11/018.jpg"],
    ["เค้กวันเกิดธีมวิสกี้", "Whisky Birthday Cake", "ウイスキーバースデーケーキ", "500–2,200", "assets/catalog/11/017.jpg"],
    ["เค้กวันเกิดผลไม้รวม", "Mixed Fruit Birthday Cake", "フルーツバースデーケーキ", "500–2,200", "assets/catalog/11/016.jpg"],
    ["เค้กวันเกิดเบอร์รีธีมเงิน", "Berry Money Birthday Cake", "ベリー＆マネーバースデーケーキ", "500–2,200", "assets/catalog/11/015.jpg"],
    ["เค้กธีมทองและเงิน", "Gold Money Cake", "ゴールド＆マネーケーキ", "500–2,200", "assets/catalog/11/014.jpg"],
    ["เค้กหัวใจสตรอว์เบอร์รี", "Strawberry Heart Cake", "いちごハートケーキ", "500–2,200", "assets/catalog/11/013.jpg"],
    ["เค้กวันเกิดธีมเบียร์", "Beer Birthday Cake", "ビールバースデーケーキ", "500–2,200", "assets/catalog/11/012.jpg"],
    ["เค้กช็อกโกแลตบ็อกซ์สีน้ำเงิน", "Blue Chocolate Box Cake", "ブルーチョコボックスケーキ", "500–2,200", "assets/catalog/11/011.jpg"],
    ["เค้กวันเกิดโอรีโอ", "Oreo Birthday Cake", "オレオバースデーケーキ", "500–2,200", "assets/catalog/11/010.jpg"],
    ["เค้กผลไม้รวม", "Assorted Fruit Whole Cake", "フルーツアソートホールケーキ", "500–2,200", "assets/catalog/11/019.jpg"]
  ], "Custom design range depends on size and complexity."),
  category("11", "ขนมปังคีโต & บัน", "Keto Bread & Bun", "ケトパン＆バン", [
    ["ขนมปังคีโตช็อกโกแลต", "Keto Chocolate Bread", "ケトチョコレートパン", 99, "assets/catalog/12/001.jpg"],
    ["ขนมปังคีโตนม", "Keto Milk Bread", "ケトミルクパン", 99, "assets/catalog/12/005.jpg"],
    ["บันคีโตช็อกโกแลต", "Keto Chocolate Bun", "ケトチョコバン", 99, "assets/catalog/12/006.jpg"],
    ["บันคีโตงา", "Keto Sesame Bun", "ケトごまバン", 99, "assets/catalog/12/007.jpg"],
    ["บันคีโตมัทฉะ", "Keto Matcha Bun", "ケト抹茶バン", 110, "assets/catalog/12/008.jpg"],
    ["บันช็อกโกแลตพร้อมดิป", "Chocolate Bun with Dip", "チョコバン・ディップ", 150, "assets/catalog/12/003.jpg"],
    ["บันนมพร้อมดิป", "Milk Bun with Dip", "ミルクバン・ディップ", 150, "assets/catalog/12/004.jpg"],
    ["บันหวานรูปดอกไม้", "Sweet Flower Bun", "フラワー菓子パン", 150, "assets/catalog/12/002.jpg"]
  ]),
  category("12", "ครัวซองต์ & เดนิช", "Croissant & Danish", "クロワッサン＆デニッシュ", [
    ["ครัวซองต์ออริจินัล 1", "Original Croissant 1", "クロワッサン 1", 45, "assets/catalog/13/005.jpg"],
    ["มินิครัวซองต์และเดนิช", "Mini Croissant & Danish", "ミニクロワッサン・デニッシュ", 45, "assets/catalog/13/004.jpg"],
    ["ครัวซองต์ช็อกโกแลต", "Chocolate Croissant", "チョコクロワッサン", 45, "assets/catalog/13/003.jpg"],
    ["ครัวซองต์ออริจินัล 2", "Original Croissant 2", "クロワッサン 2", 45, "assets/catalog/13/002.jpg"],
    ["ครัวซองต์ออริจินัล 3", "Original Croissant 3", "クロワッサン 3", 45, "assets/catalog/13/001.jpg"]
  ]),
  category("13", "หม่าล่า & ราเม็ง", "Mala & Ramen", "マーラー＆ラーメン", [
    ["MAMA เย็นตาโฟต้มยำ", "Yentafo Tom Yum Noodles", "ママー イェンタフォー・トムヤム", 79, "assets/catalog/14/008.jpg"],
    ["MAMA ต้มยำกุ้ง", "Tom Yum Goong Noodles", "ママー トムヤムクン", 79, "assets/catalog/14/001.jpg"],
    ["MAMA ต้มยำกุ้งน้ำข้น", "Creamy Tom Yum Goong Noodles", "ママー クリーミートムヤムクン", 79, "assets/catalog/14/002.jpg"],
    ["MAMA หมูสับ", "Minced Pork Noodles", "ママー 豚ひき肉", 79, "assets/catalog/14/005.jpg"],
    ["MAMA หมูน้ำตก", "Pork Nam Tok Noodles", "ママー ムーナムトック", 79, "assets/catalog/14/010.jpg"],
    ["MAMA เส้นหมี่น้ำใส", "Clear Rice Noodle Soup", "ママー センミー・クリアスープ", 79, "assets/catalog/14/012.jpg"],
    ["Samyang ฮอตชิคเก้นชีส", "Samyang Hot Chicken Cheese", "サムヤン ホットチキンチーズ", 149, "assets/catalog/14/004.jpg"],
    ["Samyang ชิคเก้นสตูว์", "Samyang Chicken Stew", "サムヤン チキンスチュー", 149, "assets/catalog/14/006.jpg"],
    ["Samyang ชิคเก้นคาโบนารา", "Samyang Chicken Carbonara", "サムヤン チキンカルボナーラ", 149, "assets/catalog/14/011.jpg"],
    ["Samyang Buldak Mala", "Samyang Buldak Mala", "サムヤン ブルダックマーラー", 149, "assets/catalog/14/013.jpg"],
    ["Samyang โรเซ่ราเม็ง", "Samyang Rose Ramen", "サムヤン ロゼラーメン", 149, "assets/catalog/14/007.jpg"],
    ["Nongshim ZHA WANG จาจัง", "Nongshim ZHA WANG Jajang", "ノンシム チャーワン", 149, "assets/catalog/14/009.jpg"],
    ["Nongshim Shin Spicy Kimchi", "Nongshim Shin Spicy Kimchi", "ノンシム 辛キムチ", 149, "assets/catalog/14/003.jpg"]
  ], "Drive contains 13 noodle images. Mala hot pot and builder choices are data-only, so no media is fabricated."),
  category("14", "เครื่องดื่ม", "Drinks", "ドリンク", [
    ["เอสเปรสโซ", "Espresso", "エスプレッソ", 65, "assets/catalog/15/001.jpg"],
    ["อเมริกาโน", "Americano", "アメリカーノ", 65, "assets/catalog/15/002.jpg"],
    ["คาปูชิโน", "Cappuccino", "カプチーノ", 65, "assets/catalog/15/003.jpg"],
    ["ชาไทย", "Thai Tea", "タイティー", 50, "assets/catalog/15/004.jpg"],
    ["ช็อกโกแลตเชค", "Chocolate Shake", "チョコレートシェイク", 50, "assets/catalog/15/005.jpg"],
    ["มิลค์เชค", "Milk Shake", "ミルクシェイク", 50, "assets/catalog/15/006.jpg"],
    ["โอรีโอเชค", "Oreo Shake", "オレオシェイク", 50, "assets/catalog/15/007.jpg"]
  ])
];

const manifest = {
  schemaVersion: 1,
  title: "Candy Baked Factory canonical website sequence",
  sourceSnapshot: "2026-09-07",
  policy: {
    authority: "Google Drive current folder state, reconciled with Product Master and Notion Harness",
    deletionRule: "Do not recreate media deleted from the canonical Drive folders.",
    publishGate: "Branch preview only until owner approval."
  },
  stages: [
    { id: "A1", label: "Header video", media: [{ order: 1, title: "Website header clip (no sound)", driveId: "1hPb4E77atDaGLCnqVtHKIpvxbz3uYZ9O", path: "assets/website/hero.mp4" }] },
    { id: "A2", label: "Second-row figures", media: [
      { order: 1, title: "Figure 1", path: "assets/website/row2-1.png" },
      { order: 2, title: "Figure 2", path: "assets/website/row2-4.png" },
      { order: 3, title: "Figure 3", path: "assets/website/row2-3.png" },
      { order: 4, title: "Figure 4", path: "assets/website/row2-2.png" }
    ] },
    { id: "A3", label: "PhotoStory + Thai/English TextStory", media: [{ order: 1, title: "Story 1 & Text", driveId: "1LV6x1Xg__epdjQBwccq8vddQidtXzQKr", path: "assets/story/baking-story.jpeg" }] },
    { id: "A4", label: "14-category catalog", catalog },
    { id: "A5", label: "PT1–PT18 posters", media: [5,16,3,17,13,7,10,8,11,12,14,15,4,2,18,9,1,6].map((n, i) => ({ order: i + 1, title: `PT${i + 1}`, path: `assets/posters/${String(n).padStart(3, "0")}.png` })) },
    { id: "A6", label: "Story The End", media: [{ order: 1, title: "Story The End", driveId: "1oOrT73mOEn3r50FS_kB77cELm0EXXjg1", path: "assets/story/cream-story.jpeg", note: "Local optimized fallback; canonical Drive master remains authoritative." }] }
  ],
  menuBuilder: {
    hotPot: [{ size: "S", price: 399 }, { size: "M", price: 499 }, { size: "L", price: 599 }],
    noodleSets: [79, 99, 149, 199],
    toppings: { standard: 10, cheese: 15, count: 29 }
  }
};

writeFileSync(new URL("../wf-sequence.manifest.json", import.meta.url), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${manifest.stages.length} stages, ${catalog.length} categories, ${catalog.reduce((sum, group) => sum + group.items.length, 0)} media items.`);
