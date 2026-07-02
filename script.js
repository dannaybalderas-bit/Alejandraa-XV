const phone = '528115642463';
const eventDate = new Date('2026-07-24T19:30:00-06:00');
const music = document.getElementById('music');
const enterBtn = document.getElementById('enterBtn');
const musicToggle = document.getElementById('musicToggle');

function playMusic(){
  music.play().then(()=> musicToggle.classList.add('playing')).catch(()=>{});
}
function toggleMusic(){
  if(music.paused){ playMusic(); } else { music.pause(); musicToggle.classList.remove('playing'); }
}
enterBtn.addEventListener('click',()=>{
  playMusic();
  document.getElementById('contenido').scrollIntoView({behavior:'smooth'});
});
musicToggle.addEventListener('click',toggleMusic);

function updateCountdown(){
  const now = new Date();
  let diff = eventDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function openWhatsApp(text){
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,'_blank');
}

document.getElementById('songForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const song = document.getElementById('songInput').value.trim();
  if(!song) return;
  openWhatsApp(`Hola, para los XV de Alejandra creo que no puede faltar esta canción: ${song}`);
});

document.getElementById('rsvpForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const attendance = document.getElementById('attendance').value;
  const name = document.getElementById('guestName').value.trim();
  const message = document.getElementById('message').value.trim();
  const song = document.getElementById('rsvpSong').value.trim();
  const text = `Confirmación XV Alejandra%0A%0A¿Asistirá?: ${attendance}%0ANombre: ${name}%0AMensaje para Alejandra: ${message || 'Sin mensaje'}%0ACanción que no puede faltar: ${song || 'Sin canción'}`;
  window.open(`https://wa.me/${phone}?text=${text}`,'_blank');
});
