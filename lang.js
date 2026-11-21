/* Shared SV/EN/EL switcher for the example demos.
   Each demo sets window.I18N = {en:{"svensk text":"english"}, el:{...}} before loading this file.
   Text nodes are matched on their trimmed Swedish text; the original is kept so switching back works. */
(function(){
const COMMON={
en:{
"✨ Exempelsida av Tah Websites – påhittat företag. Vill du ha en egen?":"✨ Example site by Tah Websites – fictional business. Want one of your own?",
"Hitta hit":"Find us","Hitta hit →":"Find us →","📍 Hitta hit":"📍 Find us","📞 Ring":"📞 Call","Ring oss":"Call us",
"Adress":"Address","Telefon":"Phone","Öppet":"Open","Öppettider":"Opening hours","Stängt":"Closed",
"Måndag":"Monday","Tisdag":"Tuesday","Onsdag":"Wednesday","Torsdag":"Thursday","Fredag":"Friday","Lördag":"Saturday","Söndag":"Sunday",
"Vägbeskrivning":"Directions","Vägbeskrivning →":"Directions →",
"Exempel på omdömen":"Example reviews","Vad gästerna säger":"What guests say","Exempel på betyg":"Example rating","Exempelbetyg":"Example rating",
"— Exempelomdöme":"— Example review"},
el:{
"✨ Exempelsida av Tah Websites – påhittat företag. Vill du ha en egen?":"✨ Παράδειγμα από την Tah Websites – φανταστική επιχείρηση. Θέλεις κι εσύ ένα;",
"Hitta hit":"Βρες μας","Hitta hit →":"Βρες μας →","📍 Hitta hit":"📍 Βρες μας","📞 Ring":"📞 Κάλεσε","Ring oss":"Πάρε μας τηλέφωνο",
"Adress":"Διεύθυνση","Telefon":"Τηλέφωνο","Öppet":"Ανοιχτά","Öppettider":"Ωράριο","Stängt":"Κλειστά",
"Måndag":"Δευτέρα","Tisdag":"Τρίτη","Onsdag":"Τετάρτη","Torsdag":"Πέμπτη","Fredag":"Παρασκευή","Lördag":"Σάββατο","Söndag":"Κυριακή",
"Vägbeskrivning":"Οδηγίες","Vägbeskrivning →":"Οδηγίες →",
"Exempel på omdömen":"Ενδεικτικές κριτικές","Vad gästerna säger":"Τι λένε οι πελάτες","Exempel på betyg":"Ενδεικτική βαθμολογία","Exempelbetyg":"Ενδεικτική βαθμολογία",
"— Exempelomdöme":"— Ενδεικτική κριτική"}};
const L=['sv','en','el'];
let lang='sv';
try{const q=new URLSearchParams(location.search).get('lang');lang=L.includes(q)?q:(L.includes(localStorage.getItem('tahLang'))?localStorage.getItem('tahLang'):'sv')}catch(e){}
const D=window.I18N||{};
function dict(l){return Object.assign({},COMMON[l]||{},D[l]||{})}
window.tl=function(s){if(lang==='sv')return s;const d=dict(lang);return d[s]||s};
const nodes=[];
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||/^(SCRIPT|STYLE)$/.test(p.tagName)||p.closest('svg,.tl-sw'))return NodeFilter.FILTER_REJECT;return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
while(w.nextNode())nodes.push(w.currentNode);
nodes.forEach(n=>n._sv=n.nodeValue);
function apply(l){
  lang=l;const d=dict(l);
  nodes.forEach(n=>{const o=n._sv,t=o.trim();n.nodeValue=(l==='sv'||!d[t])?o:o.replace(t,d[t])});
  document.documentElement.lang=l;
  document.querySelectorAll('.tl-sw button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));
  try{localStorage.setItem('tahLang',l);const u=new URL(location.href);u.searchParams.set('lang',l);history.replaceState(null,'',u)}catch(e){}
  if(typeof window.onLang==='function')window.onLang(l);
}
// switcher inside the demo bar
const css=document.createElement('style');
css.textContent='.tl-sw{display:inline-flex;gap:2px;margin-left:10px;vertical-align:middle;background:rgba(0,0,0,.18);border-radius:999px;padding:2px}.tl-sw button{all:unset;cursor:pointer;font:700 11px/1 system-ui,sans-serif;padding:4px 8px;border-radius:999px;color:inherit;opacity:.85}.tl-sw button.on{background:#fff;color:#111;opacity:1}@media(max-width:600px){.tl-sw{margin-left:6px}.tl-sw button{padding:3px 6px;font-size:10px}}';
document.head.appendChild(css);
const sw=document.createElement('span');sw.className='tl-sw';
sw.innerHTML=L.map(l=>'<button type="button" data-l="'+l+'">'+l.toUpperCase()+'</button>').join('');
sw.addEventListener('click',e=>{const b=e.target.closest('button');if(b)apply(b.dataset.l)});
const bar=document.querySelector('.demobar');if(bar)bar.appendChild(sw);
apply(lang);
})();
