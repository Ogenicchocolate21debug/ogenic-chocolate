(()=>{
  const LINE_ORDER_URL='https://line.me/R/oaMessage/%40014refkl/?';
  const STORAGE_KEY='candy-catalog-cart-v2';
  const money=value=>`${Number(value).toLocaleString('th-TH')} บาท`;
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;',"'":'&#039;'}[char]));
  const products=new Map([...document.querySelectorAll('.card[data-product-id]')].map(card=>[
    card.dataset.productId,
    {id:card.dataset.productId,name:card.dataset.productName,price:Number(card.dataset.productPrice),image:card.dataset.productImage}
  ]).filter(([,product])=>Number.isFinite(product.price)));
  let cart={};
  try{cart=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{cart={}}

  const style=document.createElement('style');
  style.textContent=`
    .cart-button{position:fixed;z-index:80;right:max(14px,env(safe-area-inset-right));bottom:max(18px,calc(env(safe-area-inset-bottom) + 10px));display:flex;align-items:center;gap:8px;padding:12px 15px;border:0;border-radius:999px;background:#332c26;color:#fff;box-shadow:0 14px 38px rgba(51,44,38,.28);font:800 11px "Noto Sans Thai","DM Sans",sans-serif;cursor:pointer}.cart-count{display:grid;place-items:center;min-width:23px;height:23px;padding:0 6px;border-radius:999px;background:#fff;color:#332c26;font-size:10px}
    .cart-backdrop{display:none;position:fixed;z-index:90;inset:0;background:rgba(26,20,16,.52);backdrop-filter:blur(6px)}.cart-backdrop.open{display:block}.cart-panel{position:absolute;right:0;top:0;height:100%;width:min(92vw,430px);display:flex;flex-direction:column;background:#fbfaf7;box-shadow:-24px 0 60px rgba(0,0,0,.2)}.cart-head{display:flex;justify-content:space-between;align-items:center;padding:18px;border-bottom:1px solid var(--line)}.cart-head h3{margin:0;font:24px "Playfair Display","Noto Sans Thai",serif}.cart-close,.cart-qty,.cart-checkout{border:0;cursor:pointer;font:inherit}.cart-close{width:40px;height:40px;border-radius:50%;background:#eee7dd;color:#332c26;font-size:20px}.cart-items{flex:1;overflow:auto;padding:8px 18px}.cart-empty{padding:44px 10px;text-align:center;color:var(--muted);font-size:12px}.cart-item{display:grid;grid-template-columns:52px 1fr auto;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}.cart-item img{width:52px;height:52px;border-radius:10px;object-fit:cover;background:#eee7dd}.cart-item b{display:block;font-size:11px}.cart-item small{color:var(--muted);font-size:9px}.cart-controls{display:flex;gap:5px;align-items:center;margin-top:6px}.cart-qty{width:26px;height:26px;border-radius:8px;background:#eee7dd}.cart-foot{padding:16px 18px max(18px,env(safe-area-inset-bottom));border-top:1px solid var(--line);background:#fff}.cart-total-line{display:flex;justify-content:space-between;align-items:center;padding:8px 0 12px;font-size:12px}.cart-total{font-size:18px}.cart-checkout{width:100%;min-height:48px;border-radius:14px;background:#332c26;color:#fff;font-size:12px;font-weight:800}.cart-checkout:disabled{opacity:.45;cursor:not-allowed}.cart-note{margin:8px 0 0;color:var(--muted);font-size:9px;line-height:1.5;text-align:center}
    @media(max-width:640px){.cart-button{bottom:max(72px,calc(env(safe-area-inset-bottom) + 62px))}}
  `;
  document.head.appendChild(style);

  const button=document.createElement('button');
  button.className='cart-button';
  button.type='button';
  button.innerHTML='🛒 ตะกร้า <span class="cart-count">0</span>';
  document.body.appendChild(button);

  const backdrop=document.createElement('div');
  backdrop.className='cart-backdrop';
  backdrop.innerHTML='<aside class="cart-panel"><div class="cart-head"><h3>ตะกร้าสินค้า</h3><button class="cart-close" type="button" aria-label="ปิด">×</button></div><div class="cart-items"></div><div class="cart-foot"><div class="cart-total-line"><span>รวมทั้งหมด</span><strong class="cart-total">0 บาท</strong></div><button class="cart-checkout" type="button">ส่งรายการและยอดรวมเข้า LINE</button><p class="cart-note">LINE จะเปิดข้อความออเดอร์ที่กรอกไว้ให้ ตรวจสอบแล้วกดส่งได้ทันที</p></div></aside>';
  document.body.appendChild(backdrop);

  const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(cart));
  const selected=()=>Object.entries(cart).map(([id,qty])=>({product:products.get(id),qty:Number(qty)||0})).filter(item=>item.product&&item.qty>0);
  const close=()=>backdrop.classList.remove('open');
  button.addEventListener('click',()=>backdrop.classList.add('open'));
  backdrop.querySelector('.cart-close').addEventListener('click',close);
  backdrop.addEventListener('click',event=>{if(event.target===backdrop)close()});

  function render(){
    const items=selected();
    const count=items.reduce((sum,item)=>sum+item.qty,0);
    const total=items.reduce((sum,item)=>sum+item.product.price*item.qty,0);
    button.querySelector('.cart-count').textContent=String(count);
    backdrop.querySelector('.cart-total').textContent=money(total);
    backdrop.querySelector('.cart-checkout').disabled=!items.length;
    const box=backdrop.querySelector('.cart-items');
    if(!items.length){box.innerHTML='<div class="cart-empty">ยังไม่มีสินค้าในตะกร้า</div>';return}
    box.innerHTML=items.map(({product,qty})=>`<div class="cart-item" data-id="${esc(product.id)}"><img src="${esc(product.image||'assets/brand/candy-baked-logo.jpeg')}" alt=""><div><b>${esc(product.name)}</b><small>${money(product.price)} × ${qty}</small><div class="cart-controls"><button class="cart-qty" type="button" data-op="minus">−</button><span>${qty}</span><button class="cart-qty" type="button" data-op="plus">+</button></div></div><strong>${money(product.price*qty)}</strong></div>`).join('');
    box.querySelectorAll('.cart-qty').forEach(control=>control.addEventListener('click',()=>{
      const id=control.closest('.cart-item').dataset.id;
      cart[id]=Math.max(0,(Number(cart[id])||0)+(control.dataset.op==='plus'?1:-1));
      if(!cart[id])delete cart[id];
      save();render();
    }));
  }

  document.querySelectorAll('.add-cart').forEach(control=>control.addEventListener('click',()=>{
    const id=control.closest('.card').dataset.productId;
    cart[id]=(Number(cart[id])||0)+1;
    save();render();
    const old=control.textContent;
    control.textContent='✓ เพิ่มแล้ว';
    setTimeout(()=>{control.textContent=old},700);
  }));

  backdrop.querySelector('.cart-checkout').addEventListener('click',()=>{
    const items=selected();
    if(!items.length)return;
    const total=items.reduce((sum,item)=>sum+item.product.price*item.qty,0);
    const message=[
      'CANDY BAKED FACTORY — ORDER',
      ...items.map(({product,qty})=>`• ${product.name} × ${qty} = ${money(product.price*qty)}`),
      `รวมทั้งหมด ${money(total)}`,
      'กรุณายืนยันคิวและค่าจัดส่งกับร้านอีกครั้ง'
    ].join('\n');
    window.location.href=LINE_ORDER_URL+encodeURIComponent(message);
  });

  render();
})();
