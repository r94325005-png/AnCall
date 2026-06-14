window.DECMAP={"生活導引": "L01", "Lebensführung": "L01", "考驗": "B01", "Bewährung": "B01", "預定論": "P01", "Prädestination": "P01", "Prädeterminismus": "P01", "心理報償": "P02", "Prämien": "P02", "天職": "BR01", "Beruf": "BR01", "Berufung": "BR01", "內在親和性": "L02", "Verwandtschaft": "L02", "Wahlverwandtschaft": "L02", "營利意識": "B02", "Erwerbssinn": "B02", "Geschäftssinn": "B02", "Erwerbstrieb": "B02", "外殼": "L03", "鐵籠": "L03", "Gehäuse": "L03", "職業義務": "B03", "Berufspflicht": "B03", "Metier": "L05", "Alberti": "L05", "Lebensstil": "L06", "Apokryphen": "L08", "諸偽典": "L08"};
window.SITE_VERSION="2026-06-14";
window.SITE_TITLE="新教倫理與資本主義精神";

/* ========== 共用工具：複製到剪貼簿 + toast 提示 ========== */
function weberToast(msg){
  var el=document.getElementById('weber-toast');
  if(!el){el=document.createElement('div');el.id='weber-toast';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el);}
  el.textContent=msg;el.classList.add('show');
  clearTimeout(weberToast._t);weberToast._t=setTimeout(function(){el.classList.remove('show');},1800);
}
function weberCopy(text,msg){
  function ok(){weberToast(msg||'已複製');}
  function fail(){
    try{var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
      document.body.appendChild(ta);ta.focus();ta.select();document.execCommand('copy');document.body.removeChild(ta);ok();}
    catch(e){weberToast('無法複製，請手動選取');}
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(ok,fail);}
  else{fail();}
}
function weberPageURL(hash){
  var base=location.origin+location.pathname;
  return hash?base+'#'+hash:base;
}

/* ========== 批次4：深色模式切換（系統／淺色／深色，記憶於 localStorage） ========== */
(function(){
  var KEY='weber_theme';
  var mq=window.matchMedia?window.matchMedia('(prefers-color-scheme:dark)'):null;
  function mode(){var m=null;try{m=localStorage.getItem(KEY);}catch(e){}return (m==='light'||m==='dark'||m==='auto')?m:'auto';}
  function resolve(m){if(m==='light')return 'light';if(m==='dark')return 'dark';return (mq&&mq.matches)?'dark':'light';}
  function paint(m){
    var r=resolve(m);
    document.documentElement.setAttribute('data-theme',r);
    var meta=document.querySelector('meta[name="theme-color"][data-dyn]');
    if(meta)meta.setAttribute('content',r==='dark'?'#16140f':'#fdfcfa');
  }
  paint(mode()); /* 與 head 行內腳本一致，避免閃爍 */
  var nav=document.querySelector('nav.main');
  if(nav&&!nav.querySelector('.themebtn')){
    var btn=document.createElement('button');btn.type='button';btn.className='themebtn';
    function label(){
      var m=mode();
      var ic=m==='light'?'☀':(m==='dark'?'☾':'◐');
      var nm=m==='light'?'淺色':(m==='dark'?'深色':'跟隨系統');
      btn.textContent=ic;
      btn.setAttribute('aria-label','色彩主題：目前「'+nm+'」，點按切換');
      btn.setAttribute('title','色彩主題：'+nm);
    }
    label();
    btn.addEventListener('click',function(){
      var order=['auto','light','dark'];var m=mode();var nx=order[(order.indexOf(m)+1)%3];
      try{localStorage.setItem(KEY,nx);}catch(e){}
      paint(nx);label();
    });
    nav.appendChild(btn);
    if(mq){var on=function(){if(mode()==='auto')paint('auto');};
      if(mq.addEventListener)mq.addEventListener('change',on);else if(mq.addListener)mq.addListener(on);}
  }
})();

/* ========== 批次4：Service Worker 註冊（離線可讀；相對路徑，子目錄部署亦可） ========== */
(function(){
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('sw.js').catch(function(){/* 靜默失敗，不影響閱讀 */});
    });
  }
})();

