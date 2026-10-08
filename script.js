const devices = {
  lampu: {state:true, label:'Lampu', on:'ON', off:'OFF'},
  ac: {state:true, label:'AC', on:'ON • 24°C', off:'OFF'},
  kipas: {state:false, label:'Kipas', on:'ON • Level 3', off:'OFF'},
  charger: {state:false, label:'Charger', on:'ON', off:'OFF'}
};

const toast = document.getElementById('toast');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove('show'),2200);
}

function updateDevice(key){
  const d = devices[key];
  const card = document.querySelector(`[data-device="${key}"]`);
  const sw = card.querySelector('.switch');
  const state = document.getElementById(key+'State');
  d.state = !d.state;
  card.classList.toggle('active', d.state);
  sw.classList.toggle('on', d.state);
  state.textContent = d.state ? d.on : d.off;
  showToast(`${d.label} ${d.state ? 'dinyalakan' : 'dimatikan'} ✓`);
}

document.querySelectorAll('.device-card').forEach(card=>{
  card.addEventListener('click',()=>updateDevice(card.dataset.device));
});

document.getElementById('allOffBtn').addEventListener('click',()=>{
  Object.keys(devices).forEach(key=>{
    devices[key].state=false;
    const card=document.querySelector(`[data-device="${key}"]`);
    card.classList.remove('active');
    card.querySelector('.switch').classList.remove('on');
    document.getElementById(key+'State').textContent='OFF';
  });
  showToast('Semua perangkat dimatikan ✓');
});

document.getElementById('ecoBtn').addEventListener('click',()=>{
  devices.ac.state=false;
  devices.kipas.state=true;
  devices.lampu.state=true;
  devices.charger.state=false;
  ['lampu','ac','kipas','charger'].forEach(key=>{
    const d=devices[key], card=document.querySelector(`[data-device="${key}"]`);
    card.classList.toggle('active',d.state);
    card.querySelector('.switch').classList.toggle('on',d.state);
    document.getElementById(key+'State').textContent=d.state?d.on:d.off;
  });
  document.getElementById('savingValue').textContent='21';
  showToast('Mode hemat energi aktif 🌿');
});

document.getElementById('notificationBtn').addEventListener('click',()=>{
  showToast('Tidak ada peringatan baru 🔔');
});

document.getElementById('periodSelect').addEventListener('change',e=>{
  const data={
    'Hari ini':['18.6','14','6.2'],
    'Minggu ini':['126.4','18','43.7'],
    'Bulan ini':['508.2','21','174.8']
  }[e.target.value];
  document.getElementById('energyValue').textContent=data[0];
  document.getElementById('savingValue').textContent=data[1];
  document.getElementById('solarValue').textContent=data[2];
  showToast(`Data ${e.target.value.toLowerCase()} ditampilkan`);
});

document.querySelectorAll('.nav-item').forEach(item=>{
  item.addEventListener('click',()=>{
    document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
    item.classList.add('active');
    const page=item.dataset.page;
    const messages={
      home:'Beranda dibuka',
      monitor:'Monitoring energi dibuka',
      notice:'Notifikasi dibuka',
      profile:'Profil Bolo dibuka'
    };
    showToast(messages[page]);
  });
});

// Simulasi sensor kehadiran
setInterval(()=>{
  const occupied=Math.random()>.25;
  const status=document.getElementById('roomStatus');
  status.textContent=occupied?'● Penghuni terdeteksi':'○ Kamar kosong';
  status.style.background=occupied?'#edf5fb':'#f3f1eb';
  status.style.color=occupied?'#3973a1':'#927e58';
},5000);
alert("JavaScript berhasil berjalan!");