
const menu=document.querySelector('.menu');
const nav=document.querySelector('.navlinks');
if(menu) menu.addEventListener('click',()=>nav.classList.toggle('show'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('show')));

function toast(msg){
 const t=document.querySelector('.toast');
 if(!t)return;
 t.textContent=msg;t.classList.add('show');
 setTimeout(()=>t.classList.remove('show'),3200);
}

document.querySelectorAll('form[data-store]').forEach(form=>{
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const key=form.dataset.store;
  const data=Object.fromEntries(new FormData(form));
  const old=JSON.parse(localStorage.getItem(key)||'[]');
  old.push({...data,createdAt:new Date().toISOString()});
  localStorage.setItem(key,JSON.stringify(old));
  form.reset();
  toast(form.dataset.message||'Submitted successfully.');
 });
});

const filters=document.querySelectorAll('[data-filter]');
const gallery=document.querySelectorAll('[data-category]');
filters.forEach(btn=>btn.addEventListener('click',()=>{
 filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;
 gallery.forEach(item=>item.style.display=(f==='all'||item.dataset.category===f)?'block':'none');
}));

const dateInput=document.querySelector('input[type="date"]');
if(dateInput) dateInput.min=new Date().toISOString().split('T')[0];

document.querySelectorAll('.year').forEach(x=>x.textContent=new Date().getFullYear());
