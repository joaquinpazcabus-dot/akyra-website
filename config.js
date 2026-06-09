// ============================================
// AKYRA — Configuración
// Reemplazar los placeholders con las credenciales reales.
// En producción (Vercel) se pueden inyectar en build, pero
// como las anon keys de Supabase y la public key de EmailJS
// son públicas por diseño, pueden ir acá directamente.
// ============================================

const AKYRA_CONFIG = {
  supabase: {
    url: 'https://iczaljxvhykzoehkdzmj.supabase.co',
    anonKey: 'sb_publishable_2InFi9Pmihv-JwYQ2sA5SQ_VefUYBdG',
  },
  emailjs: {
    serviceId: 'service_mls5rhc',
    templateId: 'template_pg6jgth',
    publicKey: 'X34jZYeeU9u0W7hB8',
  },
};

// Marca si las credenciales todavía son placeholders
AKYRA_CONFIG.isConfigured = {
  supabase: !AKYRA_CONFIG.supabase.url.includes('TU_PROYECTO'),
  emailjs: !AKYRA_CONFIG.emailjs.serviceId.includes('TU_SERVICE'),
};
