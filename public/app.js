// tabs
document.querySelectorAll('#tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id===b.dataset.v));
  window.scrollTo({top:0});
});
const fmt=n=>n.toLocaleString('tr-TR');

// plan kutusu
const sl=document.getElementById('planSlider');
function plan(){const v=+sl.value;document.getElementById('planTutar').textContent=fmt(v)+' TL';
  document.getElementById('p12').innerHTML='<b>'+fmt(v*12)+' TL</b>';document.getElementById('p36').innerHTML='<b>'+fmt(v*36)+' TL</b>';}
sl.oninput=plan;plan();

// pozisyon tablosu (örnek ağırlıklar)
function pozCiz(poz){document.getElementById('pozTablo').innerHTML='<tr><th>#</th><th>Hisse</th><th>Sektör</th><th class="num">Ağırlık</th><th style="width:30%"></th></tr>'+
  poz.map((p,i)=>`<tr><td>${i+1}</td><td class="tick">${p[0]}</td><td>${p[1]}</td><td class="num">%${p[2].toFixed(1).replace('.',',')}</td><td><div class="wbar" style="width:${p[2]*9}%"></div></td></tr>`).join('');}

// raf testi
const ans={};
document.querySelectorAll('.chips[data-q] .chip').forEach(c=>c.onclick=()=>{
  const q=c.parentElement.dataset.q;ans[q]=c.dataset.a;
  c.parentElement.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));
  if(ans.vade&&ans.tepki&&ans.katilim) raf();
});
const RAF={
  nakit:['Nakit park','s1','OPTLR ve para piyasası fonları','Kısa vadede ihtiyacın olacak para için oynaklığı düşük seçenekler.','Fon'],
  katilim:['Katılım','s5','OPK30 ve kira sertifikası fonları','Faizsiz esaslara uygun hisse ve sukuk ürünleri.','BYF'],
  koruma:['Değer koruma','s4','OPGLD ve döviz ürünleri','Düşüşlere karşı hassassan, enflasyon ve kura karşı koruma odaklı.','BYF'],
  gelir:['Gelir','s3','OPT25, bono ve eurobond','Orta vadede düzenli nakit akışı ve temettü.','Bono'],
  cekirdek:['Birikim çekirdeği','s2','OPX30, OPD25','Uzun vadede düzenli planla hisse piyasasına ortaklık.','Düzenli Plan']
};
function raf(){
  let k;
  if(ans.vade==='kisa')k='nakit';
  else if(ans.katilim==='evet')k='katilim';
  else if(ans.tepki==='sat')k='koruma';
  else if(ans.vade==='orta')k='gelir';
  else k='cekirdek';
  const r=RAF[k],el=document.getElementById('rafSonuc');
  el.innerHTML=`<div style="display:flex;gap:12px;align-items:center"><div class="shelf ${r[1]}" style="min-height:0;padding:10px 14px"><b>${r[0]}</b></div><div><b style="color:var(--ink)">${r[2]}</b><div style="font-size:12.5px;color:var(--muted)">${r[3]}</div></div></div>
  <div style="font-size:12px;margin-top:10px;color:var(--deep)">Formda "${r[4]}" ilgisi senin için işaretlendi →</div>`;
  el.classList.add('show');
  document.querySelectorAll('#urunChips .chip').forEach(c=>c.classList.toggle('on',c.dataset.p===r[4]));
}
document.querySelectorAll('#urunChips .chip').forEach(c=>c.onclick=()=>c.classList.toggle('on'));

// hisse arama demo (örnek veri)
let FON={};
function ara(){
  const q=document.getElementById('hisseAra').value.trim().toUpperCase(),el=document.getElementById('araSonuc');
  if(!q){el.innerHTML='';return;}
  const f=FON[q];
  el.innerHTML=f?`<div class="card" style="padding:12px"><b class="tick">${q}</b> şu Osmanlı BYF'lerinde var: ${f.map(x=>`<span class="pill" style="margin-left:6px">${x}</span>`).join('')}
    <div style="font-size:11.5px;color:var(--muted);margin-top:6px">Demo verisi. Canlıda tüm TEFAS fonları ve ağırlıklar KAP portföy dağılım raporlarından gelir.</div></div>`
    :`<div class="card" style="padding:12px;font-size:13px">Demoda yalnızca şu kodlar var: ${Object.keys(FON).join(', ')}</div>`;
}
document.getElementById('araBtn').onclick=ara;
document.getElementById('hisseAra').onkeydown=e=>{if(e.key==='Enter')ara();};

// içerik dosyası (public/data/icerik.json) — güncellemeler buradan
fetch('data/icerik.json',{cache:'no-store'}).then(r=>r.json()).then(d=>{
  document.getElementById('guncelleme').textContent=new Date(d.guncelleme).toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
  document.getElementById('haftalikNot').innerHTML='<tr><th>Fon</th><th>Değişiklik</th><th>Neden</th></tr>'+
    d.haftalikNot.map(n=>`<tr><td class="tick">${n.fon}</td><td>${n.degisiklik}</td><td>${n.neden}</td></tr>`).join('');
  pozCiz(d.pozisyonlarOrnek.OPX30);
  FON=d.hisseFonOrnek;
});
