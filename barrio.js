// ============================================
//   LA BARBERÍA DEL BARRIO — barrio.js
//   Reloj en vivo · Radio interactiva · Ruleta
//   Chat Don Jorge · Ventilador reactivo
//   Calendario · Factura de papel carbón
// ============================================

// ═══════ DATA ═══════
const barberos = [
  {id:1, nombre:'Don Jorge Parra',     rol:'Fundador · 35 años',   disponible:true,  cuts:14000},
  {id:2, nombre:'Sebastián Banguera',  rol:'Socio · 15 años',      disponible:true,  cuts:9800},
  {id:3, nombre:'Valentina Ríos',      rol:'Barbera Senior',        disponible:true,  cuts:6200},
  {id:4, nombre:'Camilo Herrera',      rol:'Especialista Fade',     disponible:false, cuts:4100},
  {id:5, nombre:'Felipe Vargas',       rol:'El Joven del Barrio',   disponible:true,  cuts:1800},
];

const servicios = [
  {id:1, nombre:'Corte Clásico',          cat:'Cortes',   precio:'$25.000', precioN:25000, dur:'30 min', desc:'Tijera y peine, como lo hacía el bisabuelo. El corte de toda la vida.',    tags:['Tijera','Clásico'],   icono:'✂️', nuevo:false},
  {id:2, nombre:'Fade Completo',           cat:'Cortes',   precio:'$32.000', precioN:32000, dur:'45 min', desc:'Degradado de pies a cabeza. La especialidad de la casa desde el 2010.',  tags:['Fade','Máquina'],     icono:'⚡', nuevo:false},
  {id:3, nombre:'Corte + Barba',           cat:'Combos',   precio:'$42.000', precioN:42000, dur:'60 min', desc:'El paquete completo. Sale de aquí hecho una película, parce.',          tags:['Combo','Popular'],    icono:'👑', nuevo:false},
  {id:4, nombre:'Perfilada de Barba',      cat:'Barba',    precio:'$18.000', precioN:18000, dur:'25 min', desc:'Navaja recta, aceite de argán y un pulso que da miedo de lo fino.',     tags:['Barba','Navaja'],     icono:'🗡️', nuevo:false},
  {id:5, nombre:'Afeitado con Toalla',     cat:'Barba',    precio:'$22.000', precioN:22000, dur:'30 min', desc:'Toalla caliente, espuma artesanal y la navaja de Don Jorge. Un ritual.', tags:['Afeitado','Ritual'], icono:'🔥', nuevo:false},
  {id:6, nombre:'Corte de Niño',           cat:'Especiales',precio:'$18.000',precioN:18000, dur:'25 min', desc:'Para los futuros parces del barrio. Paciencia garantizada.',             tags:['Niño','Familiar'],    icono:'👦', nuevo:false},
  {id:7, nombre:'Fade + Diseño',           cat:'Cortes',   precio:'$38.000', precioN:38000, dur:'55 min', desc:'Fade con líneas, figuras o iniciales. Tu cabeza como lienzo.',          tags:['Diseño','Artístico'], icono:'🎨', nuevo:true},
  {id:8, nombre:'Paquete VIP',             cat:'Combos',   precio:'$65.000', precioN:65000, dur:'90 min', desc:'Corte + barba + cejas + masaje. Para el que sabe que merece lo mejor.', tags:['VIP','Premium'],      icono:'🌟', nuevo:true},
  {id:9, nombre:'Keratina Capilar',        cat:'Especiales',precio:'$55.000',precioN:55000, dur:'60 min', desc:'Tratamiento de alisado con queratina. Adiós frizz, hola cabello liso.', tags:['Tratamiento','Pelo'], icono:'💆', nuevo:true},
];

const estaciones = [
  {freq:'96.3 FM', nombre:'La Mega',      song:'El vallenato que te gustaba'},
  {freq:'88.5 FM', nombre:'Tropicana',    song:'La salsa que mueve el barrio'},
  {freq:'103.9 FM',nombre:'La Z',         song:'El rock que pone el ambiente'},
  {freq:'92.9 FM', nombre:'W Radio',      song:'Las noticias del día'},
  {freq:'97.1 FM', nombre:'Oxígeno',      song:'Música para trabajar'},
  {freq:'91.9 FM', nombre:'La Superestación',song:'Clásicos de toda la vida'},
];

const galerias = [
  {titulo:'Don Jorge en sus tiempos', desc:'1989 · La primera silla', rot:-3, tipo:'foto1'},
  {titulo:'El barrio de antes',       desc:'La fachada original',     rot:2,  tipo:'fachada'},
  {titulo:'Fade de campeonato',       desc:'Obra de Sebas',           rot:-1, tipo:'fade'},
  {titulo:'El equipo completo',       desc:'Los cinco del barrio',    rot:3,  tipo:'equipo'},
  {titulo:'La navaja de 30 años',     desc:'El arma secreta',         rot:-2, tipo:'navaja'},
  {titulo:'Barrio campeón',           desc:'Colombia 2001',           rot:1,  tipo:'colombia'},
];

