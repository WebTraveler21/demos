/* SV/EN switcher for real-business pitch demos (prices stay in kronor).
   Each page defines window.EN = {"svensk text":"English text", ...} before loading this file.
   Text nodes are matched on their trimmed Swedish text. Attributes: data-sv-alt/title handled via EN too.
   Language order: ?lang= → saved choice → browser language (sv* = Swedish, else English).
   Pages can call window.tl("svensk") for JS-generated text and set window.onLang = l => {...}. */
(function(){
const EN=window.EN||{};
const COMMON={"Hitta hit":"Find us","Hitta hit →":"Find us →","Adress":"Address","Telefon":"Phone","Öppettider":"Opening hours","Stängt":"Closed",
"Måndag":"Monday","Tisdag":"Tuesday","Onsdag":"Wednesday","Torsdag":"Thursday","Fredag":"Friday","Lördag":"Saturday","Söndag":"Sunday",
"Omdömen":"Reviews","Ring":"Call","Vägbeskrivning":"Directions"};
const D=Object.assign({},COMMON,EN);
let lang='sv';
try{const q=new URLSearchParams(location.search).get('lang');const s=localStorage.getItem('nlLang');
  lang=(q==='sv'||q==='en')?q:(s==='sv'||s==='en')?s:(/^sv/i.test(navigator.language||'')?'sv':'en')}catch(e){}
window.tl=s=>lang==='en'&&D[s]?D[s]:s;
window.getLang=()=>lang;
const nodes=[];
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;
  if(!p||/^(SCRIPT|STYLE)$/.test(p.tagName)||p.closest('.lsw,[data-notl]'))return NodeFilter.FILTER_REJECT;
  return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
while(w.nextNode())nodes.push(w.currentNode);
nodes.forEach(n=>n._sv=n.nodeValue);
const imgs=[...document.querySelectorAll('img[alt]')];imgs.forEach(i=>i._sv=i.alt);
const metaD=document.querySelector('meta[name=description]');const sv={title:document.title,desc:metaD&&metaD.content};
function apply(l){
  lang=l;
  nodes.forEach(n=>{const o=n._sv,t=o.trim();n.nodeValue=(l==='en'&&D[t])?o.replace(t,D[t]):o});
  imgs.forEach(i=>{i.alt=(l==='en'&&D[i._sv])||i._sv});
  if(D.__title)document.title=l==='en'?D.__title:sv.title;
  document.documentElement.lang=l;
  document.querySelectorAll('.lsw button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===l));
  try{localStorage.setItem('nlLang',l);const u=new URL(location.href);u.searchParams.set('lang',l);history.replaceState(null,'',u)}catch(e){}
  if(typeof window.onLang==='function')window.onLang(l);
}
const css=document.createElement('style');
css.textContent='.lsw{display:inline-flex;gap:2px;border:1px solid currentColor;border-radius:999px;padding:2px;font:700 12px/1 Inter,system-ui,sans-serif;opacity:.9}.lsw button{all:unset;cursor:pointer;padding:7px 10px;border-radius:999px;min-width:22px;text-align:center}.lsw button[aria-pressed=true]{background:var(--lsw-on,#111);color:var(--lsw-on-fg,#fff)}';
document.head.appendChild(css);
document.querySelectorAll('[data-lsw]').forEach(slot=>{
  const sw=document.createElement('span');sw.className='lsw';sw.setAttribute('translate','no');
  sw.innerHTML='<button type="button" data-l="sv" aria-label="Svenska"><span>SV</span></button><button type="button" data-l="en" aria-label="English"><span>EN</span></button>';
  sw.addEventListener('click',e=>{const b=e.target.closest('button');if(b)apply(b.dataset.l)});
  slot.appendChild(sw);
});
apply(lang);
})();
