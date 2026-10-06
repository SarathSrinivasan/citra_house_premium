
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const savedTheme=localStorage.getItem('citra-theme')||'light'; document.documentElement.dataset.theme=savedTheme;
const savedDir=localStorage.getItem('citra-dir')||'ltr'; document.documentElement.dir=savedDir;
function setTheme(){const d=document.documentElement; d.dataset.theme=d.dataset.theme==='dark'?'light':'dark'; localStorage.setItem('citra-theme',d.dataset.theme)}
function setDir(){const d=document.documentElement; d.dir=d.dir==='rtl'?'ltr':'rtl'; localStorage.setItem('citra-dir',d.dir)}
$$('[data-theme-toggle]').forEach(b=>b.addEventListener('click',setTheme)); $$('[data-dir-toggle]').forEach(b=>b.addEventListener('click',setDir));
const menu=$('.menu-btn'), links=$('.navlinks'); if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));
const path=location.pathname.split('/').pop()||'index.html'; $$('[data-page]').forEach(a=>{if(a.getAttribute('data-page')===path)a.classList.add('active')});
$$('.reveal').forEach(el=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');e.target.parentElement?.classList.add('visible')}}),{threshold:.12}).observe(el));
const modal=$('.modal'), toast=$('.toast');
function openModal(mode='book'){if(!modal)return; modal.classList.add('open'); $$('.modal-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode)); $$('.modal-panel').forEach(p=>p.hidden=p.dataset.panel!==mode)}
function closeModal(){modal?.classList.remove('open')}
$$('[data-open-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.openModal)));
$$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal)); modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
$$('.modal-tabs button').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.mode)));
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3000)}
$$('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault(); if(!f.checkValidity()){f.reportValidity();return} f.reset(); closeModal(); showToast('Thank you — your request has been received. We will be in touch shortly.')}));
// Blog/category filtering
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const value=btn.dataset.filter; $$('.filter [data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active'); $$('.filterable').forEach(card=>card.style.display=(value==='all'||card.dataset.category===value)?'':'none')}));
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

// Premium micro-interactions: stagger repeated content as it enters the viewport.
document.querySelectorAll('.product-grid,.feature-grid,.service-grid,.process,.values,.blog-grid').forEach(group=>{
  [...group.children].forEach((el,i)=>el.style.transitionDelay=`${Math.min(i*70,350)}ms`);
});
// Give navigation a subtle scroll state while keeping it sticky.
const stickyHeader=document.querySelector('.header');
window.addEventListener('scroll',()=>{
  if(!stickyHeader) return;
  stickyHeader.style.boxShadow=window.scrollY>18?'0 10px 35px rgba(17,22,51,.08)':'none';
},{passive:true});

/* FINAL ACCOUNT MENU HANDLER */
(function(){
  const menus=document.querySelectorAll('.user-menu');
  menus.forEach(menu=>{
    const trigger=menu.querySelector('.user-icon');
    const dropdown=menu.querySelector('.user-dropdown');
    if(!trigger || !dropdown) return;
    trigger.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('.user-menu.open').forEach(other=>{
        if(other!==menu){
          other.classList.remove('open');
          other.querySelector('.user-icon')?.setAttribute('aria-expanded','false');
        }
      });
      const open=!menu.classList.contains('open');
      menu.classList.toggle('open',open);
      trigger.setAttribute('aria-expanded',String(open));
    });
    dropdown.addEventListener('click',function(e){e.stopPropagation()});
  });
  document.addEventListener('click',function(){
    document.querySelectorAll('.user-menu.open').forEach(menu=>{
      menu.classList.remove('open');
      menu.querySelector('.user-icon')?.setAttribute('aria-expanded','false');
    });
  });
})();