// Chat de Don Jorge
const chatScript = {
  inicio: {
    msg: '¡Buenas, parce! 👋 Soy Don Jorge, el dueño de la barbería. ¿En qué le ayudo?',
    opciones: ['¿Qué cortes hacen?','¿Cuánto vale un fade?','¿Tienen turno hoy?','¿Cómo llego?']
  },
  '¿Qué cortes hacen?': {
    msg: 'Uy parce, de todo! Fade, corte clásico, barba, afeitado con toalla caliente... tenemos desde los básicos hasta los más elaborados. ¿Tiene alguno en mente?',
    opciones: ['Cuénteme del fade','¿Y la barba?','¿Qué me recomienda?','Agendar turno']
  },
  '¿Cuánto vale un fade?': {
    msg: 'El fade solo vale $32.000 y queda de película. Si quiere el combo con barba le sale en $42.000. ¡Precio de barrio, calidad de concurso! 😄',
    opciones: ['¿Y el corte clásico?','¡Me interesa el combo!','¿Tienen algo más económico?','Agendar turno']
  },
  '¿Tienen turno hoy?': {
    msg: 'Déjeme revisar... 🤔 Tenemos espacios disponibles hoy de 2PM en adelante. ¿Le queda bien esa hora, parce?',
    opciones: ['¡Perfecto!','¿Hay algo antes?','Prefiero mañana','Agendar turno']
  },
  '¿Cómo llego?': {
    msg: 'Estamos en la Cra 8 #15-42, barrio San Nicolás. Al lado de la tienda de Don Chucho. ¡Todo el barrio nos conoce! 📍',
    opciones: ['¿Tienen parqueadero?','¿A qué hora cierran?','¿Hay bus cerca?','Agendar turno']
  },
  'Cuénteme del fade': {
    msg: 'El fade es lo nuestro, parce. Skin fade, mid fade, high fade... Sebastián tiene un pulso que da miedo. 45 minuticos y sale distinto. Vale $32.000.',
    opciones: ['¡Me lo hago!','¿Cuánto con barba?','Agendar turno','Volver']
  },
  '¿Y la barba?': {
    msg: 'La barba la manejamos con navaja recta. Perfilada vale $18.000 y el afeitado completo con toalla caliente $22.000. ¡Un lujazo, parce!',
    opciones: ['¡Quiero el afeitado!','¿Combo con corte?','Agendar turno','Volver']
  },
  '¿Qué me recomienda?': {
    msg: 'Mire, si es la primera vez le recomiendo el combo: corte + barba por $42.000. Sale de aquí hecho una película y entiende por qué la gente lleva 35 años viniendo. 😊',
    opciones: ['¡Ese combo!','¿Y si solo quiero el corte?','Agendar turno','Volver']
  },
  'Agendar turno': {
    msg: '¡Con mucho gusto! Llene el formulario de turno aquí abajo y yo le confirmo por WhatsApp en menos de 30 minutos. ¡O llámeme directamente! 📞',
    opciones: ['Ver formulario','Llamar al local','¿Tienen WhatsApp?','Gracias Don Jorge']
  },
  '¡Perfecto!': {
    msg: '¡Listo parce! Apunte: Cra 8 #15-42. Llegue 5 minuticos antes y le guardamos el turno. ¡Lo esperamos!',
    opciones: ['Agendar turno','¿Cuánto cuesta?','Gracias']
  },
  '¡Me interesa el combo!': {
    msg: 'Ese combo es una joya, parce. Corte + barba por $42.000. Le garantizo que sus amigos no lo reconocen. 😂 ¿Le agendo un turno?',
    opciones: ['Agendar turno','¿Cuándo hay disponibilidad?','Gracias Don Jorge']
  },
  '¿Tienen WhatsApp?': {
    msg: '¡Claro! Al +57 315 234 5678. Me escribe y en el rato le respondo. O si prefiere, llene el formulario de turno aquí en la página.',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  'Ver formulario': {
    msg: '¡Perfecto! El formulario está aquí abajo en la sección "Pedir Turno". Fácil y rápido, como el corte. 😄',
    opciones: ['Gracias Don Jorge'],
    action: () => document.getElementById('cita').scrollIntoView({behavior:'smooth'})
  },
  'Gracias Don Jorge': {
    msg: '¡Con gusto, parce! Lo esperamos. Aquí en la Barbería del Barrio, donde el corte es bueno y la charla es mejor. 🇨🇴✂️',
    opciones: ['¿Puedo preguntar algo más?']
  },
  '¿Puedo preguntar algo más?': {
    msg: '¡Claro que sí, parce! Pregunte sin pena. Para eso estamos.',
    opciones: ['¿Qué cortes hacen?','¿Cuánto vale un fade?','¿Tienen turno hoy?','¿Cómo llego?']
  },
  'Gracias': {
    msg: '¡A la orden! Lo esperamos pronto. ✂️',
    opciones: ['¿Puedo preguntar algo más?']
  },
  'Volver': {
    msg: '¡Claro! ¿En qué más le ayudo?',
    opciones: ['¿Qué cortes hacen?','¿Cuánto vale un fade?','¿Tienen turno hoy?','Agendar turno']
  },
  '¿Cuánto cuesta?': {
    msg: 'El corte clásico $25.000, fade $32.000, combo corte+barba $42.000. ¡Precios del barrio, calidad de concurso!',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¿Hay bus cerca?': {
    msg: '¡Sí! El MIO pasa por la Cra 5 y la 8. Bajando en San Nicolás, a una cuadra estamos. ¡No tiene pérdida, todo el mundo nos conoce!',
    opciones: ['Gracias Don Jorge','Agendar turno']
  },
  '¿Tienen parqueadero?': {
    msg: 'El espacio es pequeñito, pero hay parqueadero público al lado, muy baratico. O puede parquear en la calle sin problema.',
    opciones: ['Gracias Don Jorge','Agendar turno']
  },
  '¿A qué hora cierran?': {
    msg: 'Lunes a sábado hasta las 8 de la noche. Domingos hasta las 2 de la tarde. ¡Y a veces nos quedamos un ratico más si hay clientes!',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¿Cuándo hay disponibilidad?': {
    msg: 'Casi siempre hay espacio el mismo día. Los más ocupados son viernes y sábado. ¡Venga entre semana y lo atendemos volando!',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¡Me lo hago!': {
    msg: '¡Excelente elección, parce! ¿Le agendo el turno?',
    opciones: ['Agendar turno','¿Cuándo hay espacio?','Gracias']
  },
  '¿Cuánto con barba?': {
    msg: 'Fade + barba = $42.000. El combo más pedido del barrio. ¡Precio fijo, calidad premium!',
    opciones: ['¡Ese quiero!','Agendar turno','Gracias']
  },
  '¡Ese combo!': {
    msg: '¡Voy a recomendarle a Sebastián! Él hace ese combo de maravilla. ¿Le agendo el turno?',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¿Y si solo quiero el corte?': {
    msg: 'Claro, parce. El corte clásico $25.000, el fade $32.000. ¡Ambos quedan de primera!',
    opciones: ['Fade please','Corte clásico','Agendar turno']
  },
  '¡Quiero el afeitado!': {
    msg: '¡Una excelente decisión! Con toalla caliente, espuma buena y navaja nueva. 30 minutos de puro lujo por $22.000. Le garantizo que queda re-contento.',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¿Combo con corte?': {
    msg: '¡Corte + barba por $42.000! El favorito del barrio. ¿Cuándo le agendo?',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¡Ese quiero!': {
    msg: '¡Listo parce! El combo queda espectacular. Le agendo el turno de una.',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  'Fade please': {
    msg: '¡Ese fade va a quedar brutal! Sebas o Camilo lo atienden. $32.000 y 45 minutos.',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  'Corte clásico': {
    msg: '¡El clásico nunca falla, parce! Don Jorge lo atiende personalmente. $25.000 y 30 minutos.',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¿Tienen algo más económico?': {
    msg: 'El corte clásico está en $25.000. ¡Es el precio más accesible y queda de primera! Para niños es $18.000.',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¿Hay algo antes?': {
    msg: 'Antes de las 2 está un poco lleno, parce. Pero si llega tempranito a las 8AM sí lo podemos atender. ¿Le queda bien?',
    opciones: ['¡A las 8AM!','Prefiero la tarde','Agendar turno']
  },
  'Prefiero mañana': {
    msg: '¡Perfecto! Mañana hay espacio desde las 9AM. ¿Le agendar un turno?',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  '¡A las 8AM!': {
    msg: '¡Listo parce! Sea el primero del día. Llegue a las 8 en punto y lo atendemos de una. ¡Lo esperamos!',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  'Prefiero la tarde': {
    msg: '¡Perfecto! En la tarde hay buena disponibilidad. ¿Le agendar?',
    opciones: ['Agendar turno','Gracias Don Jorge']
  },
  'Llamar al local': {
    msg: '¡Claro! El número es +57 315 234 5678. ¡Llámeme a cualquier hora que estemos abiertos!',
    opciones: ['Gracias Don Jorge','Agendar turno']
  },
};

const ruletaItems = [
  {nombre:'Corte Clásico',      precio:'$25.000', color:'#4a9a8a', desc:'Tijera y peine. Nunca falla.'},
  {nombre:'Fade',               precio:'$32.000', color:'#c0281a', desc:'Degradado perfecto de la casa.'},
  {nombre:'Combo + Barba',      precio:'$42.000', color:'#2a5a8a', desc:'El paquete completo del barrio.'},
  {nombre:'Perfilada Barba',    precio:'$18.000', color:'#8a5a2a', desc:'Navaja precisa, barba perfecta.'},
  {nombre:'Afeitado Ritual',    precio:'$22.000', color:'#4a6a2a', desc:'Toalla caliente. Un lujo.'},
  {nombre:'Paquete VIP',        precio:'$65.000', color:'#6a2a8a', desc:'El mejor tratamiento del barrio.'},
  {nombre:'Fade + Diseño',      precio:'$38.000', color:'#8a2a2a', desc:'Arte en tu cabeza.'},
  {nombre:'¡Sorpresa!',         precio:'???',     color:'#2a4a2a', desc:'Don Jorge decide. Confíe.'},
];

// ═══════ STATE ═══════
let citaData    = {barbero:null, servicio:null, fecha:null, hora:null, pago:null};
let chatState   = 'inicio';
let radioIdx    = 0;
let radioPlaying= false;
let ruletaSpinning = false;
let ruletaAngle = 0;
let scrollSpeed = 0;
let lastScrollY = 0;
let audioCtx    = null;

const PAY_LABELS = {efectivo:'💵 Efectivo al llegar', nequi:'Nequi — 315 234 5678', daviplata:'Daviplata — 315 234 5678', transfer:'Transferencia / PSE'};

// ═══════ INIT ═══════
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initReveal();
  initNavbar();
  initClock();
  initCalendario();
  initVentilador();
  renderPizarron();
  renderServicios();
  renderFiltros();
  renderGaleria();
  initChat();
  drawRuleta('ruletaCanvas');
  initCitaForm();
  initDateCita();
  animCounters();
  initSoundToggle();
});

// ═══════ LOADER ═══════
function initLoader() {
  const bar = document.getElementById('blBar');
  const msg = document.getElementById('blMsg');
  const msgs = ['Preparando la silla...','Calentando la toalla...','Afilando la navaja...','Poniendo el vallenato...','¡Listo parce!'];
  let i = 0;
  const iv = setInterval(() => {
    if (i >= msgs.length) { clearInterval(iv); setTimeout(enterBarrio, 300); return; }
    if (bar) bar.style.width = ((i + 1) / msgs.length * 100) + '%';
    if (msg) msg.textContent = msgs[i++];
  }, 380);
  setTimeout(enterBarrio, 2200);
}

function enterBarrio() {
  const l = document.getElementById('barrioLoader');
  if (!l || l.classList.contains('hidden')) return;
  l.classList.add('hidden');
  document.getElementById('navBarrio').classList.add('visible');
  document.getElementById('ventilador').classList.add('spinning');
  playSnip();
}

// ═══════ REVEAL ═══════
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.barrio-reveal').forEach(el => obs.observe(el));
}

// ═══════ NAVBAR ═══════
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navBarrio')?.classList.toggle('scrolled', window.scrollY > 60);
    // Ventilador speed based on scroll speed
    const dy = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollSpeed = dy;
    const v = document.getElementById('ventilador');
    if (!v) return;
    if (dy > 10) { v.className = 'ventilador fast'; }
    else if (dy > 3) { v.className = 'ventilador spinning'; }
    else { v.className = 'ventilador slow'; }
  });
  document.getElementById('nbHam')?.addEventListener('click', () => {
    document.getElementById('nbMob').classList.toggle('open');
  });
  // Update "open" sign based on time
  const hour = new Date().getHours();
  const sign = document.getElementById('nbOpenSign');
  if (sign) {
    const isOpen = hour >= 8 && hour < 20;
    sign.textContent = isOpen ? '● ABIERTO' : '○ CERRADO';
    sign.style.color = isOpen ? 'var(--gold2)' : 'rgba(255,100,100,0.8)';
  }
}
function closeMob() { document.getElementById('nbMob').classList.remove('open'); }

