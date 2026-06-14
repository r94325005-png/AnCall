/* 新教倫理 公開站 — 互動 */
(function(){
  var tg = document.querySelector('[data-toggle]');
  function applyView(v){
    document.body.classList.remove('viewboth','viewzh','viewde');
    document.body.classList.add('view'+v);
    if(tg) tg.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.dataset.v===v); });
  }
  var saved=null; try{ saved=localStorage.getItem('weber_view'); }catch(e){}
  if(tg){
    applyView(saved||'both');
    tg.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){ var v=b.dataset.v; applyView(v); try{localStorage.setItem('weber_view',v);}catch(e){} });
    });
  }
  var gf=document.getElementById('gfilter');
  if(gf){
    gf.addEventListener('input', function(){
      var q=gf.value.trim().toLowerCase();
      document.querySelectorAll('table.gt').forEach(function(tb){
        var shown=0;
        tb.querySelectorAll('tbody tr').forEach(function(tr){
          var hit=tr.textContent.toLowerCase().indexOf(q)>=0; tr.style.display=hit?'':'none'; if(hit)shown++; });
        var h2=tb.previousElementSibling; if(h2&&h2.classList.contains('gsec')) h2.style.display=(shown||!q)?'':'none';
      });
    });
  }
  var q=document.getElementById('q');
  if(q && window.SEARCH_INDEX){
    var stat=document.getElementById('qstat'), res=document.getElementById('qres');
    function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
    function run(){
      var k=q.value.trim(); if(k.length<1){res.innerHTML='';stat.textContent='';return;}
      var kl=k.toLowerCase(), hits=[];
      for(var i=0;i<window.SEARCH_INDEX.length;i++){ var it=window.SEARCH_INDEX[i], pos=it.t.toLowerCase().indexOf(kl); if(pos>=0){hits.push([it,pos]); if(hits.length>=200)break;} }
      stat.textContent='找到 '+hits.length+' 段'+(hits.length>=200?'（僅顯示前 200）':'');
      res.innerHTML=hits.map(function(h){ var it=h[0],pos=h[1],a=Math.max(0,pos-30),b=Math.min(it.t.length,pos+k.length+90);
        var snip=esc(it.t.slice(a,b)).replace(esc(k),'<mark>'+esc(k)+'</mark>');
        return '<div class="hit"><a href="'+it.u+'">'+esc(it.s)+' ‧ '+it.r+'</a><p>'+(a>0?'…':'')+snip+(b<it.t.length?'…':'')+'</p></div>'; }).join('');
    }
    var t; q.addEventListener('input', function(){clearTimeout(t);t=setTimeout(run,120);});
  }
})();

/* term-tip */
(function(){
 var terms=document.querySelectorAll('.term'); if(!terms.length) return;
 var tip=document.getElementById('weber-tip');
 if(!tip){tip=document.createElement('div');tip.id='weber-tip';document.body.appendChild(tip);}
 var pinned=null;
 function lk(s){return s.replace(/DECISIONS\.md\s*#([A-Za-z0-9]+)/g,'<a class="dec-link" href="decisions.html#$1">譯例決策 #$1</a>');}
 function H(t){var n=t.getAttribute('data-note');return '<b>'+t.getAttribute('data-de')+'</b><span class="z">'+t.getAttribute('data-zh')+'</span>'+(n?'<div class="n">'+lk(n)+'</div>':'');}
 function show(t,x,y){tip.innerHTML=H(t);tip.style.display='block';var w=tip.offsetWidth,h=tip.offsetHeight;if(x+w+16>window.innerWidth)x=window.innerWidth-w-12;if(x<8)x=8;var ty=y+18;if(ty+h+12>window.innerHeight)ty=y-h-12;tip.style.left=x+'px';tip.style.top=ty+'px';}
 function hide(){tip.style.display='none';}
 terms.forEach(function(t){
  t.addEventListener('mouseenter',function(e){if(!pinned)show(t,e.clientX,e.clientY);});
  t.addEventListener('mousemove',function(e){if(!pinned)show(t,e.clientX,e.clientY);});
  t.addEventListener('mouseleave',function(){if(!pinned)hide();});
  t.addEventListener('click',function(e){e.stopPropagation();if(pinned===t){pinned=null;hide();}else{pinned=t;var r=t.getBoundingClientRect();show(t,r.left,r.top);}});
 });
 document.addEventListener('click',function(e){if(pinned && !tip.contains(e.target)){pinned=null;hide();}});
})();

/* synopsis sync-scroll */
(function(){
 document.querySelectorAll('.syn').forEach(function(d){
   var cols=d.querySelectorAll('.syncol'); if(cols.length<2) return;
   var lock=false;
   cols.forEach(function(c){
     c.addEventListener('scroll',function(){
       if(lock) return; lock=true;
       var max=c.scrollHeight-c.clientHeight, r=max>0?c.scrollTop/max:0;
       cols.forEach(function(o){ if(o!==c){ var m=o.scrollHeight-o.clientHeight; o.scrollTop=r*m; } });
       requestAnimationFrame(function(){lock=false;});
     });
   });
 });
})();
