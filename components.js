// ============================================
// AKYRA — Componentes e interacciones
// Navbar móvil · animaciones de entrada · formulario
// ============================================

// ---------- Año en footer ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Navbar móvil ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Cerrar menú al navegar
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Animaciones de entrada ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ---------- Formulario de contacto ----------
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = 'form-status ' + (type || '');
}

function validateForm(lead) {
  if (!lead.name.trim()) return 'Ingresá tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return 'Ingresá un email válido.';
  if (!lead.message.trim()) return 'Contanos en qué te podemos ayudar.';
  return null;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const lead = {
    name: form.user_name.value,
    email: form.user_email.value,
    company: form.user_company.value,
    message: form.message.value,
  };

  const validationError = validateForm(lead);
  if (validationError) {
    setStatus(validationError, 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';
  setStatus('', '');

  // Enviar email y guardar lead en paralelo
  const [emailResult, dbResult] = await Promise.all([
    sendLeadEmail(lead),
    saveLead(lead),
  ]);

  submitBtn.disabled = false;
  submitBtn.textContent = 'Enviar mensaje';

  if (emailResult.ok || dbResult.ok) {
    setStatus('Mensaje enviado. Te respondemos dentro de las próximas 24 h hábiles.', 'success');
    form.reset();
  } else {
    setStatus('No pudimos enviar el mensaje. Escribinos directo a akyraconsultora@gmail.com', 'error');
  }
});