// ═══════ CLOCK ═══════
function initClock() {
  function tick() {
    const now = new Date();
    const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds();
    const hDeg = h * 30 + m * 0.5;
    const mDeg = m * 6 + s * 0.1;
    const sDeg = s * 6;
    const hh = document.getElementById('hourHand');
    const mh = document.getElementById('minuteHand');
    const sh = document.getElementById('secondHand');
    if (hh) hh.style.transform = `rotate(${hDeg}deg)`;
    if (mh) mh.style.transform = `rotate(${mDeg}deg)`;
    if (sh) sh.style.transform = `rotate(${sDeg}deg)`;
  }
  tick(); setInterval(tick, 1000);

  // Place clock numbers with JS
  const nums = document.querySelectorAll('.clock-numbers span');
  nums.forEach(span => {
    const n = parseInt(span.style.getPropertyValue('--n') || span.getAttribute('style').match(/--n:(\d+)/)?.[1] || 0);
    const angle = (n * 30 - 90) * Math.PI / 180;
    const r = 38;
    span.style.top  = `calc(50% - 8px + ${Math.sin(angle) * r}px)`;
    span.style.left = `calc(50% - 6px + ${Math.cos(angle) * r}px)`;
    span.style.position = 'absolute';
  });
}

// ═══════ VENTILADOR ═══════
function initVentilador() {
  // Slower after 2 seconds idle
  let timer;
  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      document.getElementById('ventilador').className = 'ventilador slow';
    }, 2000);
  });
}