/* ========== 視圖切換（雙語／純中／純德）＋全文檢索＋術語表篩選 ========== */
(function(){
  var tg=document.querySelector('[data-toggle]');
  function applyView(v){document.body.classList.remove('viewboth','viewzh','viewde');document.body.classList.add('view'+v);
    if(tg)tg.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.v===v);});}
  var saved=null;try{saved=localStorage.getItem('weber_view');}catch(e){}
  if(tg){applyView(saved||'both');tg.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){var v=b.dataset.v;applyView(v);try{localStorage.setItem('weber_view',v);}catch(e){}});});}
  var gf=document.getElementById('gfilter');
  if(gf){gf.addEventListener('input',function(){var qq=gf.value.trim().toLowerCase();
    document.querySelectorAll('table.gt').forEach(function(tb){var shown=0;
      tb.querySelectorAll('tbody tr').forEach(function(tr){var hit=tr.textContent.toLowerCase().indexOf(qq)>=0;tr.style.display=hit?'':'none';if(hit)shown++;});
      var h2=tb.previousElementSibling;if(h2&&h2.classList.contains('gsec'))h2.style.display=(shown||!qq)?'':'none';});});}

  /* ----- 全文檢索：索引延遲載入＋依來源分組＋可切換篩選＋命中精確跳轉 ----- */
  var q=document.getElementById('q');
  if(q){
    var stat=document.getElementById('qstat'),res=document.getElementById('qres');
    var SRC={'new':'1920 正文新譯','ed':'1904/05 初版','dec':'翻譯決策'};
    var ORDER=['new','ed','dec'];
    function srcOf(u){if(u.indexOf('ed1904')===0)return 'ed';if(u.indexOf('decisions')===0)return 'dec';return 'new';}
    function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
    var filter='all';try{var sf=localStorage.getItem('weber_qsrc');if(sf)filter=sf;}catch(e){}
    var bar=document.createElement('div');bar.className='qfilter';bar.setAttribute('role','tablist');bar.setAttribute('aria-label','依來源篩選結果');
    if(res&&res.parentNode)res.parentNode.insertBefore(bar,res);
    var lastHits=[];

    /* 索引延遲載入：首次互動才下載 assets/search-index.js */
    var idxReady=!!window.SEARCH_INDEX, idxLoading=false, idxCbs=[];
    function ensureIndex(cb){
      if(window.SEARCH_INDEX){idxReady=true;cb&&cb(true);return;}
      if(cb)idxCbs.push(cb);
      if(idxLoading)return;
      idxLoading=true;
      if(stat)stat.innerHTML='<span class="qloading">載入全文索引中…</span>';
      var s=document.createElement('script');s.src='assets/search-index.js';
      s.onload=function(){idxLoading=false;idxReady=true;var cbs=idxCbs;idxCbs=[];cbs.forEach(function(f){f(true);});};
      s.onerror=function(){idxLoading=false;if(stat)stat.textContent='索引載入失敗，請檢查網路或重新整理頁面。';var cbs=idxCbs;idxCbs=[];cbs.forEach(function(f){f(false);});};
      document.head.appendChild(s);
    }

    function renderBar(counts,total){
      var defs=[['all','全部',total]].concat(ORDER.map(function(k){return [k,SRC[k],counts[k]||0];}));
      bar.innerHTML=defs.map(function(d){var on=d[0]===filter;
        return '<button type="button" role="tab" aria-selected="'+(on?'true':'false')+'" class="qchip'+(on?' on':'')+'" data-src="'+d[0]+'">'+d[1]+'<span class="qn">'+d[2]+'</span></button>';}).join('');
      bar.querySelectorAll('.qchip').forEach(function(b){b.addEventListener('click',function(){filter=b.dataset.src;try{localStorage.setItem('weber_qsrc',filter);}catch(e){}render();});});
    }
    function render(){
      var counts={};lastHits.forEach(function(h){var s=srcOf(h[0].u);counts[s]=(counts[s]||0)+1;});
      renderBar(counts,lastHits.length);
      if(!lastHits.length){res.innerHTML='';return;}
      var html='';
      ORDER.forEach(function(k){
        if(filter!=='all'&&filter!==k)return;
        var grp=lastHits.filter(function(h){return srcOf(h[0].u)===k;});
        if(!grp.length)return;
        html+='<section class="qgroup" aria-label="'+SRC[k]+'"><h2 class="qgh">'+SRC[k]+'<span class="qgn">'+grp.length+' 段</span></h2>';
        html+=grp.map(function(h){var it=h[0],pos=h[1],kk=h[2];
          var a=Math.max(0,pos-30),b=Math.min(it.t.length,pos+kk.length+90);
          var snip=esc(it.t.slice(a,b)).replace(esc(kk),'<mark>'+esc(kk)+'</mark>');
          return '<div class="hit"><a href="'+it.u+'"><span class="src src-'+k+'">'+SRC[k]+'</span>'+esc(it.s)+(it.r?' ‧ '+esc(it.r):'')+'</a><p>'+(a>0?'…':'')+snip+(b<it.t.length?'…':'')+'</p></div>';}).join('');
        html+='</section>';
      });
      if(!html&&filter!=='all'){html='<p class="qstat">此來源沒有相符的段落，請切換「全部」或其他來源。</p>';}
      res.innerHTML=html;
    }
    function doSearch(k){
      var kl=k.toLowerCase(),hits=[];
      for(var i=0;i<window.SEARCH_INDEX.length;i++){var it=window.SEARCH_INDEX[i],pos=it.t.toLowerCase().indexOf(kl);if(pos>=0){hits.push([it,pos,k]);if(hits.length>=300)break;}}
      lastHits=hits;
      stat.textContent='找到 '+hits.length+' 段'+(hits.length>=300?'（僅顯示前 300）':'');
      render();
    }
    function run(){var k=q.value.trim();
      if(k.length<1){lastHits=[];res.innerHTML='';stat.textContent='';bar.innerHTML='';return;}
      if(window.SEARCH_INDEX){doSearch(k);}
      else{ensureIndex(function(okk){if(okk&&q.value.trim()===k)doSearch(k);else if(okk)run();});}
    }
    var t;q.addEventListener('input',function(){clearTimeout(t);t=setTimeout(run,120);});
    q.addEventListener('focus',function(){ensureIndex(null);},{once:true});
    var qp=new URLSearchParams(location.search).get('q');if(qp){q.value=qp;run();}else{ensureIndex(null);}
  }
})();

