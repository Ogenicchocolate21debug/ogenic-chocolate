const REPO_IMG = "https://raw.githubusercontent.com/Ogenicchocolate21debug/ogenic-chocolate/design/ogenic-dark-luxury-v1/assets/bakery";
const WORKER = "https://sweet-block-940d.tawatchaisamornrum11.workers.dev";
const BAKERY = [
["CBK-SHP-001","Original Shio Pan","ชิโอะปังแป้งออริจินัล","Original","ชิโอะปังแบบเปล่า เนื้อนุ่ม หอมเนย","01-shio-pan.jpg",49],
["CBK-SHP-016","Chocolate Dough Shio Pan","ชิโอะปังแป้งช็อกโกแลต","Original","แป้งผสมช็อกโกแลต หอมโกโก้และเนย","16-chocolate-dough-shio-pan.jpeg",59],
["CBK-SHP-002","Oreo Whipped Cream","ชิโอะปังวิปครีมโอรีโอ","Whipped Cream","วิปครีมและคุกกี้โอรีโอ ครีมมี่และกรุบกรอบ","02-oreo-whipped-cream.jpg",89],
["CBK-SHP-003","Strawberry Whipped Cream","ชิโอะปังวิปครีมสตรอว์เบอร์รี","Fruit & Cream","หวานอมเปรี้ยวและสดชื่น","03-strawberry-whipped-cream.jpg",89],
["CBK-SHP-004","Nutella Strawberry Crumble","ชิโอะปังนูเทลล่าสตรอว์เบอร์รีครัมเบิล","Nutella","นูเทลล่า สตรอว์เบอร์รี และครัมเบิล","04-nutella-strawberry-crumble.jpg",89],
["CBK-SHP-005","Banoffee","ชิโอะปังบานอฟฟี่","Banana","กล้วย วิปครีม และซอสคาราเมล","05-banoffee.jpg",89],
["CBK-SHP-006","Caramel Banana Crumble","ชิโอะปังคาราเมลกล้วยครัมเบิล","Banana","กล้วยคาราเมล โรยครัมเบิล","06-caramel-banana-crumble.jpg",89],
["CBK-SHP-007","Nutella Banana Crumble","ชิโอะปังนูเทลล่ากล้วยครัมเบิล","Nutella","นูเทลล่า กล้วย และครัมเบิล","07-nutella-banana-crumble.jpg",89],
["CBK-SHP-008","Strawberry Whip Crumble","ชิโอะปังวิปสตรอว์เบอร์รีครัมเบิล","Fruit & Cream","วิปครีม สตรอว์เบอร์รี และครัมเบิล","08-strawberry-whip-crumble.jpg",89],
["CBK-SHP-009","Brownie Whipped Cream","ชิโอะปังวิปครีมบราวนี่","Chocolate","วิปครีมพร้อมชิ้นบราวนี่","09-brownie-whipped-cream.jpg",89],
["CBK-SHP-010","Marshmallow Whipped Cream","ชิโอะปังวิปครีมมาร์ชแมลโลว์","Whipped Cream","วิปครีมและมาร์ชแมลโลว์ นุ่มฟู","10-marshmallow-whipped-cream.jpg",89],
["CBK-SHP-011","Foi Thong Whipped Cream","ชิโอะปังวิปครีมฝอยทอง","Thai Dessert","เบเกอรี่ผสานขนมไทย","11-foi-thong-whipped-cream.jpg",89],
["CBK-SHP-012","Nutella Banana","ชิโอะปังนูเทลล่ากล้วย","Nutella","คู่รสคลาสสิก นูเทลล่าและกล้วย","12-nutella-banana.jpg",89],
["CBK-SHP-013","Blueberry Whipped Cream","ชิโอะปังวิปครีมบลูเบอร์รี","Fruit & Cream","หอมผลไม้และหวานอมเปรี้ยว","13-blueberry-whipped-cream.jpg",89],
["CBK-SHP-014","Dark Chocolate","ชิโอะปังดาร์กช็อกโกแลต","Chocolate","เคลือบดาร์กช็อกโกแลตรสเข้ม","14-dark-chocolate.jpg",89],
["CBK-SHP-015","Dark Chocolate Almond","ชิโอะปังดาร์กช็อกโกแลตอัลมอนด์","Chocolate","ดาร์กช็อกโกแลตและอัลมอนด์กรุบกรอบ","15-dark-chocolate-almond.jpg",89]
].map(([code,en,th,category,desc,file,price])=>({code,en,th,category,desc,file,price,image:`${REPO_IMG}/${file}`}));