// ═══════ CALENDARIO ═══════
function initCalendario() {
  const now = new Date();
  const meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  const grid = document.getElementById('calGrid');
  const monthEl = document.getElementById('calMonth');
  if (!grid || !monthEl) return;
  monthEl.textContent = meses[now.getMonth()];
  const dias = ['D','L','M','X','J','V','S'];
  grid.innerHTML = dias.map(d => `<div class="cal-day-name" style="color:${d==='D'?'var(--rojo-poker)':'var(--ink)'}">${d}</div>`).join('');
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  for (let i = 0; i < firstDay; i++) grid.innerHTML += `<div class="cal-day empty">·</div>`;
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const isSun = new Date(now.getFullYear(), now.getMonth(), d).getDay() === 0;
    const isToday = d === now.getDate();
    grid.innerHTML += `<div class="cal-day ${isToday ? 'today' : ''} ${isSun ? 'sunday' : ''}">${d}</div>`;
  }
}

// ═══════ RADIO ═══════
function changeStation(dir) {
  radioIdx = (radioIdx + dir + estaciones.length) % estaciones.length;
  const s = estaciones[radioIdx];
  const el = document.getElementById('rdFreq');
  const sn = document.getElementById('rdStation');
  const rs = document.getElementById('radioSong');
  const n = document.getElementById('radioNeedle');
  if (el) el.textContent = s.freq;
  if (sn) sn.textContent = s.nombre;
  if (rs) rs.textContent = s.song;
  if (n) n.style.left = (radioIdx / estaciones.length * 90) + '%';
  playClick();
  showToast(`📻 ${s.nombre} — ${s.freq}`);
}

function toggleRadio() {
  radioPlaying = !radioPlaying;
  const btn = document.getElementById('rbPlay');
  if (btn) btn.textContent = radioPlaying ? '⏸' : '▶';
  playRadioBeep(radioPlaying);
  if (radioPlaying) {
    showToast(`📻 ${estaciones[radioIdx].nombre} · ${estaciones[radioIdx].song}`);
  }
}

// ═══════ PIZARRÓN ═══════
function renderPizarron() {
  const p = document.getElementById('pizarron');
  if (!p) return;
  const featured = servicios.slice(0, 6);
  p.innerHTML = featured.map((s, i) => `
    <div class="pz-item">
      <span class="pz-name">${s.icono} ${s.nombre}</span>
      <span class="pz-price">${s.precio}</span>
    </div>
    ${i < featured.length - 1 && i % 3 === 2 ? '<div class="pz-divider"></div>' : ''}`
  ).join('');
}

// ═══════ SERVICIOS ═══════
function renderFiltros() {
  const cats = ['Todos', ...new Set(servicios.map(s => s.cat))];
  const cont = document.getElementById('tiendaFilters');
  if (!cont) return;
  cont.innerHTML = cats.map((c, i) =>
    `<button class="tf-btn ${c === 'Todos' ? 'active' : ''}" onclick="filtrarServicio('${c}',this)">${i===0?'✂ ':''  }${c}</button>`
  ).join('');
}

function renderServicios(filter = 'Todos') {
  const grid = document.getElementById('fotosGrid');
  if (!grid) return;
  const list = filter === 'Todos' ? servicios : servicios.filter(s => s.cat === filter);
  grid.innerHTML = list.map((s, i) => `
    <div class="foto-card barrio-reveal" style="transition-delay:${i * 0.05}s">
      ${s.nuevo ? '<div class="fc-nuevo">¡Nuevo!</div>' : ''}
      <div class="fc-numero">Nº ${String(s.id).padStart(2, '0')}</div>
      <span class="fc-icono">${s.icono}</span>
      <h3>${s.nombre}</h3>
      <p>${s.desc}</p>
      <div class="fc-foot">
        <div>
          <div class="fc-precio">${s.precio}</div>
          <div style="font-size:0.62rem;color:var(--text-l);font-family:'Kalam',cursive">${s.dur}</div>
        </div>
        <div class="fc-tags">${s.tags.map(t => `<span class="fc-tag">${t}</span>`).join('')}</div>
      </div>
    </div>`).join('');
  setTimeout(() => initReveal(), 80);
}