/* ========== 頂欄：全站搜尋入口（注入主選單） ========== */
(function(){
  var nav=document.querySelector('nav.main');if(!nav)return;
  if(nav.querySelector('.navsearch'))return;
  var here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  var form=document.createElement('form');form.className='navsearch';form.setAttribute('role','search');
  form.setAttribute('action','search.html');form.setAttribute('method','get');form.setAttribute('aria-label','全站搜尋');
  form.innerHTML='<input type="search" name="q" placeholder="搜尋全文…" aria-label="搜尋全文"><button type="submit" aria-label="搜尋">⌕</button>';
  nav.appendChild(form);
  if(here==='search.html'){
    form.addEventListener('submit',function(e){
      var box=document.getElementById('q');if(!box)return;
      e.preventDefault();box.value=form.querySelector('input').value;
      box.dispatchEvent(new Event('input'));box.focus();
    });
  }
})();

/* ========== 導覽：下拉群組的當前頁標示 + 鍵盤可及 ========== */
(function(){
  var nav=document.querySelector('nav.main');if(!nav)return;
  var here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(here==='')here='index.html';
  nav.querySelectorAll('a[href]').forEach(function(a){
    var t=(a.getAttribute('href')||'').split('/').pop().toLowerCase();
    if(t===here){a.classList.add('on');a.setAttribute('aria-current','page');var g=a.closest('.ng');if(g)g.classList.add('on');}
  });
  nav.querySelectorAll('.ngt').forEach(function(btn){
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',function(e){
      e.stopPropagation();var g=btn.closest('.ng');var open=g.classList.toggle('open');
      nav.querySelectorAll('.ng').forEach(function(o){if(o!==g){o.classList.remove('open');o.querySelector('.ngt').setAttribute('aria-expanded','false');}});
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.ng'))nav.querySelectorAll('.ng.open').forEach(function(o){o.classList.remove('open');o.querySelector('.ngt').setAttribute('aria-expanded','false');});
  });
})();

/* ========== 德文段落標記 lang="de"（供螢幕報讀器正確發音） ========== */
(function(){
  document.querySelectorAll('.seg .de').forEach(function(d){d.setAttribute('lang','de');});
})();

