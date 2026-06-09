// ============================================
// AKYRA — Cliente EmailJS
// Envía el formulario a akyraconsultora@gmail.com
// ============================================

if (AKYRA_CONFIG.isConfigured.emailjs && window.emailjs) {
  emailjs.init({ publicKey: AKYRA_CONFIG.emailjs.publicKey });
}

/**
 * Envía el email de contacto vía EmailJS.
 * Template fields: user_name, user_email, user_company, message
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
        user_name: lead.name,
        user_email: lead.email,
        user_company: lead.company || '—',
        message: lead.message,
      }
    );
    return { ok: true };
  } catch (err) {
    console.error('[AKYRA] Error al enviar email:', err);
    return { ok: false, error: err?.text || 'Error de envío' };
  }
}
