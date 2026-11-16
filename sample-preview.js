/* Public portfolio samples: all names, counters and entries are fictional. */
(function(){
'use strict';
const cases={
 'pos-alc':{name:'POS ALC',type:'Point of Sale',tone:'#d9b267',hint:'Contoh antarmuka toko — bukan data operasional',metrics:[['Penjualan Hari Ini','Rp 2.450.000'],['Transaksi','24'],['Barang Aktif','1.280'],['Stok Menipis','8']],tabs:['Dashboard','Penjualan','Stok'],rows:[['Lampu LED 12 Watt','3 pcs','Rp 135.000'],['Kabel NYM 2×1.5','2 rol','Rp 580.000'],['Stop Kontak 4 Lubang','5 pcs','Rp 225.000']]},
 'weduz-pos':{name:'WEDUZ POS',type:'Android & Desktop POS',tone:'#b7a3e7',hint:'Konsep dashboard lintas perangkat — data fiktif',metrics:[['Omzet Bulan Ini','Rp 12,8 jt'],['Transaksi','186'],['Produk','730'],['Margin','18,4%']],tabs:['Dashboard','Master Produk','Kasir'],rows:[['Buku Tulis Premium','12 pcs','Rp 216.000'],['Bolpoin Gel','15 pcs','Rp 150.000'],['Map Dokumen','8 pcs','Rp 80.000']]},
 'hadir-pro':{name:'WEDUZ HADIR PRO',type:'Absensi Digital',tone:'#ecc27d',hint:'Ilustrasi data demo — bukan data peserta sebenarnya',metrics:[['Peserta Aktif','48'],['Hadir Hari Ini','39'],['Izin / Sakit','5'],['Belum Tercatat','4']],tabs:['Rekap','Jadwal','QR Absensi'],rows:[['Peserta Contoh A','Kelas A','Hadir · 07:02'],['Peserta Contoh B','Kelas B','Izin'],['Peserta Contoh C','Kelas A','Terlambat 6m']]},
 'ayatara':{name:'AYATARA',type:'Belajar Mengaji Anak',tone:'#8ae3c4',hint:'Ilustrasi halaman belajar — tanpa suara atau data anak',metrics:[['Huruf Hijaiyah','29'],['Mode Belajar','3'],['Kuis','Interaktif'],['Doa','Harian']],tabs:['Hijaiyah','Kuis','Doa'],rows:[['اَ','A','Fathah'],['بَ','Ba','Fathah'],['جَ','Ja','Fathah']]},
 'aneka-jamu':{name:'ANEKA JAMU',type:'Inventory Control',tone:'#93dba5',hint:'Contoh stok inventori — bukan data usaha',metrics:[['Produk Aktif','640'],['Rak Terisi','18'],['Barang Masuk','32'],['Stok Rendah','12']],tabs:['Dashboard','Stok per Rak','Barang Masuk'],rows:[['Jamu Serbuk Contoh A','Rak A-01','45 pak'],['Herbal Contoh B','Rak B-02','16 botol'],['Minuman Contoh C','Rak A-03','80 pcs']]},
 'smart-rt':{name:'SMART RT DIRECTORY',type:'Direktori Lingkungan',tone:'#94c8f9',hint:'Seluruh alamat ilustrasi fiktif — tidak ada data warga',metrics:[['Rumah Contoh','36'],['Lokasi Terpetakan','30'],['Dokumentasi','25'],['Akses','Terbatas']],tabs:['Ringkasan','Direktori','Lokasi'],rows:[['Rumah Contoh 01','Blok Ilustrasi A','Terdokumentasi'],['Rumah Contoh 02','Blok Ilustrasi B','Menunggu foto'],['Rumah Contoh 03','Blok Ilustrasi C','Terpetakan']]},
 'wizzy':{name:'WEDUZ KIDS — WIZZY',type:'English for Kids',tone:'#c6a5ff',hint:'Ilustrasi belajar bahasa Inggris anak — tanpa akun atau data anak',metrics:[['Tema Belajar','Colors'],['Kosakata','Basic Words'],['Kuis','Fun Quiz'],['Mode','Practice']],tabs:['Learn','Colors','Words','Quiz'],rows:[['Red','Merah','Color'],['Blue','Biru','Color'],['Apple','Apel','Vocabulary']]}
};
const el=id=>document.getElementById(id);
const backdrop=el('sample-modal');
const title=el('sample-title'),type=el('sample-type'),desc=el('sample-desc'),screen=el('sample-screen');
const closeBtn=el('sample-close');
const mockImage=el('sample-mockup-image');
let previousFocus=null;
function make(tag,cls,content){
 const node=document.createElement(tag);if(cls)node.className=cls;if(content!=null)node.textContent=String(content);return node;
}
function renderSample(key){
 const d=cases[key];if(!d)return;
 screen.replaceChildren();
 mockImage.src='./assets/mockups/'+key+'.svg';
 mockImage.alt='Visual ilustrasi konsep aplikasi '+d.name;
 const appShell=make('div','sample-app');
 appShell.style.setProperty('--sample-accent',d.tone);
 const bar=make('div','sample-app-bar');
 const dot=make('span','sample-app-dot');bar.append(dot,make('strong','',d.name),make('span','sample-app-demo','DEMO'));
 appShell.append(bar);
 const nav=make('div','sample-app-nav');
 d.tabs.forEach((t,i)=>{const chip=make('span',i===0?'selected':'',t);nav.append(chip)});
 appShell.append(nav);
 const grid=make('div','sample-app-stats');
 for(const [label,value] of d.metrics){
  const item=make('div','sample-stat');
  item.append(make('small','',label),make('strong','',value));
  grid.append(item);
 }
 appShell.append(grid);
 const head=make('div','sample-app-section');
 head.append(make('strong','','Contoh Aktivitas'),make('small','','DATA SIMULASI'));
 appShell.append(head);
 const list=make('div','sample-app-rows');
 for(const row of d.rows){
  const r=make('div','sample-app-row');
  r.append(make('strong','',row[0]),make('span','',row[1]),make('b','',row[2]));
  list.append(r);
 }
 appShell.append(list);
 const foot=make('p','sample-disclosure','Seluruh angka, nama, dan aktivitas pada pratinjau ini hanya ilustrasi. Tidak terhubung ke sistem maupun data asli.');
 appShell.append(foot);
 screen.append(appShell);
 title.textContent=d.name;
 type.textContent=d.type;
 desc.textContent=d.hint;
}
function openSample(key){
 if(!cases[key])return;
 previousFocus=document.activeElement;
 renderSample(key);
 backdrop.hidden=false;
 document.body.classList.add('sample-open');
 closeBtn.focus();
}
function closeSample(){
 backdrop.hidden=true;
 document.body.classList.remove('sample-open');
 screen.replaceChildren();
 if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();
}
document.querySelectorAll('[data-sample]').forEach(btn=>{
 btn.addEventListener('click',()=>openSample(btn.dataset.sample));
});
closeBtn.addEventListener('click',closeSample);
backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeSample()});
document.addEventListener('keydown',e=>{
 if(backdrop.hidden)return;
 if(e.key==='Escape'){e.preventDefault();closeSample();return}
 if(e.key==='Tab'){
  const focusables=[...backdrop.querySelectorAll('button:not([disabled]),a[href]')].filter(x=>x.offsetParent!==null);
  if(!focusables.length){e.preventDefault();return}
  const first=focusables[0],last=focusables[focusables.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
})();