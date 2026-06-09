// ============================================
// AKYRA — Cliente Supabase
// Guarda leads en la tabla `leads`
// ============================================

let supabaseClient = null;

if (AKYRA_CONFIG.isConfigured.supabase && window.supabase) {
  supabaseClient = window.supabase.createClient(
    AKYRA_CONFIG.supabase.url,
    AKYRA_CONFIG.supabase.anonKey
  );
}

/**
 * Guarda un lead en Supabase.
 * @param {{name: string, email: string, company: string, message: string}} lead
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
async function saveLead(lead) {
  if (!supabaseClient) {
    console.warn('[AKYRA] Supabase no configurado — lead no guardado en BD.');
    return { ok: false, error: 'Supabase no configurado' };
  }
  const { error } = await supabaseClient.from('leads').insert([
    {
      name: lead.name,
      email: lead.email,
      company: lead.company || null,
      message: lead.message,
      status: 'nuevo',
    },
  ]);
  if (error) {
    console.error('[AKYRA] Error al guardar lead:', error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