const CHOCOLATE = [
["PRD-0001","House Blend 80%","80%","House Blend — 2 Provinces","Low Acidity",["Almond","Malt","Coconut","Vanilla"],"01-house-blend-80.webp"],
["PRD-0002","Prachuap 80%","80%","Prachuap Khiri Khan","Fruity",["Black Raisin","Raisin","Sour Fruits"],"02-prachuap-80.webp"],
["PRD-0003","Chumphon 80%","80%","Chumphon","Balanced",["Almond","Mixed Nuts","Floral"],"03-chumphon-80.webp"],
["PRD-0004","Phuket 80%","80%","Phuket","Balanced",["Nutty","Peach","Lychee","Citrus"],"04-phuket-80.webp"],
["PRD-0005","Surat 80%","80%","Surat Thani","Balanced",["Peanut","Biscuit","Honey","Lemon"],"05-surat-80.webp"],
["PRD-0006","Chiang Mai 80%","80%","Chiang Mai","Slightly Sour",["Almond","Mixed Nuts","Macadamia"],"06-chiang-mai-80.webp"],
["PRD-0007","Chiang Rai 90%","90%","Chiang Rai","Fruity",["Banana","Black Raisin"],"07-chiang-rai-90.webp"],
["PRD-0008","Doi Chang 80%","80%","Doi Chang, Chiang Rai","Balanced",["Lychee","Matcha"],"08-doi-chang-80.webp"],
["PRD-0009","Milk Profile 80%","80%","Origin Pending","Creamy Nutty",["Creamy Nutty","Fresh Milk"],"09-milk-profile-80.webp"],
["PRD-0010","Rayong 80%","80%","Rayong","Fruity",["Black Raisin","Gooseberry"],"10-rayong-80.webp"],
["PRD-0011","Tak 80%","80%","Tak","Balanced",["Citrus","Mixed Nuts","Macadamia"],"11-tak-80.webp"],
["PRD-0012","Seasonal Origin 90%","90%","Seasonal Origin","Balanced",["Seasonal Fruits","Seasonal Nuts"],"12-seasonal-origin-90.webp"],
["PRD-0013","Limited Edition 80%","80%","Chiang Mai × Prachuap","Balanced",["Black Raisin","Almond","Macadamia"],"13-limited-edition-80.webp"],
["PRD-0014","Limited Edition 100%","100%","Prachuap × Surat × Doi Chang","Bold",["Raisin","Nuts","Honey","Lychee","Matcha"],"14-limited-edition-100.webp"]
].map(([code,name,level,origin,profile,notes,file])=>({code,name,level,origin,profile,notes,file,image:`${WORKER}/assets/chocolate/${file}`}));

const state = {
 page: document.body.dataset.page || "bakery",
 bakeryFilter:"ทั้งหมด",
 chocolateFilter:"ทั้งหมด",
 cart: JSON.parse(localStorage.getItem("ogenic-preview-cart") || "[]")
};

