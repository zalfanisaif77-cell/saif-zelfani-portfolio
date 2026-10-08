(()=>{
const photos=Array.from(document.querySelectorAll('[data-campaign-slide]'));
const thumbs=Array.from(document.querySelectorAll('[data-campaign-thumb]'));
const counter=document.querySelector('[data-campaign-count]');
const prev=document.querySelector('[data-campaign-prev]');
const next=document.querySelector('[data-campaign-next]');
const modal=document.querySelector('.campaign-modal');
const zoom=document.querySelector('[data-zoom]');
const modalImg=document.querySelector('[data-modal-img]');
let active=0,open=false, touchX=null;
function update(index){
 if(!photos.length)return;
 active=(index+photos.length)%photos.length;
 photos.forEach((photo,i)=>{photo.hidden=i!==active});
 thumbs.forEach((thumb,i)=>{thumb.setAttribute('aria-current',String(i===active));});
 const strip=thumbs[0]?.parentElement; const selected=thumbs[active]; if(strip&&selected){const a=selected.getBoundingClientRect(),b=strip.getBoundingClientRect();if(a.left<b.left||a.right>b.right){strip.scrollBy({left:a.left-b.left-20,behavior:'smooth'});}}
 if(counter)counter.textContent=`${String(active+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;
 if(prev)prev.disabled=active===0;if(next)next.disabled=active===photos.length-1;
 if(open&&modalImg){modalImg.src=photos[active].src;modalImg.alt=photos[active].alt;document.querySelector('.modal-count').textContent=(active+1)+' / '+photos.length;}
}
if(prev)prev.addEventListener('click',()=>update(active-1));
if(next)next.addEventListener('click',()=>update(active+1));
thumbs.forEach((b,i)=>b.addEventListener('click',()=>update(i)));
function openModal(){open=true;modal.hidden=false;document.body.style.overflow='hidden';update(active);document.querySelector('.modal-close').focus()}
function closeModal(){open=false;modal.hidden=true;document.body.style.overflow='';if(zoom)zoom.focus()}
if(zoom)zoom.addEventListener('click',openModal);
if(modal){modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.querySelector('.modal-prev').addEventListener('click',()=>update(active-1));modal.querySelector('.modal-next').addEventListener('click',()=>update(active+1));modal.addEventListener('click',e=>{if(e.target===modal)closeModal()})}
window.addEventListener('keydown',e=>{if(open){if(e.key==='Escape')closeModal();if(e.key==='ArrowRight')update(active+1);if(e.key==='ArrowLeft')update(active-1)}else if(document.activeElement?.closest('.campaign-art')){if(e.key==='ArrowRight')update(active+1);if(e.key==='ArrowLeft')update(active-1)}});
const stage=document.querySelector('.campaign-show');
if(stage){stage.addEventListener('touchstart',e=>touchX=e.touches[0]?.clientX,{passive:true});stage.addEventListener('touchend',e=>{if(touchX===null)return;const delta=e.changedTouches[0]?.clientX-touchX;if(Math.abs(delta)>45)update(active+(delta<0?1:-1));touchX=null},{passive:true})}
update(0);
})();