(()=>{
  'use strict';

  const LINE_URL='https://page.line.me/014refkl';
  const STORAGE_KEY='candy-cart-v2';
  const LEGACY_STORAGE_KEYS=['candy-cart-v1'];
  const PRODUCT_URL='/bakery-products.json';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;',"'":'&#039;'}[c]));
  const toPrice=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?n:null};
  const money=v=>`${Number(v||0).toLocaleString('th-TH')} บาท`;

  const safeRead=(key)=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):{}}catch{return {}}};
  const safeWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
  const safeRemove=key=>{try{localStorage.removeItem(key)}catch{}};

  let cart=safeRead(STORAGE_KEY);
  let products=[];
  let byId=new Map();

  function normalizeProduct(raw){
    if(!raw||typeof raw!=='object'||raw.mergeInto)return null;
    const id=String(raw.id??'').trim();
    if(!id)return null;
    return {...raw,id,price:toPrice(raw.price)};
  }

  function normalizeCatalog(rows){
    const map=new Map();
    const duplicateIds=[];
    const missingPrice=[];
    for(const raw of Array.isArray(rows)?rows:[]){
      const p=normalizeProduct(raw);
      if(!p)continue;
      if(map.has(p.id)){duplicateIds.push(p.id);continue}
      if(p.price===null)missingPrice.push(p.id);
      map.set(p.id,p);
    }
    if(duplicateIds.length)console.warn('Candy catalog duplicate IDs ignored:',duplicateIds);
    if(missingPrice.length)console.warn('Candy catalog products awaiting valid price:',missingPrice);
    return [...map.values()];
  }

  function cleanCart(){
    const next={};
    if(cart&&typeof cart==='object'){
      for(const [id,value] of Object.entries(cart)){
        const qty=Math.floor(Number(value));
        const p=byId.get(String(id));
        if(p&&p.price!==null&&Number.isFinite(qty)&&qty>0)next[String(id)]=qty;
      }
    }
    cart=next;
    safeWrite(STORAGE_KEY,cart);
    for(const key of LEGACY_STORAGE_KEYS)safeRemove(key);
  }

  const css=`
  .candy-shop{max-width:1200px;margin:0 auto 52px;padding:32px 16px 8px;border-top:1px solid var(--line)}
  .candy-shop-head{display:flex;justify-content:space-between;gap:16px;align-items:end;margin-bottom:16px}
  .candy-shop-head h2{margin:4px 0 0;font:clamp(28px,4vw,42px)/1.1 "Playfair Display","Noto Sans Thai",serif}
  .candy-shop-head p{margin:0;color:var(--muted);font-size:11px}.candy-shop-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
  .shop-card{overflow:hidden;border:1px solid var(--line);border-radius:18px;background:var(--paper);box-shadow:0 10px 26px rgba(70,49,31,.05)}
  .shop-card img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;background:#eee7dd}.shop-body{padding:12px}.shop-th{margin:0;font-size:14px;line-height:1.4}.shop-en,.shop-ja{margin:3px 0 0;color:var(--muted);font-size:10px;line-height:1.4}.shop-price-row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px}.shop-price{font-size:15px;font-weight:800;color:var(--coffee)}
  .shop-add,.cart-checkout,.cart-close,.cart-qty,.cart-button{border:0;cursor:pointer;font:inherit}.shop-add{padding:8px 10px;border-radius:999px;background:var(--ink);color:#fff;font-size:10px;font-weight:700}.shop-add[disabled]{opacity:.45;cursor:not-allowed}
  .cart-button{position:fixed;z-index:80;right:max(14px,env(safe-area-inset-right));bottom:max(18px,calc(env(safe-area-inset-bottom) + 10px));display:flex;align-items:center;gap:8px;padding:12px 15px;border-radius:999px;background:#332c26;color:#fff;box-shadow:0 14px 38px rgba(51,44,38,.28);font-size:11px;font-weight:800}.cart-count{display:grid;place-items:center;min-width:23px;height:23px;padding:0 6px;border-radius:999px;background:#fff;color:#332c26;font-size:10px}
  .cart-backdrop{display:none;position:fixed;z-index:90;inset:0;background:rgba(26,20,16,.52);backdrop-filter:blur(6px)}.cart-backdrop.open{display:block}.cart-panel{position:absolute;right:0;top:0;height:100%;width:min(92vw,430px);display:flex;flex-direction:column;background:#fbfaf7;box-shadow:-24px 0 60px rgba(0,0,0,.2)}.cart-head{display:flex;justify-content:space-between;align-items:center;padding:18px;border-bottom:1px solid var(--line)}.cart-head h3{margin:0;font:24px "Playfair Display","Noto Sans Thai",serif}.cart-close{width:40px;height:40px;border-radius:50%;background:#eee7dd;color:#332c26;font-size:20px}.cart-items{flex:1;overflow:auto;padding:8px 18px}.cart-empty{padding:44px 10px;text-align:center;color:var(--muted);font-size:12px}.cart-item{display:grid;grid-template-columns:58px 1fr auto;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}.cart-item img{width:58px;height:58px;border-radius:12px;object-fit:cover}.cart-item b{display:block;font-size:11px}.cart-item small{color:var(--muted);font-size:9px}.cart-controls{display:flex;gap:5px;align-items:center;margin-top:6px}.cart-qty{width:26px;height:26px;border-radius:8px;background:#eee7dd}.cart-total-line{display:flex;justify-content:space-between;gap:12px;padding:8px 0;font-size:12px}.cart-total-line strong{font-size:18px}.cart-foot{padding:16px 18px max(18px,env(safe-area-inset-bottom));border-top:1px solid var(--line);background:#fff}.cart-checkout{width:100%;min-height:48px;border-radius:14px;background:#332c26;color:#fff;font-size:12px;font-weight:800}.cart-note{margin:8px 0 0;color:var(--muted);font-size:9px;line-height:1.5;text-align:center}
  @media(max-width:900px){.candy-shop-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:640px){.candy-shop-grid{grid-template-columns:repeat(2,1fr);gap:8px}.candy-shop{padding-inline:10px}.candy-shop-head{align-items:start;flex-direction:column}.shop-body{padding:10px}.shop-th{font-size:12px}.shop-price{font-size:13px}.cart-button{bottom:max(72px,calc(env(safe-area-inset-bottom) + 62px))}}
  `;
  const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);

  const cartBtn=document.createElement('button');
  cartBtn.className='cart-button';
  cartBtn.innerHTML='🛒 ตะกร้า <span class="cart-count">0</span>';
  document.body.appendChild(cartBtn);

  const backdrop=document.createElement('div');
  backdrop.className='cart-backdrop';
  backdrop.innerHTML='<aside class="cart-panel"><div class="cart-head"><h3>ตะกร้าสินค้า</h3><button class="cart-close" aria-label="ปิด">×</button></div><div class="cart-items"></div><div class="cart-foot"><div class="cart-total-line"><span>รวม</span><strong class="cart-total">0 บาท</strong></div><button class="cart-checkout">คัดลอกออเดอร์ + เปิด LINE OA</button><p class="cart-note">ระบบจะคัดลอกรายการสั่งซื้อให้ แล้วเปิด LINE OA เพื่อยืนยันคิวและการจัดส่ง</p></div></aside>';
  document.body.appendChild(backdrop);

  const close=()=>backdrop.classList.remove('open');
  cartBtn.onclick=()=>backdrop.classList.add('open');
  backdrop.querySelector('.cart-close').onclick=close;
  backdrop.addEventListener('click',e=>{if(e.target===backdrop)close()});

  function saveAndRender(){safeWrite(STORAGE_KEY,cart);renderCart()}

  function renderCart(){
    const items=Object.entries(cart).map(([id,qty])=>({p:byId.get(id),qty:Number(qty)||0})).filter(x=>x.p&&x.p.price!==null&&x.qty>0);
    const count=items.reduce((s,x)=>s+x.qty,0);
    const total=items.reduce((s,x)=>s+x.p.price*x.qty,0);
    cartBtn.querySelector('.cart-count').textContent=String(count);
    backdrop.querySelector('.cart-total').textContent=money(total);
    const box=backdrop.querySelector('.cart-items');
    if(!items.length){box.innerHTML='<div class="cart-empty">ยังไม่มีสินค้าในตะกร้า 🥐</div>';return}
    box.innerHTML=items.map(({p,qty})=>`<div class="cart-item" data-id="${esc(p.id)}"><img src="${esc(p.image||'assets/brand/candy-baked-logo.jpeg')}" alt=""><div><b>${esc(p.nameTh||p.name||'Candy Baked')}</b><small>${money(p.price)} × ${qty}</small><div class="cart-controls"><button class="cart-qty" data-op="minus">−</button><span>${qty}</span><button class="cart-qty" data-op="plus">+</button></div></div><strong>${money(p.price*qty)}</strong></div>`).join('');
    box.querySelectorAll('.cart-qty').forEach(btn=>btn.onclick=()=>{const id=btn.closest('.cart-item').dataset.id;cart[id]=Math.max(0,(Number(cart[id])||0)+(btn.dataset.op==='plus'?1:-1));if(!cart[id])delete cart[id];saveAndRender()});
  }

  backdrop.querySelector('.cart-checkout').onclick=async()=>{
    const items=Object.entries(cart).map(([id,qty])=>({p:byId.get(id),qty:Number(qty)||0})).filter(x=>x.p&&x.p.price!==null&&x.qty>0);
    if(!items.length)return;
    const total=items.reduce((s,x)=>s+x.p.price*x.qty,0);
    const text=['CANDY BAKED FACTORY — ORDER',...items.map(({p,qty})=>`• ${p.nameTh||p.name} x${qty} = ${money(p.price*qty)}`),`รวม ${money(total)}`,'กรุณายืนยันคิว/ค่าส่งกับร้านอีกครั้ง'];
    try{await navigator.clipboard.writeText(text.join('\n'))}catch{}
    window.open(LINE_URL,'_blank','noopener');
  };

  async function init(){
    try{
      const res=await fetch(PRODUCT_URL,{cache:'no-store'});
      if(!res.ok)throw new Error(`catalog HTTP ${res.status}`);
      products=normalizeCatalog(await res.json());
      byId=new Map(products.map(p=>[p.id,p]));
      cleanCart();

      const anchor=document.querySelector('.menu-head');
      if(!anchor){renderCart();return}
      const section=document.createElement('section');
      section.className='candy-shop';section.id='shop';
      section.innerHTML='<div class="candy-shop-head"><div><p class="kicker">SHOP · VERIFIED PRICE</p><h2>ราคา & ตะกร้าสินค้า</h2></div><p>แสดงเฉพาะรายการที่มีราคาตัวเลขถูกต้องในชุดข้อมูลปัจจุบัน</p></div><div class="candy-shop-grid"></div>';
      anchor.before(section);
      const visible=products.filter(p=>p.price!==null).slice(0,48);
      const grid=section.querySelector('.candy-shop-grid');
      grid.innerHTML=visible.map(p=>`<article class="shop-card"><img loading="lazy" src="${esc(p.image||'assets/brand/candy-baked-logo.jpeg')}" alt="${esc(p.nameTh||p.name||'Candy Baked')}"><div class="shop-body"><h3 class="shop-th">${esc(p.nameTh||p.name||'Candy Baked')}</h3>${p.nameEn?`<p class="shop-en">${esc(p.nameEn)}</p>`:''}${p.nameJa||p.thai?`<p class="shop-ja">${esc(p.nameJa||p.thai)}</p>`:''}<div class="shop-price-row"><span class="shop-price">${money(p.price)}</span><button class="shop-add" data-id="${esc(p.id)}">+ ตะกร้า</button></div></div></article>`).join('');
      grid.querySelectorAll('.shop-add').forEach(btn=>btn.onclick=()=>{const id=btn.dataset.id;if(!byId.has(id)||byId.get(id).price===null)return;cart[id]=(Number(cart[id])||0)+1;saveAndRender();btn.textContent='✓ เพิ่มแล้ว';setTimeout(()=>btn.textContent='+ ตะกร้า',700)});
      renderCart();
    }catch(e){console.warn('Candy shop enhancement unavailable',e);cleanCart();renderCart()}
  }

  init();
})();