function filtrarServicio(cat, btn) {
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderServicios(cat);
  playClick();
}

// ═══════ GALERÍA ═══════
function renderGaleria() {
  const grid = document.getElementById('albumGrid');
  if (!grid) return;
  grid.innerHTML = galerias.map((g, i) => `
    <div class="album-foto barrio-reveal" style="--rot:${g.rot}deg;transition-delay:${i * 0.07}s">
      <div class="af-img">${buildAlbumSVG(g)}</div>
      <div class="af-caption"><strong>${g.titulo}</strong><br/>${g.desc}</div>
    </div>`).join('');
  setTimeout(() => initReveal(), 80);
}

function buildAlbumSVG(g) {
  const svgs = {
    foto1: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="#c8b090"/>
      <rect x="10" y="10" width="220" height="160" fill="#d4bea0" stroke="rgba(0,0,0,0.1)" stroke-width="0.5"/>
      <!-- Old photo: barber silhouette -->
      <ellipse cx="120" cy="70" rx="30" ry="32" fill="#5a3a14"/>
      <path d="M70 180 C70 140 85 125 120 122 C155 125 170 140 170 180Z" fill="#3a2210"/>
      <!-- Scissors -->
      <line x1="95" y1="115" x2="145" y2="85" stroke="#8b6914" stroke-width="3"/>
      <line x1="95" y1="115" x2="120" y2="95" stroke="#8b6914" stroke-width="3"/>
      <text x="120" y="168" text-anchor="middle" font-family="'Kalam',cursive" font-size="11" fill="rgba(58,34,16,0.6)">Don Jorge · 1989</text>
    </svg>`,
    fachada: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="#c8d4b0"/>
      <!-- Building facade -->
      <rect x="30" y="40" width="180" height="130" fill="#d4c890"/>
      <rect x="30" y="40" width="180" height="20" fill="#4a9a8a"/>
      <text x="120" y="55" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="12" fill="white" letter-spacing="2">BARBERÍA DEL BARRIO</text>
      <!-- Door -->
      <rect x="95" y="100" width="50" height="70" rx="2" fill="#6b3a14"/>
      <rect x="95" y="100" width="50" height="70" rx="2" fill="none" stroke="#8b5a24" stroke-width="1"/>
      <!-- Window -->
      <rect x="40" y="80" width="60" height="50" rx="2" fill="#a0c0d0" stroke="#6b3a14" stroke-width="1.5"/>
      <rect x="160" y="80" width="60" height="50" rx="2" fill="#a0c0d0" stroke="#6b3a14" stroke-width="1.5"/>
      <!-- Barber pole -->
      <rect x="26" y="55" width="8" height="80" rx="4" fill="white" stroke="#8b3a14" stroke-width="0.5"/>
      <rect x="26" y="55" width="8" height="80" rx="4" fill="url(#poleGrad)" opacity="0.8"/>
      <defs><linearGradient id="poleGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c0281a"/><stop offset="33%" stop-color="white"/><stop offset="66%" stop-color="#1a5a8a"/><stop offset="100%" stop-color="#c0281a"/></linearGradient></defs>
    </svg>`,
    fade: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="#e0d0b0"/>
      <!-- Head with fade illustration -->
      <ellipse cx="120" cy="80" rx="55" ry="60" fill="#5a3a14"/>
      <!-- Fade gradient -->
      <ellipse cx="120" cy="80" rx="55" ry="60" fill="url(#fadeGrad)" opacity="0.7"/>
      <!-- Face area -->
      <ellipse cx="120" cy="85" rx="40" ry="44" fill="#7a5030"/>
      <!-- Eyes -->
      <ellipse cx="106" cy="78" rx="5" ry="4" fill="#1a1208"/>
      <ellipse cx="134" cy="78" rx="5" ry="4" fill="#1a1208"/>
      <!-- Smile -->
      <path d="M106 97 Q120 105 134 97" fill="none" stroke="#1a1208" stroke-width="2"/>
      <!-- Scissors on side -->
      <text x="190" y="100" font-size="28" fill="rgba(74,154,138,0.5)">✂</text>
      <defs><linearGradient id="fadeGrad" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#e8d4b0" stop-opacity="0.8"/><stop offset="40%" stop-color="#e8d4b0" stop-opacity="0"/></linearGradient></defs>
      <text x="120" y="165" text-anchor="middle" font-family="'Kalam',cursive" font-size="11" fill="rgba(58,34,16,0.5)">Obra maestra de Sebas</text>
    </svg>`,
    equipo: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="#c0d4c0"/>
      ${[40,80,120,160,200].map((x, i) => `
        <ellipse cx="${x}" cy="80" rx="20" ry="22" fill="#${['5a3a14','7a5030','6a4020','8a6040','4a2a08'][i]}"/>
        <path d="M${x - 22} 150 C${x - 22} 125 ${x - 12} 115 ${x} 113 C${x + 12} 115 ${x + 22} 125 ${x + 22} 150Z" fill="#${['3a2210','5a3818','4a2c10','6a4828','2a1808'][i]}"/>
        <text x="${x}" y="170" text-anchor="middle" font-size="8" fill="rgba(26,18,8,0.4)" font-family="'Kalam',cursive">${['JJ','Sebas','Vale','Cami','Feli'][i]}</text>
      `).join('')}
      <text x="120" y="165" text-anchor="middle" font-family="'Kalam',cursive" font-size="10" fill="rgba(58,34,16,0.6)" style="display:none">El equipo completo</text>
    </svg>`,
    navaja: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="#d4c8a0"/>
      <!-- Straight razor illustration -->
      <g transform="rotate(-20 120 90)">
        <rect x="60" y="60" width="130" height="28" rx="4" fill="#8b6914"/>
        <rect x="60" y="63" width="85" height="22" rx="2" fill="#c8a030"/>
        <rect x="145" y="60" width="45" height="28" rx="3" fill="#6b4a10"/>
        <rect x="62" y="78" width="130" height="3" rx="1" fill="rgba(200,160,48,0.4)"/>
        <line x1="63" y1="64" x2="63" y2="86" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      </g>
      <text x="120" y="160" text-anchor="middle" font-family="'Kalam',cursive" font-size="11" fill="rgba(58,34,16,0.6)">30 años de filo</text>
    </svg>`,
    colombia: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="#003087"/>
      <rect x="0" y="0" width="240" height="60" fill="#ffd700"/>
      <rect x="0" y="60" width="240" height="30" fill="#003087"/>
      <rect x="0" y="90" width="240" height="30" fill="#c8102e"/>
      <rect x="0" y="120" width="240" height="60" fill="#003087"/>
      <text x="120" y="145" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="18" fill="white" letter-spacing="2">COLOMBIA</text>
      <text x="120" y="162" text-anchor="middle" font-family="'Kalam',cursive" font-size="10" fill="rgba(255,255,255,0.7)">La vitrina del barrio · 2001</text>
      <text x="120" y="78" text-anchor="middle" font-size="28">⚽</text>
    </svg>`,
  };
  return svgs[g.tipo] || svgs.foto1;
}