/* ========== 閱讀字級 A−／A＋（記憶於 localStorage，套用 .seg/.ed-wrap/.syncol） ========== */
(function(){
  var isRead=document.querySelector('.reading')||document.querySelector('.ed-wrap');
  if(!isRead)return;
  var MIN=0.85,MAX=1.6,STEP=0.075,DEF=1;
  var rs=DEF;try{var s=parseFloat(localStorage.getItem('weber_rs'));if(s)rs=s;}catch(e){}
  function clamp(v){return Math.min(MAX,Math.max(MIN,Math.round(v*1000)/1000));}
  function apply(){document.documentElement.style.setProperty('--rs',rs);}
  function save(){try{localStorage.setItem('weber_rs',rs);}catch(e){}}
  apply();
  var bar=document.createElement('div');bar.className='readtools';
  bar.innerHTML='<span class="rt-lbl">字級</span>'+
    '<button class="rt-a1" type="button" aria-label="縮小字級">A−</button>'+
    '<button class="rt-a2" type="button" aria-label="放大字級">A＋</button>'+
    '<button class="rt-reset" type="button" aria-label="還原字級">還原</button>';
  var head=document.querySelector('.readhead');
  if(head)head.appendChild(bar);
  else{var w=document.querySelector('main .reading,main .ed-wrap');if(w)w.insertBefore(bar,w.firstChild);}
  bar.querySelector('.rt-a1').addEventListener('click',function(){rs=clamp(rs-STEP);apply();save();});
  bar.querySelector('.rt-a2').addEventListener('click',function(){rs=clamp(rs+STEP);apply();save();});
  bar.querySelector('.rt-reset').addEventListener('click',function(){rs=DEF;apply();save();});
})();

/* ========== 段落永久連結 ¶ ＋ 一鍵引用（閱讀頁 .locus／1904 段落 .ed-wrap>p[id]） ========== */
(function(){
  function citation(loc,hash){
    var url=weberPageURL(hash);
    var work=document.querySelector('.ed-wrap')&&/1904|初版|差異/.test(document.title)
      ? '《新教倫理與資本主義精神（1904/05 初版）》' : '《新教倫理與資本主義精神》';
    return '韋伯，'+work+'，ANCCC 譯，'+(loc?loc+'，':'')+window.SITE_VERSION+' 版，'+url;
  }
  document.querySelectorAll('.locus[id]').forEach(function(sec){
    var id=sec.id,loc=sec.querySelector('.loc');if(!loc)return;
    var locText=(loc.querySelector('span')?loc.querySelector('span').textContent:'').replace(/\s+/g,' ').trim();
    var old=loc.querySelector('.anchor');if(old)old.remove();
    var tools=document.createElement('span');tools.className='loctools';
    tools.innerHTML='<button type="button" data-act="link" title="複製本段網址">¶ 連結</button>'+
      '<button type="button" data-act="cite" title="複製引用格式">複製引用</button>';
    loc.appendChild(tools);
    tools.querySelector('[data-act="link"]').addEventListener('click',function(){
      history.replaceState(null,'','#'+id);weberCopy(weberPageURL(id),'已複製本段網址');});
    tools.querySelector('[data-act="cite"]').addEventListener('click',function(){
      weberCopy(citation(locText,id),'已複製引用格式');});
  });
  document.querySelectorAll('.ed-wrap>p[id]').forEach(function(p){
    var id=p.id;
    var pg='';var prev=p.previousElementSibling;
    while(prev){if(prev.classList&&prev.classList.contains('ed-pg')){pg=prev.textContent.replace(/\s+/g,' ').trim();break;}prev=prev.previousElementSibling;}
    var tools=document.createElement('span');tools.className='parperma';
    tools.innerHTML='<button type="button" data-act="link" title="複製本段網址">¶</button>'+
      '<button type="button" data-act="cite" title="複製引用格式">引</button>';
    p.insertBefore(tools,p.firstChild);
    tools.querySelector('[data-act="link"]').addEventListener('click',function(){
      history.replaceState(null,'','#'+id);weberCopy(weberPageURL(id),'已複製本段網址');});
    tools.querySelector('[data-act="cite"]').addEventListener('click',function(){
      weberCopy(citation(pg,id),'已複製引用格式');});
  });
})();

