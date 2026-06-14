/* 新教倫理 公開站 — 互動 */
(function(){
  // ---- 閱讀模式切換（記憶於本機）----
  var tg = document.querySelector('[data-toggle]');
  function applyView(v){
    document.body.classList.remove('viewboth','viewzh','viewde');
    document.body.classList.add('view'+v);
    if(tg) tg.querySelectorAll('button').forEach(function(b){
      b.classList.toggle('on', b.dataset.v===v); });
  }
  var saved = null;
  try{ saved = localStorage.getItem('weber_view'); }catch(e){}
  if(tg){
    applyView(saved || 'both');
    tg.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){
        var v=b.dataset.v; applyView(v);
        try{ localStorage.setItem('weber_view', v); }catch(e){}
      });
    });
  }

  // ---- 術語表即時篩選 ----
  var gf = document.getElementById('gfilter');
  if(gf){
    gf.addEventListener('input', function(){
      var q = gf.value.trim().toLowerCase();
      document.querySelectorAll('table.gt').forEach(function(tb){
        var shown=0;
        tb.querySelectorAll('tbody tr').forEach(function(tr){
          var hit = tr.textContent.toLowerCase().indexOf(q)>=0;
          tr.style.display = hit?'':'none'; if(hit) shown++;
        });
        var h2 = tb.previousElementSibling;
        if(h2 && h2.classList.contains('gsec')) h2.style.display = (shown||!q)?'':'none';
      });
    });
  }

  // ---- 全文檢索 ----
  var q = document.getElementById('q');
  if(q && window.SEARCH_INDEX){
    var stat=document.getElementById('qstat'), res=document.getElementById('qres');
    function esc(s){return s.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
    function run(){
      var k=q.value.trim();
      if(k.length<1){res.innerHTML='';stat.textContent='';return;}
      var kl=k.toLowerCase(), hits=[];
      for(var i=0;i<window.SEARCH_INDEX.length;i++){
        var it=window.SEARCH_INDEX[i], pos=it.t.toLowerCase().indexOf(kl);
        if(pos>=0){ hits.push([it,pos]); if(hits.length>=200) break; }
      }
      stat.textContent='找到 '+hits.length+' 段'+(hits.length>=200?'（僅顯示前 200）':'');
      res.innerHTML = hits.map(function(h){
        var it=h[0],pos=h[1],a=Math.max(0,pos-30),b=Math.min(it.t.length,pos+k.length+90);
        var snip=esc(it.t.slice(a,b)).replace(esc(k),'<mark>'+esc(k)+'</mark>');
        return '<div class="hit"><a href="'+it.u+'">'+esc(it.s)+' ‧ '+it.r+'</a>'+
               '<p>'+(a>0?'…':'')+snip+(b<it.t.length?'…':'')+'</p></div>';
      }).join('');
    }
    var t; q.addEventListener('input', function(){clearTimeout(t);t=setTimeout(run,120);});
  }
})();