// ═══════ CHAT DON JORGE ═══════
function initChat() {
  addMessage('jorge', chatScript.inicio.msg);
  renderQuickReplies(chatScript.inicio.opciones);
}

function addMessage(from, text) {
  const cont = document.getElementById('cwMessages');
  if (!cont) return;
  const div = document.createElement('div');
  div.className = `cw-msg ${from}`;
  const now = new Date();
  div.innerHTML = `${text}<span class="cw-msg-time">${pad(now.getHours())}:${pad(now.getMinutes())}</span>`;
  cont.appendChild(div);
  cont.scrollTop = cont.scrollHeight;
}

function renderQuickReplies(opts) {
  const cont = document.getElementById('cwQuickReplies');
  if (!cont) return;
  cont.innerHTML = opts.map(o =>
    `<button class="cqr-btn" onclick="quickReply('${o.replace(/'/g, "\\'")}')">${o}</button>`
  ).join('');
}

function quickReply(text) {
  addMessage('user', text);
  document.getElementById('cwQuickReplies').innerHTML = '';
  const typing = document.getElementById('cwTyping');
  if (typing) typing.style.display = 'block';
  setTimeout(() => {
    if (typing) typing.style.display = 'none';
    const response = chatScript[text] || chatScript['Volver'];
    addMessage('jorge', response.msg);
    renderQuickReplies(response.opciones || []);
    if (response.action) response.action();
  }, 800 + Math.random() * 600);
  playClick();
}

function sendChat() {
  const inp = document.getElementById('cwInput');
  if (!inp || !inp.value.trim()) return;
  const text = inp.value.trim();
  inp.value = '';
  addMessage('user', text);
  const typing = document.getElementById('cwTyping');
  if (typing) typing.style.display = 'block';
  setTimeout(() => {
    if (typing) typing.style.display = 'none';
    // Simple keyword matching
    const lower = text.toLowerCase();
    let response;
    if (lower.includes('precio') || lower.includes('cuánto') || lower.includes('vale'))
      response = chatScript['¿Cuánto vale un fade?'];
    else if (lower.includes('turno') || lower.includes('cita') || lower.includes('agendar'))
      response = chatScript['Agendar turno'];
    else if (lower.includes('dónde') || lower.includes('llego') || lower.includes('dirección'))
      response = chatScript['¿Cómo llego?'];
    else if (lower.includes('hola') || lower.includes('buenos') || lower.includes('buenas'))
      response = chatScript.inicio;
    else if (lower.includes('gracias'))
      response = chatScript['Gracias Don Jorge'];
    else
      response = {msg:'Uy parce, no entendí bien. ¿Me repite? O use los botoncitos de abajo que son más fácil. 😄', opciones:chatScript.inicio.opciones};
    addMessage('jorge', response.msg);
    renderQuickReplies(response.opciones || chatScript.inicio.opciones);
  }, 1000 + Math.random() * 800);
}

// ═══════ RULETA ═══════
function drawRuleta(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 6;
  const slice = (Math.PI * 2) / ruletaItems.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ruletaItems.forEach((item, i) => {
    const start = i * slice + ruletaAngle;
    const end = start + slice;
    // Slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + slice / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = `bold ${canvas.width < 320 ? 10 : 12}px 'Bebas Neue', sans-serif`;
    ctx.fillText(item.nombre, r - 8, 4);
    ctx.restore();
  });
  // Center circle
  ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2);
  ctx.fillStyle = 'var(--crema)'; ctx.fill();
  ctx.strokeStyle = 'var(--madera)'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = 'var(--verde-agua)';
  ctx.font = "bold 18px 'Bebas Neue'";
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('✂', cx, cy);
}

function spinRuleta() {
  if (ruletaSpinning) return;
  const canvasId = 'ruletaCanvas';
  const resultId  = 'ruletaResult';
  const svcId     = 'rrService';
  const priceId   = 'rrPrice';
  const descId    = 'rrDesc';
  doSpin(canvasId, resultId, svcId, priceId, descId);
}
function spinRuleta2() {
  if (ruletaSpinning) return;
  doSpin('ruletaCanvas2', 'rr2Result', 'rr2Service', 'rr2Price', null);
}