/* ========== 上次讀到：閱讀頁記錄、首頁一鍵續讀 ========== */
(function(){
  var KEY='weber_lastread';
  var here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  var isRead=document.querySelector('.reading')||document.querySelector('.ed-wrap');
  if(isRead){
    var anchors=[].slice.call(document.querySelectorAll('.locus[id],.ed-wrap>p[id],h2.ed-h[id],h3.ed-h[id]'));
    function save(){
      var top=window.scrollY+130,cur='';
      for(var i=0;i<anchors.length;i++){if(anchors[i].offsetTop<=top)cur=anchors[i].id;else break;}
      var h1=document.querySelector('.readhead h1');
      var rec={url:here,anchor:cur,title:h1?h1.textContent.trim():document.title,time:Date.now()};
      try{localStorage.setItem(KEY,JSON.stringify(rec));}catch(e){}
    }
    var t;window.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(save,400);},{passive:true});
    window.addEventListener('beforeunload',save);
  }
  if(here==='index.html'||here===''){
    var rec=null;try{rec=JSON.parse(localStorage.getItem(KEY));}catch(e){}
    if(rec&&rec.url&&rec.url!=='index.html'){
      var href=rec.url+(rec.anchor?'#'+rec.anchor:'');
      var box=document.createElement('div');box.className='resume';
      box.innerHTML='<div class="ri"><span class="rk">上次讀到</span><span class="rt"></span></div>'+
        '<a class="rgo" href="'+href+'">繼續閱讀 →</a>'+
        '<button class="rx" type="button" aria-label="清除續讀紀錄">×</button>';
      box.querySelector('.rt').textContent=rec.title||'前一個章節';
      var hero=document.querySelector('main .hero');
      if(hero&&hero.parentNode)hero.parentNode.insertBefore(box,hero.nextSibling);
      else{var m=document.querySelector('main');if(m)m.insertBefore(box,m.firstChild);}
      box.querySelector('.rx').addEventListener('click',function(){try{localStorage.removeItem(KEY);}catch(e){}box.remove();});
    }
  }
})();

/* ========== 長章節浮動頁內小目次（小節／locus 跳轉） ========== */
(function(){
  var items=[];
  document.querySelectorAll('.reading .locus[id]').forEach(function(sec){
    var topic=sec.querySelector('.topic');
    var loc=sec.querySelector('.loc span');
    var label=topic?topic.textContent.trim():(loc?loc.textContent.replace(/\s+/g,' ').trim():sec.id);
    items.push({id:sec.id,label:label});
  });
  if(!items.length){
    document.querySelectorAll('.ed-wrap h2.ed-h,.ed-wrap h3.ed-h').forEach(function(h,i){
      if(!h.id)h.id='h-'+(i+1);
      items.push({id:h.id,label:h.textContent.trim()});
    });
  }
  if(items.length<6)return;
  var toc=document.createElement('nav');toc.className='minitoc';toc.setAttribute('aria-label','頁內目次');
  var html='<div class="mt-h">本頁目次</div>';
  items.forEach(function(it){html+='<a href="#'+it.id+'">'+it.label.replace(/[<>&]/g,'')+'</a>';});
  toc.innerHTML=html;document.body.appendChild(toc);
  var btn=document.createElement('button');btn.className='minitoc-btn';btn.type='button';btn.textContent='目次';btn.setAttribute('aria-label','開關頁內目次');
  document.body.appendChild(btn);
  btn.addEventListener('click',function(){toc.classList.toggle('open');});
  var links=[].slice.call(toc.querySelectorAll('a'));
  links.forEach(function(a){a.addEventListener('click',function(){toc.classList.remove('open');});});
  var targets=items.map(function(it){return document.getElementById(it.id);});
  function hi(){
    var y=window.scrollY+140,idx=0;
    for(var i=0;i<targets.length;i++){if(targets[i]&&targets[i].offsetTop<=y)idx=i;else break;}
    links.forEach(function(a,i){a.classList.toggle('on',i===idx);});
    var act=links[idx];if(act){var r=act.offsetTop-toc.scrollTop;if(r<0||r>toc.clientHeight-30)toc.scrollTop=act.offsetTop-toc.clientHeight/2;}
  }
  var rt;window.addEventListener('scroll',function(){clearTimeout(rt);rt=setTimeout(hi,80);},{passive:true});hi();
})();

