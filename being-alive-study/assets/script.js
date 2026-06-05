// 走讀 Being Alive — 導覽選單 + 列印時展開全部詳解 + 年份
(function(){
  var t=document.querySelector('.nav-toggle'),l=document.getElementById('nav-links');
  if(t&&l){t.addEventListener('click',function(){
    var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');});}
  window.addEventListener('beforeprint',function(){
    document.querySelectorAll('details.deep').forEach(function(d){d.setAttribute('open','');});});
  document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear();});
})();