function doSpin(canvasId, resultId, svcId, priceId, descId) {
  ruletaSpinning = true;
  const btn1 = document.getElementById('ruletaBtn');
  const btn2 = document.getElementById('ruletaBtn2');
  if (btn1) btn1.disabled = true;
  if (btn2) btn2.disabled = true;
  document.getElementById(resultId).style.display = 'none';

  const totalRotation = (Math.PI * 2) * (5 + Math.random() * 5) + Math.random() * Math.PI * 2;
  const duration = 3500 + Math.random() * 1000;
  let start = null;
  const initialAngle = ruletaAngle;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function frame(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    ruletaAngle = initialAngle + totalRotation * easeOut(progress);
    drawRuleta(canvasId);
    if (progress < 1) { requestAnimationFrame(frame); }
    else {
      ruletaSpinning = false;
      if (btn1) btn1.disabled = false;
      if (btn2) btn2.disabled = false;
      // Determine winner
      const normalAngle = ruletaAngle % (Math.PI * 2);
      const slice = (Math.PI * 2) / ruletaItems.length;
      // Arrow points up (3π/2), find which slice is under arrow
      const arrowAngle = (Math.PI * 3 / 2 - normalAngle + Math.PI * 2) % (Math.PI * 2);
      const idx = Math.floor(arrowAngle / slice) % ruletaItems.length;
      const winner = ruletaItems[idx];
      setT(svcId, winner.nombre);
      setT(priceId, winner.precio);
      if (descId) setT(descId, winner.desc);
      document.getElementById(resultId).style.display = 'block';
      playWin();
    }
  }
  requestAnimationFrame(frame);
  playSpinSound();
}

function openRuleta() { document.getElementById('modalRuleta').classList.add('open'); drawRuleta('ruletaCanvas2'); }

// ═══════ CITA / BOOKING ═══════
function initCitaForm() {
  const bp = document.getElementById('barberoPick');
  if (bp) {
    bp.innerHTML = barberos.map(b => `
      <div class="bp-card" id="bpc_${b.id}" onclick="pickBarbero(${b.id})">
        <h4>✂ ${b.nombre}</h4>
        <p>${b.rol}</p>
        <p style="font-size:0.58rem;margin-top:4px;color:${b.disponible?'green':'gray'};font-family:'Kalam',cursive">
          ${b.disponible ? '🟢 Disponible hoy' : '⚫ No disponible'}
        </p>
      </div>`).join('');
  }
  const sp = document.getElementById('servicioPick');
  if (sp) {
    sp.innerHTML = servicios.map(s => `
      <div class="sp-card" id="spc_${s.id}" onclick="pickServicio(${s.id})">
        <h4>${s.icono} ${s.nombre}</h4>
        <div class="spc-precio">${s.precio}</div>
        <p>${s.dur} · ${s.cat}</p>
      </div>`).join('');
  }
  // Factura number
  const num = document.getElementById('fhnNum');
  if (num) num.textContent = String(Math.floor(Math.random() * 9000) + 1000);
}

function pickBarbero(id) {
  citaData.barbero = barberos.find(b => b.id === id);
  document.querySelectorAll('.bp-card').forEach(c => c.classList.remove('sel'));
  document.getElementById('bpc_' + id)?.classList.add('sel');
  setT('tt-barbero', citaData.barbero.nombre);
  playClick(); goPaso(2);
}

function pickServicio(id) {
  citaData.servicio = servicios.find(s => s.id === id);
  document.querySelectorAll('.sp-card').forEach(c => c.classList.remove('sel'));
  document.getElementById('spc_' + id)?.classList.add('sel');
  setT('tt-servicio', citaData.servicio.nombre);
  setT('tt-precio', citaData.servicio.precio);
  const total = document.getElementById('fpTotal');
  const totalVal = document.getElementById('fpTotalVal');
  if (total) total.style.display = 'flex';
  if (totalVal) totalVal.textContent = citaData.servicio.precio;
  playClick(); goPaso(3);
}

function initDateCita() {
  const inp = document.getElementById('citaFecha');
  if (!inp) return;
  inp.min = new Date().toISOString().split('T')[0];
  inp.addEventListener('change', () => {
    citaData.fecha = inp.value;
    const d = new Date(inp.value + 'T12:00:00');
    setT('tt-fecha', d.toLocaleDateString('es-CO', {weekday:'short',day:'numeric',month:'short'}));
    renderHorarios(inp.value);
  });
  document.getElementById('citaFecha')?.addEventListener('change', () => {});
}

function renderHorarios(dateStr) {
  const cont = document.getElementById('horariosGrid');
  if (!cont) return;
  const d = new Date(dateStr + 'T12:00:00'), day = d.getDay();
  const open = 8, close = day === 0 ? 14 : 20;
  const taken = ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'];
  const slots = [];
  for (let h = open; h < close; h++) {
    slots.push(pad(h) + ':00');
    if (h + 0.5 < close) slots.push(pad(h) + ':30');
  }
  cont.innerHTML = slots.map(s =>
    `<button class="hg-btn ${taken.includes(s) ? 'taken' : ''}" onclick="pickHora('${s}',this)">${s}</button>`
  ).join('');
}

function pickHora(t, el) {
  document.querySelectorAll('.hg-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
  citaData.hora = t;
  setT('tt-hora', t);
  playClick(); goPaso(4);
}

function goPaso(n) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('fp' + i);
    if (el) el.classList.toggle('active', i === n);
  }
}