/* ========== term-tip — hover/focus + 鍵盤 Enter/Space + Esc + 翻譯決策連結 ========== */
(function(){
 var terms=document.querySelectorAll('.term');if(!terms.length)return;
 var tip=document.getElementById('weber-tip');
 if(!tip){tip=document.createElement('div');tip.id='weber-tip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);}
 var pinned=null,hideT=null;
 function lk(s){return s.replace(/DECISIONS\.md\s*#([A-Za-z0-9]+)/g,'<a class="dec-link" href="decisions.html#$1">譯例決策 #$1</a>');}
 function H(t){var de=t.getAttribute('data-de'),zh=t.getAttribute('data-zh'),n=t.getAttribute('data-note')||'';
  var did=(window.DECMAP&&(window.DECMAP[zh]||window.DECMAP[de]))||'';
  if(did){n=n.replace(/（[^（）]*DECISIONS\.md[^（）]*）/g,'').replace(/DECISIONS\.md\s*#[A-Za-z0-9]+/g,'').trim();}else{n=lk(n);}
  var h='<b lang="de">'+de+'</b><span class="z">'+zh+'</span>';
  if(n)h+='<div class="n">'+n+'</div>';
  if(did)h+='<a class="dec-link" href="decisions.html#'+did+'">→ 翻譯決策　#'+did+'</a>';
  return h;}
 function show(t,x,y){tip.innerHTML=H(t);tip.style.display='block';var w=tip.offsetWidth,hh=tip.offsetHeight;if(x+w+16>window.innerWidth)x=window.innerWidth-w-12;if(x<8)x=8;var ty=y+18;if(ty+hh+12>window.innerHeight)ty=y-hh-12;tip.style.left=x+'px';tip.style.top=ty+'px';}
 function hide(){tip.style.display='none';}
 function sched(){hideT=setTimeout(function(){if(!pinned)hide();},260);}
 function cancel(){if(hideT){clearTimeout(hideT);hideT=null;}}
 function toggle(t){var r=t.getBoundingClientRect();if(pinned===t){pinned=null;hide();}else{pinned=t;show(t,r.left,r.bottom-16);}}
 tip.addEventListener('mouseenter',cancel);
 tip.addEventListener('mouseleave',sched);
 terms.forEach(function(t){
  var de=t.getAttribute('data-de')||'',zh=t.getAttribute('data-zh')||'';
  t.setAttribute('tabindex','0');t.setAttribute('role','button');
  t.setAttribute('aria-label','術語：'+zh+'（德文 '+de+'），按 Enter 看說明');
  t.addEventListener('mouseenter',function(e){cancel();if(!pinned)show(t,e.clientX,e.clientY);});
  t.addEventListener('mousemove',function(e){if(!pinned)show(t,e.clientX,e.clientY);});
  t.addEventListener('mouseleave',function(){sched();});
  t.addEventListener('click',function(e){e.stopPropagation();toggle(t);});
  t.addEventListener('focus',function(){cancel();if(!pinned){var r=t.getBoundingClientRect();show(t,r.left,r.bottom-16);}});
  t.addEventListener('blur',function(){if(pinned!==t)sched();});
  t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();toggle(t);}});
 });
 document.addEventListener('click',function(e){if(pinned&&!tip.contains(e.target)){pinned=null;hide();}});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){pinned=null;hide();}});
})();

