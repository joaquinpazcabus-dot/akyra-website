// ============================================
// AKYRA — Componentes e interacciones
// Navbar · animaciones · musica opcional · formularios · eventos
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Navbar movil ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Animaciones de entrada ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ---------- Musica de fondo (opcional, apagada por defecto) ----------
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
if (music && musicToggle) {
  music.volume = 0.35;
  musicToggle.addEventListener('click', async () => {
    if (music.paused) {
      try {
        await music.play();
        musicToggle.classList.add('playing');
        musicToggle.setAttribute('aria-pressed', 'true');
        musicToggle.setAttribute('aria-label', 'Silenciar musica de fondo');
      } catch (err) {
        console.warn('[AKYRA] No se pudo reproducir la musica:', (err && err.message) || err);
      }
    } else {
      music.pause();
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Activar musica de fondo');
    }
  });
}

function akEmailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

// ---------- Formulario de contacto ----------
const form = document.getElementById('contactForm');
if (form) {
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const setStatus = (m, t) => { formStatus.textContent = m; formStatus.className = 'form-status ' + (t || ''); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lead = {
      name: form.user_name.value,
      email: form.user_email.value,
      company: form.user_company.value,
      message: form.message.value,
    };
    if (!lead.name.trim()) return setStatus('Ingresa tu nombre.', 'error');
    if (!akEmailOk(lead.email)) return setStatus('Ingresa un email valido.', 'error');
    if (!lead.message.trim()) return setStatus('Contanos en que te podemos ayudar.', 'error');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    setStatus('', '');

    const [emailResult, dbResult] = await Promise.all([sendLeadEmail(lead), saveLead(lead)]);

    submitBtn.disabled = false;
    submitBtn.textContent = 'Quiero mi Escaneo';

    if (emailResult.ok || dbResult.ok) {
      setStatus('Mensaje enviado. Te responde un socio dentro de las proximas 24 h habiles.', 'success');
      form.reset();
    } else {
      setStatus('No pudimos enviar el mensaje. Escribinos directo a akyraconsultora@gmail.com', 'error');
    }
  });
}

// ---------- Eventos (render desde eventos.js) ----------
(function () {
  if (typeof AKYRA_EVENTOS === 'undefined') return;
  const grid = document.getElementById('eventosGrid');
  const section = document.getElementById('eventos');
  const navItem = document.getElementById('navEventos');
  if (!grid || !section) return;

  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const parse = (f) => { if (!f) return null; const d = new Date(f + 'T00:00:00'); return isNaN(d) ? null : d; };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const eventos = AKYRA_EVENTOS
    .filter((e) => e && e.visible !== false)
    .filter((e) => { const d = parse(e.fecha); return !d || d >= hoy; })
    .sort((a, b) => { const da = parse(a.fecha), db = parse(b.fecha); if (!da) return 1; if (!db) return -1; return da - db; });

  if (!eventos.length) return;

  grid.innerHTML = eventos.map((e) => {
    const badge = e.destacado ? '<span class="evento-badge">Destacado</span>' : '';
    const lugar = e.lugar ? '<span class="evento-lugar">' + esc(e.lugar) + '</span>' : '';
    const cta = e.cta_link ? '<a class="btn btn-primary" href="' + esc(e.cta_link) + '">' + esc(e.cta_texto || 'Mas info') + '</a>' : '';
    return '<article class="evento' + (e.destacado ? ' evento-destacado' : '') + '">' +
      badge +
      '<span class="evento-fecha">' + esc(e.fechaTexto || e.fecha || '') + '</span>' +
      '<h3>' + esc(e.titulo) + '</h3>' +
      lugar +
      '<p>' + esc(e.descripcion || '') + '</p>' +
      cta +
      '</article>';
  }).join('');

  section.hidden = false;
  if (navItem) navItem.hidden = false;

  const cursoInsc = eventos.find((e) => e.inscripcion);
  const inscSec = document.getElementById('inscripcion-curso');
  if (cursoInsc && inscSec) {
    inscSec.hidden = false;
    const t = document.getElementById('inscTitulo');
    if (t) t.textContent = 'Inscribite: ' + cursoInsc.titulo;
  }

})();

// ---------- Formulario de inscripcion a curso (Supabase + email) ----------
(function () {
  const f = document.getElementById('inscForm');
  if (!f) return;
  const btn = document.getElementById('inscBtn');
  const st = document.getElementById('inscStatus');
  const set = (m, t) => { st.textContent = m; st.className = 'form-status ' + (t || ''); };

  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = f.user_name.value.trim();
    const email = f.user_email.value.trim();
    const tel = f.user_phone.value.trim();
    const emp = f.user_company.value.trim();
    if (!nombre) return set('Ingresa tu nombre.', 'error');
    if (!akEmailOk(email)) return set('Ingresa un email valido.', 'error');
    if (!tel) return set('Dejanos un WhatsApp para confirmarte.', 'error');

    const tEl = document.getElementById('inscTitulo');
    const titulo = (tEl && tEl.textContent) || 'Curso de IA';
    const lead = { name: nombre, email: email, company: emp, message: 'INSCRIPCION - ' + titulo + ' - WhatsApp: ' + tel };

    btn.disabled = true; btn.textContent = 'Enviando...'; set('', '');
    const [db, em] = await Promise.all([
      (typeof saveLead === 'function') ? saveLead(lead) : Promise.resolve({ ok: false }),
      (typeof sendLeadEmail === 'function') ? sendLeadEmail(lead) : Promise.resolve({ ok: false })
    ]);
    btn.disabled = false; btn.textContent = 'Reservar mi lugar';

    if (db.ok || em.ok) { set('Listo! Te reservamos el lugar. Te escribimos con los detalles.', 'success'); f.reset(); }
    else { set('No pudimos registrar la inscripcion. Escribinos a akyraconsultora@gmail.com', 'error'); }
  });
})();
