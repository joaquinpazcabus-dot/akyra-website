// ============================================
// AKYRA — Configuración
// Reemplazar los placeholders con las credenciales reales.
// En producción (Vercel) se pueden inyectar en build, pero
// como las anon keys de Supabase y la public key de EmailJS
// son públicas por diseño, pueden ir acá directamente.
// ============================================

const AKYRA_CONFIG = {
  supabase: {
    url: 'https://TU_PROYECTO.supabase.co',        // ← SUPABASE_URL
    anonKey: 'TU_SUPABASE_ANON_KEY',               // ← SUPABASE_ANON_KEY
  },
  emailjs: {
    serviceId: 'TU_SERVICE_ID',                    // ← EMAILJS_SERVICE_ID
    templateId: 'TU_TEMPLATE_ID',                  // ← EMAILJS_TEMPLATE_ID
    publicKey: 'TU_PUBLIC_KEY',                    // ← EMAILJS_PUBLIC_KEY
  },
};

// Marca si las credenciales todavía son placeholders
AKYRA_CONFIG.isConfigured = {
  supabase: !AKYRA_CONFIG.supabase.url.includes('TU_PROYECTO'),
  emailjs: !AKYRA_CONFIG.emailjs.serviceId.includes('TU_SERVICE'),
};
