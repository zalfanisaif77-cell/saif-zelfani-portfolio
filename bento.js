(()=>{
  'use strict';
  const header=document.getElementById('bn-header');
  const progress=document.getElementById('bn-progress');
  const menuButton=document.getElementById('bn-menu-button');
  const menu=document.getElementById('bn-menu');
  const updateProgress=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    if(progress) progress.style.transform=`scaleX(${Math.min(1,scrollY/max)})`;
    header?.classList.toggle('is-stuck',scrollY>14);
  };
  addEventListener('scroll',updateProgress,{passive:true});updateProgress();
  let previousFocus=null;
  const closeMenu=()=>{
    if(!menu||!menuButton)return;
    menu.hidden=true;menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Ouvrir le menu');
    document.body.style.overflow='';
  };
  if(menu&&menuButton){
    menuButton.addEventListener('click',()=>{
      const opening=menu.hidden;
      if(opening)previousFocus=document.activeElement;
      menu.hidden=!opening;menuButton.setAttribute('aria-expanded',String(opening));
      menuButton.setAttribute('aria-label',opening?'Fermer le menu':'Ouvrir le menu');
      document.body.style.overflow=opening?'hidden':'';
      if(opening)menu.querySelector('a')?.focus();else previousFocus?.focus();
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    addEventListener('keydown',e=>{
      if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus()}
      if(e.key==='Tab'&&!menu.hidden){
        const focusables=[menuButton,...menu.querySelectorAll('a')];
        const idx=focusables.indexOf(document.activeElement);
        if(e.shiftKey&&idx===0){e.preventDefault();focusables.at(-1).focus()}
        else if(!e.shiftKey&&idx===focusables.length-1){e.preventDefault();focusables[0].focus()}
      }
    });
    addEventListener('resize',()=>{if(innerWidth>820)closeMenu()});
  }
  const categoryButtons=[...document.querySelectorAll('[data-bn-category]')];
  const select=document.getElementById('bn-brand-filter');
  const cards=[...document.querySelectorAll('.bn-gallery-item')];
  const counter=document.getElementById('bn-project-count');
  const empty=document.getElementById('bn-empty');
  let category='Tous';
  function applyFilters(){
    let count=0;
    const brand=select?.value||'Tous';
    cards.forEach(card=>{
      const show=(category==='Tous'||card.dataset.category===category)&&(brand==='Tous'||card.dataset.brand===brand);
      card.hidden=!show;if(show)count++;
    });
    if(counter)counter.textContent=`${count} projet${count>1?'s':''} affiché${count>1?'s':''}`;
    if(empty)empty.hidden=count!==0;
    categoryButtons.forEach(btn=>{const on=btn.dataset.bnCategory===category;btn.classList.toggle('is-active',on);btn.setAttribute('aria-pressed',String(on))});
  }
  categoryButtons.forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.bnCategory;applyFilters()}));
  select?.addEventListener('change',applyFilters);
  document.getElementById('bn-reset')?.addEventListener('click',()=>{category='Tous';if(select)select.value='Tous';applyFilters()});
  applyFilters();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced&&'IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}}),{threshold:.08});
    document.querySelectorAll('.bn-section-head,.bn-method-cell,.bn-feature-grid > *, .bn-about-grid > *, .bn-contact-card').forEach(el=>{el.classList.add('bn-reveal');obs.observe(el)});
  }
})();