function selPago(method, el) {
  citaData.pago = method;
  document.querySelectorAll('.pf-opt').forEach(o => o.style.borderColor = '');
  el.style.borderColor = 'var(--verde-agua)';
  const row = document.getElementById('pfCopyRow');
  const lbl = document.getElementById('pfCopyLabel');
  if (method === 'nequi' || method === 'daviplata') {
    if (row) row.style.display = 'flex';
    if (lbl) lbl.textContent = method === 'nequi' ? 'Número Nequi:' : 'Número Daviplata:';
  } else {
    if (row) row.style.display = 'none';
  }
  const msgs = {efectivo:'Pague en efectivo al llegar al local.',nequi:'Transfiera antes de la cita y traiga el comprobante.',daviplata:'Transfiera antes de la cita y traiga el comprobante.',transfer:'Le enviamos los datos por WhatsApp.'};
  const msg = document.getElementById('pfMsg');
  if (msg) msg.textContent = msgs[method] || '';
  setT('tt-pago', PAY_LABELS[method]);
  playClick();
}

function copyPago() {
  navigator.clipboard.writeText('3152345678').then(() => {
    showToast('📋 Número copiado');
  }).catch(() => showToast('Número: 315 234 5678'));
}

function confirmarCita() {
  const nombre = document.getElementById('citaNombre')?.value.trim();
  const tel    = document.getElementById('citaTelefono')?.value.trim();
  if (!citaData.barbero)  { showToast('✂ Seleccione un barbero'); return; }
  if (!citaData.servicio) { showToast('✂ Seleccione un servicio'); return; }
  if (!citaData.fecha || !citaData.hora) { showToast('✂ Seleccione fecha y hora'); return; }
  if (!nombre || !tel) { showToast('✂ Complete su nombre y teléfono'); return; }
  if (!citaData.pago) { showToast('✂ Seleccione la forma de pago'); return; }

  const d = new Date(citaData.fecha + 'T12:00:00');
  const fechaStr = d.toLocaleDateString('es-CO', {weekday:'long',day:'numeric',month:'long'});

  document.getElementById('mbTicket').innerHTML = `
    <strong>✂ Barbero:</strong> ${citaData.barbero.nombre}<br/>
    <strong>✂ Servicio:</strong> ${citaData.servicio.nombre}<br/>
    <strong>✂ Precio:</strong> ${citaData.servicio.precio}<br/>
    <strong>✂ Fecha:</strong> ${fechaStr}<br/>
    <strong>✂ Hora:</strong> ${citaData.hora}<br/>
    <strong>✂ Pago:</strong> ${PAY_LABELS[citaData.pago]}<br/>
    <br/>
    <em>Le confirmaremos al ${tel}. ¡Gracias ${nombre}!</em>
  `;
  document.getElementById('modalTurno').classList.add('open');
  playWin();
}

function cerrarModal() {
  document.getElementById('modalTurno').classList.remove('open');
  citaData = {barbero:null, servicio:null, fecha:null, hora:null, pago:null};
  document.querySelectorAll('.bp-card,.sp-card,.hg-btn').forEach(c => c.classList.remove('sel'));
  document.querySelectorAll('.pf-opt').forEach(o => o.style.borderColor = '');
  ['citaNombre','citaTelefono','citaCorreo','citaNota','citaFecha'].forEach(id => {const el = document.getElementById(id); if(el) el.value = '';});
  document.getElementById('horariosGrid').innerHTML = '<p class="barrio-hint">Seleccione una fecha, pues...</p>';
  const row = document.getElementById('pfCopyRow'); if(row) row.style.display = 'none';
  const msg = document.getElementById('pfMsg'); if(msg) msg.textContent = '';
  ['tt-barbero','tt-servicio','tt-precio','tt-fecha','tt-hora','tt-pago'].forEach(id => setT(id, '—'));
  goPaso(1);
}

// ═══════ COUNTERS ═══════
function animCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseInt(el.dataset.target);
      let cur = 0; const step = Math.ceil(target / 60);
      const iv = setInterval(() => {cur = Math.min(cur + step, target); el.textContent = cur.toLocaleString('es-CO'); if (cur >= target) clearInterval(iv);}, 25);
      obs.unobserve(el);
    });
  }, {threshold:0.3});
  document.querySelectorAll('[data-target]').forEach(el => obs.observe(el));
}

// ═══════ SOUND ═══════
function initSoundToggle() {
  document.getElementById('soundToggle')?.addEventListener('click', () => {
    const icon = document.getElementById('soundIcon');
    if (icon) { icon.textContent = icon.textContent === '🔇' ? '🔊' : '🔇'; }
    playClick();
  });
}
function getCtx() { if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; } } return audioCtx; }

function playClick() {
  const ctx = getCtx(); if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = 'sine'; o.frequency.value = 600;
  g.gain.setValueAtTime(0.04, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
  o.start(); o.stop(ctx.currentTime + 0.09);
}

function playSnip() {
  const ctx = getCtx(); if (!ctx) return;
  [800, 600, 900].forEach((f, i) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.1);
    o.start(ctx.currentTime + i * 0.08); o.stop(ctx.currentTime + i * 0.08 + 0.15);
  });
}

function playWin() {
  const ctx = getCtx(); if (!ctx) return;
  [523, 659, 784, 1047, 1319].forEach((f, i) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.4);
    o.start(ctx.currentTime + i * 0.1); o.stop(ctx.currentTime + i * 0.1 + 0.5);
  });
}

function playSpinSound() {
  const ctx = getCtx(); if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(300, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 3.5);
  g.gain.setValueAtTime(0.03, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8);
  o.start(); o.stop(ctx.currentTime + 4);
}

function playRadioBeep(on) {
  const ctx = getCtx(); if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.frequency.value = on ? 880 : 440;
  g.gain.setValueAtTime(0.05, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  o.start(); o.stop(ctx.currentTime + 0.2);
}

// ═══════ TOAST ═══════
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;right:24px;background:var(--verde-agua);color:white;font-family:'Kalam',cursive;font-size:0.85rem;padding:12px 18px;z-index:9999;box-shadow:3px 3px 0 var(--madera);border:2px solid var(--madera);max-width:280px;line-height:1.4`;
  t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; }, 2300);
  setTimeout(() => t.remove(), 2800);
}

// ═══════ UTILS ═══════
function setT(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }
