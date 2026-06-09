# AKYRA Consultora — Sitio Web

Sitio one-page de AKYRA Consultora. HTML/CSS/JS vanilla, sin frameworks.

## Estructura

```
akyra-website/
├── index.html       # Home + servicios + contacto
├── styles.css       # Design system AKYRA
├── components.js    # Navbar, animaciones, formulario
├── db.js            # Cliente Supabase (tabla leads)
├── email.js         # Cliente EmailJS
├── config.js        # Credenciales (placeholders → reemplazar)
├── vercel.json      # Config Vercel
└── emails/          # Secuencia de nurture para leads
```

## Setup (paso a paso)

### 1. Supabase
1. Crear cuenta en [supabase.com](https://supabase.com) (free tier)
2. Crear proyecto nuevo → SQL Editor → ejecutar:

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'nuevo'
);

-- Permitir inserts anónimos (solo INSERT, no SELECT)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON leads FOR INSERT TO anon WITH CHECK (true);
```

3. Settings → API → copiar `URL` y `anon key`
4. Pegarlas en `config.js`

### 2. EmailJS
1. Crear cuenta en [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/mes)
2. Add New Service → Gmail → conectar `akyraconsultora@gmail.com`
3. Email Templates → Create New Template con estos campos:
   - `{{user_name}}`, `{{user_email}}`, `{{user_company}}`, `{{message}}`
   - To Email: `akyraconsultora@gmail.com`
4. Account → copiar `Public Key`
5. Pegar `Service ID`, `Template ID` y `Public Key` en `config.js`

### 3. GitHub + Vercel
1. Crear repo en GitHub y pushear esta carpeta
2. En [vercel.com](https://vercel.com): New Project → importar el repo
3. Framework Preset: **Other** (sitio estático) → Deploy
4. Cada `git push` a `main` deploya automáticamente

## Checklist pre-producción

- [ ] Supabase: tabla `leads` creada + policy de insert + keys en config.js
- [ ] EmailJS: servicio Gmail conectado + template creado + keys en config.js
- [ ] Probar formulario: llega email + aparece lead en Supabase
- [ ] Revisar responsive en móvil
- [ ] Instagram: link verificado (@akyraconsultora)
- [ ] Dominio propio (opcional, agregar en Vercel → Domains)

## Mantenimiento

- **Cambiar textos**: editar `index.html`
- **Colores/diseño**: variables en `:root` de `styles.css`
- **Agregar campo al formulario**: HTML + tabla Supabase + template EmailJS
- **Gestión de leads**: dashboard de Supabase → Table Editor → `leads` (cambiar `status`: nuevo → contactado → cerrado)

---
Mantenedor: Joaquín Paz Cabus — AKYRA Consultora
