(()=>{
  const OGENIC='https://ogenic-phase-vi-staging.tawatchaisamornrum11.workers.dev';
  const css=`
  .preview-shell{margin-bottom:16px;border:1px solid var(--line);border-radius:28px;overflow:hidden;background:#0f0c12;box-shadow:var(--shadow)}
  .preview-head{display:flex;justify-content:space-between;gap:14px;align-items:center;padding:16px 18px;border-bottom:1px solid var(--line)}.preview-head h2{margin:0;font:14px "DM Sans";font-weight:700}.preview-head p{margin:3px 0 0;color:var(--muted);font-size:9px}.preview-actions{display:flex;gap:8px;flex-wrap:wrap}.preview-frame{width:100%;height:min(76vh,780px);border:0;background:#fbfaf7;display:block}
  .section-title{display:flex;justify-content:space-between;gap:14px;align-items:end;margin:24px 0 12px}.section-title p{margin:0;color:var(--gold);font:9px "DM Sans";letter-spacing:.16em}.section-title h2{margin:4px 0 0;font:clamp(24px,4vw,36px)/1.1 "Playfair Display","Noto Sans Thai",serif}.section-title small{color:var(--muted);font-size:9px}.system-panel{margin-top:14px;padding:22px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(135deg,rgba(95,31,83,.19),rgba(255,255,255,.02));display:flex;justify-content:space-between;gap:18px;align-items:center}.system-panel h3{margin:0 0 5px;font:19px "DM Sans";font-weight:700}.system-panel p{margin:0;color:var(--muted);font-size:10px;line-height:1.6}.nav a.external:after{content:'↗';margin-left:auto;color:var(--gold);font-size:9px}
  @media(max-width:760px){.preview-head,.system-panel{align-items:stretch;flex-direction:column}.preview-frame{height:620px}.preview-actions .btn{width:100%}.section-title{align-items:start;flex-direction:column}}
  `; const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  function navMarkup(withDots=true){const i=withDots?'<i></i>':'';return `
    <a class="active" href="#storefront-live">${i}Storefront</a>
    <a href="#candy-dashboard">${i}Dashboard Candy</a>
    <a class="external" href="${OGENIC}" target="_blank" rel="noopener">${i}Dashboard ระบบกู</a>
    <a href="#overview">${i}Overview</a>
    <a href="#codex">${i}Codex Dispatch</a>
    <a href="#integrations">${i}Integrations</a>
    <a href="#publishing">${i}Publishing</a>
    <a href="#deploy">${i}Deploy & CI</a>`}
  const side=document.querySelector('.sidebar .nav');if(side)side.innerHTML=navMarkup(true);
  const drawerNav=document.querySelector('.drawer .nav');if(drawerNav)drawerNav.innerHTML=navMarkup(false);
  const content=document.querySelector('.content');const hero=content?.querySelector('.hero');if(!content||!hero)return;
  const oldOverview=content.id==='overview'; if(oldOverview)content.removeAttribute('id'); hero.id='overview';
  const preview=document.createElement('section');preview.className='preview-shell';preview.id='storefront-live';preview.innerHTML=`<div class="preview-head"><div><h2>Storefront · Live Preview</h2><p>หน้าแรกที่เจ้าของเห็นก่อนเข้าระบบควบคุม</p></div><div class="preview-actions"><a class="btn primary" href="/" target="_blank" rel="noopener">เปิดหน้าร้าน ↗</a><a class="btn ghost" href="#candy-dashboard">ไป Dashboard Candy ↓</a></div></div><iframe class="preview-frame" src="/" title="Candy Baked Factory storefront"></iframe>`;content.insertBefore(preview,hero);
  const grid=content.querySelector('.grid'); if(grid){grid.id='candy-dashboard'; const title=document.createElement('div'); title.className='section-title'; title.innerHTML='<div><p>CANDY OPERATIONS</p><h2>Dashboard Candy</h2></div><small>ร้าน · Content · Codex · API · Cloudflare</small>'; grid.before(title); const sys=document.createElement('section');sys.className='system-panel';sys.innerHTML=`<div><h3>Dashboard ระบบกู · OGENIC AI</h3><p>Control plane หลักของมึงยังแยกจาก Candy ไม่ได้ถูกรวมทับกัน — หน้านี้เป็นประตูเชื่อมเข้า OGENIC โดยตรง</p></div><a class="btn primary" href="${OGENIC}" target="_blank" rel="noopener">OPEN OGENIC DASHBOARD ↗</a>`;grid.after(sys)}
  const drawer=document.getElementById('drawer');drawer?.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));
  const sections=[...document.querySelectorAll('#storefront-live,#candy-dashboard,#overview,#codex,#integrations,#publishing,#deploy')];
  const navLinks=[...document.querySelectorAll('.sidebar .nav a[href^="#"]')];
  const obs=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!hit)return;navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+hit.target.id))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3]});sections.forEach(s=>obs.observe(s));
})();