function rootHref(){ return location.pathname.includes("/chocolate/") ? "../" : "./"; }
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function header(){
 const h=document.querySelector("#site-header"); if(!h)return; const root=rootHref();
 h.innerHTML=`<div class="preview-banner">PREVIEW BRANCH · แก้เฉพาะการโหลดรูป · ยังไม่แตะ Production</div>
 <div class="site-header"><div class="shell header-inner">
  <a class="brand-pair" href="${root}">
   <img src="${WORKER}/assets/brand/candy-baked-logo.webp" alt="Candy Baked" onerror="this.style.display='none'">
   <span class="brand-cross">×</span>
   <img src="${WORKER}/assets/brand/ogenic-logo.webp" alt="OGENIC" onerror="this.style.display='none'">
  </a>
  <nav class="switcher">
   <a href="${root}" class="${state.page==="bakery"?"active":""}">Candy Baked</a>
   <a href="${root}chocolate/" class="${state.page==="chocolate"?"active":""}">Chocolate</a>
  </nav>
  <button class="cart-button" id="cartButton" aria-label="เปิดตะกร้า">🛒<span class="cart-count" id="cartCount">0</span></button>
 </div></div>`;
 document.querySelector("#cartButton").onclick=()=>toggleCart(true); updateCart();
}
function imageFallback(img,label,level=""){
 const wrap=img.parentElement; img.remove();
 wrap.innerHTML=`<div class="placeholder"><div><strong>${esc(level||"OG")}</strong><span>${esc(label)}</span></div></div>`;
}
function bakeryCard(p){
 return `<article class="card"><div class="card-image"><img loading="lazy" src="${p.image}" alt="${esc(p.th)}" onerror="imageFallback(this,'${esc(p.en)}')"><span class="card-tag">${esc(p.category)}</span></div><div class="card-body"><span class="card-code">${p.code}</span><h3>${esc(p.th)}</h3><span class="en">${esc(p.en)}</span><p>${esc(p.desc)}</p><div class="card-foot"><span class="price">฿${p.price}</span><button class="add" data-code="${p.code}">เพิ่มลงตะกร้า</button></div></div></article>`;
}
function chocolateCard(p){
 return `<article class="card choco-card"><div class="card-image"><img loading="lazy" src="${p.image}" alt="${esc(p.name)}" onerror="imageFallback(this,'${esc(p.origin)}','${p.level}')"><span class="card-tag">${p.level}</span></div><div class="card-body"><span class="card-code">${p.code}</span><h3>${esc(p.name)}</h3><span class="en">${esc(p.origin)} · ${esc(p.profile)}</span><p>${p.notes.map(esc).join(" · ")}</p><div class="card-foot"><span class="price">${p.level}</span><button class="add" data-code="${p.code}">เพิ่มลงตะกร้า</button></div></div></article>`;
}
function renderBakery(){
 const cats=["ทั้งหมด",...new Set(BAKERY.map(x=>x.category))];
 const list=state.bakeryFilter==="ทั้งหมด"?BAKERY:BAKERY.filter(x=>x.category===state.bakeryFilter);
 document.querySelector("#filters").innerHTML=cats.map(c=>`<button class="filter ${c===state.bakeryFilter?"active":""}" data-filter="${esc(c)}">${esc(c)}</button>`).join("");
 document.querySelector("#catalog").innerHTML=list.map(bakeryCard).join("");
 document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.bakeryFilter=b.dataset.filter;renderBakery()}); wireAdds();
}
function renderChocolate(){
 const levels=["ทั้งหมด","80%","90%","100%"]; const list=state.chocolateFilter==="ทั้งหมด"?CHOCOLATE:CHOCOLATE.filter(x=>x.level===state.chocolateFilter);
 document.querySelector("#filters").innerHTML=levels.map(c=>`<button class="filter ${c===state.chocolateFilter?"active":""}" data-filter="${c}">${c}</button>`).join("");
 document.querySelector("#catalog").innerHTML=list.map(chocolateCard).join("");
 document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.chocolateFilter=b.dataset.filter;renderChocolate()}); wireAdds();
}
function wireAdds(){
 document.querySelectorAll(".add").forEach(b=>b.onclick=()=>{const code=b.dataset.code;const item=[...BAKERY,...CHOCOLATE].find(x=>x.code===code);const found=state.cart.find(x=>x.code===code);if(found)found.qty++;else state.cart.push({code,qty:1,name:item.th||item.name,image:item.image,price:item.price||0});saveCart();b.textContent="เพิ่มแล้ว ✓";setTimeout(()=>b.textContent="เพิ่มลงตะกร้า",700);});
}
function saveCart(){localStorage.setItem("ogenic-preview-cart",JSON.stringify(state.cart));updateCart();renderCart()}
function updateCart(){const n=state.cart.reduce((a,b)=>a+b.qty,0);const el=document.querySelector("#cartCount");if(el)el.textContent=n}
function renderCart(){const box=document.querySelector("#cartItems");if(!box)return;if(!state.cart.length){box.innerHTML=`<div class="cart-empty">ยังไม่มีสินค้าในตะกร้า</div>`;return}box.innerHTML=state.cart.map(x=>`<div class="cart-line"><img src="${x.image}" alt=""><div><strong>${esc(x.name)}</strong><span>จำนวน ${x.qty}</span><br><button class="filter" data-remove="${x.code}">ลบ</button></div></div>`).join("");box.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{state.cart=state.cart.filter(x=>x.code!==b.dataset.remove);saveCart()})}
function toggleCart(open){const el=document.querySelector("#drawer");el.classList.toggle("open",open);document.body.style.overflow=open?"hidden":""}
function drawer(){document.body.insertAdjacentHTML("beforeend",`<div class="drawer-backdrop" id="drawer"><aside class="drawer"><div class="drawer-head"><div><span class="eyebrow">Cart</span><h2>ตะกร้าสินค้า</h2></div><button class="drawer-close" id="closeCart">×</button></div><div id="cartItems"></div><a class="btn btn-primary" style="width:100%;margin-top:20px" href="https://lin.ee/Txmdy_nbd" target="_blank">สั่งซื้อผ่าน LINE OA</a></aside></div>`);document.querySelector("#closeCart").onclick=()=>toggleCart(false);document.querySelector("#drawer").onclick=e=>{if(e.target.id==="drawer")toggleCart(false)};renderCart()}
window.imageFallback=imageFallback;
document.addEventListener("DOMContentLoaded",()=>{header();drawer();if(state.page==="bakery")renderBakery();else renderChocolate();});