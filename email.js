// ============================================
// AKYRA — Cliente EmailJS
// Envía el formulario a akyraconsultora@gmail.com
// ============================================

if (AKYRA_CONFIG.isConfigured.emailjs && window.emailjs) {
  emailjs.init({ publicKey: AKYRA_CONFIG.emailjs.publicKey });
}

/**
 * Envía el email de contacto vía EmailJS.
 * Template "Contact Us" de EmailJS — fields: name, email, title, message, time
 * @param {{name: string, email: string, company: string, message: string}} lead
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
async function sendLeadEmail(lead) {
  if (!AKYRA_CONFIG.isConfigured.emailjs || !window.emailjs) {
    console.warn('[AKYRA] EmailJS no configurado — email no enviado.');
    return { ok: false, error: 'EmailJS no configurado' };
  }
  try {
    await emailjs.send(
      AKYRA_CONFIG.emailjs.serviceId,
      AKYRA_CONFIG.emailjs.templateId,
      {
        name: lead.name,
        email: lead.email,
        title: lead.company || 'Sin empresa',
        message: lead.message,
        time: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Mendoza' }),
      }
    );
    return { ok: true };
  } catch (err) {
    console.error('[AKYRA] Error al enviar email:', err);
    return { ok: false, error: err?.text || 'Error de envío' };
  }
}
