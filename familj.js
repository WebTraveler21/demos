/* Family switcher shared by Ta'ameya, Cucina Povera, The Rolling Bagels and Danderyds Saluhall demos */
(function(){
var B=[
 {k:'taameya',n:"Ta'ameya",c:'#d6f06a',f:"900 13px/1 Archivo,Inter,sans-serif",u:'taameya'},
 {k:'cucina-povera',n:'cucina povera',c:'#2f6b48',f:"italic 400 15px/1 'Instrument Serif',Georgia,serif",u:'cucina-povera'},
 {k:'rolling-bagels',n:'The Rolling Bagels',c:'#c8343a',f:"400 14px/1 'Lilita One',Inter,sans-serif",u:'rolling-bagels'},
 {k:'danderyds-saluhall',n:'Danderyds Saluhall',c:'#c59a52',f:"500 14px/1 Fraunces,Georgia,serif",u:'danderyds-saluhall'}
];
var cur=(location.pathname.match(/demos\/([^\/]+)/)||location.pathname.match(/\/([^\/]+)\/?(index\.html)?$/)||[])[1];
var css='.fam-bar{background:#0b0a09;color:#cfc8bd;border-bottom:1px solid #262320;position:relative;z-index:40}'+
'.fam-bar .in{max-width:1180px;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:6px;height:42px;overflow-x:auto;scrollbar-width:none}'+
'.fam-bar .in::-webkit-scrollbar{display:none}'+
'.fam-bar .lb{font:600 10px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#7d766c;white-space:nowrap;margin-right:6px}'+
'.fam-bar a{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;padding:7px 12px;border-radius:999px;color:#cfc8bd;text-decoration:none;transition:background .2s,color .2s}'+
'.fam-bar a i{width:8px;height:8px;border-radius:50%;flex:none}'+
'.fam-bar a[aria-current]{background:#f2ece2;color:#0b0a09}'+
'@media(hover:hover){.fam-bar a:not([aria-current]):hover{background:#1f1c19;color:#fff}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var lang=(new URLSearchParams(location.search).get('lang'));
var bar=document.createElement('div');bar.className='fam-bar';bar.setAttribute('data-notl','');
var h='<div class="in"><span class="lb">Familjen</span>';
B.forEach(function(b){h+='<a href="../'+b.u+'/'+(lang?'?lang='+lang:'')+'"'+(b.k===cur?' aria-current="page"':'')+' style="font:'+b.f+'"><i style="background:'+b.c+'"></i>'+b.n+'</a>'});
bar.innerHTML=h+'</div>';
var db=document.querySelector('.demobar');
if(db&&db.nextSibling)db.parentNode.insertBefore(bar,db.nextSibling);else document.body.insertBefore(bar,document.body.firstChild);
/* keep ?lang when the visitor switches language */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.fam-bar a');if(!a)return;var l=window.getLang&&getLang();if(l){e.preventDefault();location.href=a.href.split('?')[0]+'?lang='+l}});
window.FAMILJ=B;
})();