/* ========== mobile nav + back-to-top + jump-flash ========== */
(function(){
 var hdr=document.querySelector('header.top');
 if(hdr){var w=hdr.querySelector('.wrap');var bt=document.createElement('button');bt.className='navtoggle';bt.setAttribute('aria-label','選單');bt.setAttribute('aria-expanded','false');bt.innerHTML='☰';
  w.appendChild(bt);bt.addEventListener('click',function(){var o=hdr.classList.toggle('navopen');bt.setAttribute('aria-expanded',o?'true':'false');});}
 var top=document.createElement('button');top.className='backtop';top.setAttribute('aria-label','回到頂端');top.innerHTML='↑';
 document.body.appendChild(top);
 top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
 window.addEventListener('scroll',function(){top.classList.toggle('show',window.scrollY>700);},{passive:true});
 function flash(){var id=decodeURIComponent((location.hash||'').slice(1));if(!id)return;var el=document.getElementById(id);if(el){el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');}}
 window.addEventListener('hashchange',function(){setTimeout(flash,40);});
 setTimeout(flash,80);
})();

/* ========== synopsis sync-scroll ========== */
(function(){
 document.querySelectorAll('.syn').forEach(function(d){var cols=d.querySelectorAll('.syncol');if(cols.length<2)return;var lock=false;
   cols.forEach(function(c){c.addEventListener('scroll',function(){if(lock)return;lock=true;
     var max=c.scrollHeight-c.clientHeight,r=max>0?c.scrollTop/max:0;
     cols.forEach(function(o){if(o!==c){var m=o.scrollHeight-o.clientHeight;o.scrollTop=r*m;}});
     requestAnimationFrame(function(){lock=false;});});});});
})();

/* ========== 批次3：版本異動 ↔ 1920 正文 段級雙向互參 ========== */
(function(){
 var XR=window.WEBER_XREF; if(!XR) return;
 var here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 function flashEl(el){if(!el)return;el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');}

 /* ---- version.html：每條異動加 id（v1…）＋回鏈到 1920 正文對應段 ---- */
 if(here==='version.html'){
   var vcs=document.querySelectorAll('details.vc');
   vcs.forEach(function(d,i){
     d.id='v'+(i+1);
     var df=XR.diffs[i]; if(!df) return;
     var sg=(df.seg>=0)?XR.segs[df.seg]:null; if(!sg) return;
     var sum=d.querySelector('summary'); if(!sum||sum.querySelector('.vc-back')) return;
     var a=document.createElement('a'); a.className='vc-back';
     a.href=sg.f+'#'+sg.r;
     a.innerHTML='→ 1920 正文　'+sg.s+'　'+sg.r;
     a.title='前往 1920 定版此處正文';
     a.addEventListener('click',function(e){e.stopPropagation();});
     sum.appendChild(a);
   });
   var openHashV=function(){
     var id=decodeURIComponent((location.hash||'').slice(1)); if(!id) return;
     var el=document.getElementById(id); if(!el||el.tagName.toLowerCase()!=='details') return;
     el.style.display=''; el.open=true; el.scrollIntoView({block:'center'}); flashEl(el);
   };
   window.addEventListener('hashchange',function(){setTimeout(openHashV,40);});
   setTimeout(openHashV,120);
 }

 /* ---- sec 頁：每段「1920 有增補」段級徽章，點按跳版本對照對應條 ---- */
 if(/^sec-/.test(here)){
   var idx={}; XR.segs.forEach(function(sg,i){idx[sg.r]=i;});
   var byseg={};
   XR.diffs.forEach(function(d,i){ if(d.seg>=0){ (byseg[d.seg]=byseg[d.seg]||[]).push(i); } });
   document.querySelectorAll('.locus[id]').forEach(function(sec){
     var si=idx[sec.id]; if(si===undefined) return;
     var ds=byseg[si]; if(!ds||!ds.length) return;
     var loc=sec.querySelector('.loc'); if(!loc||loc.querySelector('.seg-badge')) return;
     var first=ds[0]+1;
     var b=document.createElement('a'); b.className='seg-badge';
     b.href='version.html#v'+first;
     b.innerHTML='1920 有增補 <span class="sb-n">'+ds.length+'</span>';
     b.title='本段在 1920 定版有 '+ds.length+' 處增補／異動，點按檢視';
     var tools=loc.querySelector('.loctools');
     if(tools) loc.insertBefore(b,tools); else loc.appendChild(b);
   });
 }

 /* ---- synopsis.html：色塊展開後加「讀 1920 正文」回鏈 ---- */
 if(here==='synopsis.html'){
   /* app.js 於 synopsis 內聯展開腳本之前載入，故延後至點擊事件處理完成後再補回鏈 */
   document.querySelectorAll('.chg').forEach(function(b){
     b.addEventListener('click',function(){
       setTimeout(function(){
         if(b._box && !b._box._xref){
           var t=XR.vidseg[b.dataset.id];
           if(t){ var a=document.createElement('a'); a.className='chg-back';
             a.href=t.f+'#'+t.r; a.textContent='→ 讀 1920 正文　'+t.s+' '+t.r;
             b._box.appendChild(a); }
           b._box._xref=1;
         }
       },0);
     });
   });
 }
})();
