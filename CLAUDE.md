# 🤖 CLAUDE.md - Guía Técnica del Proyecto

Este archivo documenta la arquitectura, decisiones técnicas y cómo modificar este proyecto para futuras actualizaciones con Claude Code o cualquier IA.

---

## 📋 Resumen del Proyecto

**Tipo:** Sitio web bilingüe (EN/ES) para consultora de software premium
**Stack:** Next.js 16.1.6 LTS + React 19.2 + TypeScript + Tailwind CSS v4 + shadcn/ui
**i18n:** next-intl con `localePrefix: 'always'` (URLs: /en/about, /es/about)
**Total de rutas:** 22 (11 páginas × 2 idiomas)

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── app/                          # App Router de Next.js
│   ├── [locale]/                # Rutas dinámicas por idioma
│   │   ├── layout.tsx          # Layout principal con Header/Footer
│   │   ├── page.tsx            # Home page
│   │   ├── services/           # Servicios
│   │   │   ├── page.tsx       # Página overview de servicios
│   │   │   ├── data-platforms-bi/
│   │   │   ├── process-automation/
│   │   │   ├── applied-ai/
│   │   │   ├── ml-forecasting/
│   │   │   ├── software-selection/
│   │   │   └── managed-services/
│   │   ├── about/page.tsx
│   │   ├── case-studies/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx              # Root layout (HTML, fonts)
│   ├── globals.css             # Estilos globales + Tailwind
│   ├── sitemap.ts              # Generación automática de sitemap
│   └── robots.ts               # Configuración robots.txt
├── components/
│   ├── ui/                     # Componentes shadcn/ui (Radix)
│   ├── layout/                 # Header, Footer, LanguageSwitcher
│   ├── home/                   # Componentes específicos de home
│   ├── services/               # Componentes para páginas de servicios
│   ├── contact/                # ContactForm
│   └── shared/                 # Componentes reutilizables
├── lib/
│   ├── utils.ts               # cn() helper para classNames
│   ├── metadata.ts            # Generadores de metadata SEO
│   └── schemas.ts             # JSON-LD schemas
├── i18n/
│   ├── request.ts             # Configuración next-intl
│   └── routing.ts             # Definición de locales y rutas
├── messages/
│   ├── en.json                # Traducciones inglés
│   └── es.json                # Traducciones español
└── types/
    └── services.ts            # Tipos TypeScript
```

---

## 🔑 Decisiones Técnicas Clave

### 1. **Next.js 16 + Params Asíncronos**

En Next.js 16, los `params` son `Promise<{ locale: string }>`:

```typescript
// ✅ CORRECTO - Next.js 16
export default async function Page(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params;
  const { locale } = params;
  // ...
}

// ❌ INCORRECTO - Esto funcionaba en Next.js 14
export default async function Page({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // ...
}
```

**Aplicar esto en:**
- Todos los `page.tsx` en `[locale]`
- Todas las funciones `generateMetadata`

### 2. **Internacionalización con next-intl**

**Middleware:** `middleware.ts` detecta locale automáticamente
**Routing:** `src/i18n/routing.ts` define locales disponibles
**Traducciones:** `src/messages/{locale}.json`

**Estrategia de URLs (SEO-optimizada):**

Este proyecto usa `localePrefix: 'always'` para máxima consistencia:

```
consultora-software.com/en/about       ← Inglés (con prefijo /en)
consultora-software.com/en/services    ← Inglés (con prefijo /en)
consultora-software.com/es/about       ← Español (con prefijo /es)
consultora-software.com/es/services    ← Español (con prefijo /es)
```

**Por qué esta estrategia:**
- ✅ Muy simple y predecible
- ✅ Consistente entre todos los idiomas
- ✅ Totalmente compatible con Google SEO (hreflang tags incluidos)
- ✅ Sin penalización SEO - Google trata ambos prefijos igual
- ✅ Fácil de mantener y sin duplicación de código

**Navegación entre idiomas:**

El proyecto usa los componentes de navegación de `next-intl` que automáticamente manejan los prefijos:

```typescript
// ✅ CORRECTO - Usar Link de next-intl
import { Link } from '@/i18n/routing';

<Link href="/about">About</Link>  // Se convierte a /en/about o /es/about automáticamente
```

```typescript
// ❌ INCORRECTO - No usar next/link directamente
import Link from 'next/link';

<Link href={`/${locale}/about`}>About</Link>  // Demasiado manual
```

**Cómo agregar una nueva traducción:**

1. Editar `src/messages/en.json` y `src/messages/es.json`
2. Usar en componentes:
   ```typescript
   const t = await getTranslations({ locale });
   const title = t('services.newService.name');
   ```

### 3. **Tailwind CSS v4**

Este proyecto usa **Tailwind CSS v4** (la versión más reciente):

- **NO hay `tailwind.config.ts` tradicional**
- La configuración está en `src/app/globals.css` usando `@theme inline`
- Los colores se definen con CSS variables en formato HSL

**Cómo cambiar colores:**

Editar `src/app/globals.css`:

```css
:root {
  --primary: 220 90% 56%;        /* Cambiar estos valores HSL */
  --accent: 280 85% 60%;
  --accent-secondary: 25 95% 53%;
}
```

### 4. **shadcn/ui Components**

Los componentes UI están en `src/components/ui/` y usan:
- Radix UI primitives
- Tailwind para estilos
- class-variance-authority para variantes

**Instalar nuevo componente:**

```bash
npx shadcn-ui@latest add [component-name]
```

### 5. **SEO y Metadata**

**Generación de Metadata:**
- Función helper: `src/lib/metadata.ts` → `generatePageMetadata()`
- Cada página tiene `generateMetadata()` que retorna metadata completa
- Incluye: title, description, openGraph, twitter, canonical, hreflang

**Schemas JSON-LD:**
- `src/lib/schemas.ts` contiene generadores
- Organization schema en `[locale]/layout.tsx`
- Service schema se puede agregar por servicio

**Sitemap y Robots:**
- `src/app/sitemap.ts` - genera automáticamente todas las rutas
- `src/app/robots.ts` - configuración de crawlers

---

## 🔧 Cómo Modificar Cosas Comunes

### ✏️ Cambiar Textos del Sitio

**Ubicación:** `src/messages/en.json` y `src/messages/es.json`

Toda la UI está traducida. Para cambiar cualquier texto:

1. Buscar la clave en los archivos JSON
2. Editar el valor
3. Los cambios se reflejan automáticamente en todas las páginas que usan esa clave

**Ejemplo - Cambiar título del hero:**

```json
// src/messages/en.json
{
  "home": {
    "hero": {
      "title": "Build a Real-Time Business"  // ← Cambiar aquí
    }
  }
}
```

### 🎨 Cambiar Colores/Branding

**Ubicación:** `src/app/globals.css`

```css
:root {
  /* Colores principales */
  --primary: 220 90% 56%;              /* Navy blue */
  --primary-dark: 220 90% 46%;         /* Variante oscura */
  --accent: 280 85% 60%;               /* Purple */
  --accent-secondary: 25 95% 53%;      /* Orange */

  /* Neutrales */
  --neutral-800: 0 0% 15%;
  --neutral-900: 0 0% 9%;
}
```

**Formato HSL:** `hue saturation% lightness%`
- Hue: 0-360 (0=rojo, 120=verde, 240=azul)
- Saturation: 0-100% (0=gris, 100=color puro)
- Lightness: 0-100% (0=negro, 100=blanco)

### 🖼️ Cambiar Logo

**Ubicación:** `src/components/layout/Header.tsx`

**Opción 1 - Reemplazar gradiente con imagen:**

```typescript
// Línea ~25 en Header.tsx
// Reemplazar esto:
<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]" />

// Con esto:
<Image src="/logo.png" alt="Logo" width={32} height={32} />
```

**Opción 2 - Usar SVG inline:**

Reemplazar el div con tu SVG directamente.

### ➕ Agregar Nueva Página

**Pasos:**

1. **Crear archivo de página:**
   ```
   src/app/[locale]/nueva-pagina/page.tsx
   ```

2. **Usar template:**
   ```typescript
   import { getTranslations } from 'next-intl/server';
   import { generatePageMetadata } from '@/lib/metadata';

   export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
     const params = await props.params;
     const t = await getTranslations({ locale: params.locale });

     return generatePageMetadata({
       locale: params.locale,
       title: t('metadata.nuevaPagina.title'),
       description: t('metadata.nuevaPagina.description'),
       path: '/nueva-pagina',
     });
   }

   export default async function NuevaPaginaPage(props: { params: Promise<{ locale: string }> }) {
     const params = await props.params;
     const t = await getTranslations({ locale: params.locale });

     return (
       <div>
         <h1>{t('nuevaPagina.title')}</h1>
       </div>
     );
   }
   ```

3. **Agregar traducciones:**
   En `src/messages/en.json` y `src/messages/es.json`:
   ```json
   {
     "nuevaPagina": {
       "title": "Nueva Página"
     },
     "metadata": {
       "nuevaPagina": {
         "title": "Nueva Página | Consultora",
         "description": "Descripción de la página"
       }
     }
   }
   ```

4. **Agregar a navegación (opcional):**
   Editar `src/components/layout/Header.tsx` y agregar al array `navItems`

5. **Agregar a sitemap:**
   Editar `src/app/sitemap.ts` y agregar la ruta

### 🛠️ Agregar Nuevo Servicio

**Pasos:**

1. **Crear carpeta:**
   ```
   src/app/[locale]/services/nuevo-servicio/page.tsx
   ```

2. **Copiar template de servicio existente:**
   Usar `data-platforms-bi/page.tsx` como base

3. **Agregar traducciones:**
   ```json
   // src/messages/en.json
   {
     "services": {
       "nuevoServicio": {
         "name": "Nombre del Servicio",
         "shortDescription": "Descripción corta",
         "challenges": {
           "title": "Common Challenges",
           "items": {
             "0": "Desafío 1",
             "1": "Desafío 2",
             // ...
           }
         },
         "deliverables": {
           "title": "What We Deliver",
           "items": { /* ... */ }
         },
         "outcomes": {
           "title": "Outcomes",
           "items": { /* ... */ }
         }
       }
     }
   }
   ```

4. **Agregar ícono:**
   En `src/components/home/ServicesGrid.tsx`, agregar al objeto `serviceIcons`:
   ```typescript
   import { TuIcono } from 'lucide-react';

   const serviceIcons = {
     // ...
     'nuevo-servicio': TuIcono,
   };
   ```

5. **Agregar a lista de servicios:**
   En `src/app/[locale]/services/page.tsx` y `src/app/[locale]/page.tsx`, agregar al array de servicios

6. **Actualizar sitemap:**
   En `src/app/sitemap.ts`, agregar slug a `servicePages` array

### 📧 Configurar Envío de Emails (Contact Form)

**Estado actual:** El form usa `mailto:` (abre cliente de email)

**Para envío real vía API:**

1. **Instalar servicio de email (ejemplo: Resend):**
   ```bash
   npm install resend
   ```

2. **Crear API route:**
   ```typescript
   // src/app/api/contact/route.ts
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(request: Request) {
     const { name, email, company, message } = await request.json();

     await resend.emails.send({
       from: 'contact@consultora-software.com',
       to: 'team@consultora-software.com',
       subject: `Contact from ${name}`,
       html: `<p>${message}</p>`,
     });

     return Response.json({ success: true });
   }
   ```

3. **Actualizar ContactForm.tsx:**
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     const response = await fetch('/api/contact', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });

     if (response.ok) {
       setStatus('success');
     } else {
       setStatus('error');
     }
   };
   ```

4. **Agregar API key a `.env.local`:**
   ```
   RESEND_API_KEY=re_xxxxx
   ```

### 📊 Agregar Google Analytics

1. **Crear componente de analytics:**
   ```typescript
   // src/components/shared/Analytics.tsx
   import Script from 'next/script';

   export default function Analytics() {
     const gaId = process.env.NEXT_PUBLIC_GA_ID;

     if (!gaId) return null;

     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
           strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${gaId}');
           `}
         </Script>
       </>
     );
   }
   ```

2. **Agregar a root layout:**
   ```typescript
   // src/app/layout.tsx
   import Analytics from '@/components/shared/Analytics';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

3. **Configurar variable de entorno:**
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

---

## 🐛 Troubleshooting Común

### Error: "Type 'typeof import' does not satisfy constraint"

**Causa:** Params no son `Promise` en Next.js 16

**Solución:** Usar el patrón async params:

```typescript
// ✅ Correcto
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // ...
}
```

### Error: Translation key not found

**Causa:** Falta la clave en archivos de traducción

**Solución:**
1. Verificar que existe en `src/messages/en.json` y `es.json`
2. Verificar ortografía exacta (case-sensitive)
3. Reiniciar dev server si recién agregaste la clave

### Estilos no se aplican

**Causa:** Tailwind CSS v4 usa diferente sintaxis

**Solución:** Los colores se referencian así:
```tsx
className="bg-[hsl(var(--primary))]"  // ✅ Correcto
className="bg-primary"                 // ❌ No funciona en v4
```

### Build falla en producción

**Checklist:**
1. ✅ `npm run build` sin errores
2. ✅ Todas las variables `NEXT_PUBLIC_*` están definidas
3. ✅ No hay referencias a window/document en server components
4. ✅ Todos los componentes 'use client' necesarios están marcados

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev                    # Iniciar servidor de desarrollo
npm run build                  # Build de producción
npm run start                  # Servidor de producción
npm run lint                   # Linter

# Agregar componente shadcn/ui
npx shadcn-ui@latest add button

# Ver todas las rutas generadas
npm run build && cat .next/routes-manifest.json
```

---

## 📦 Dependencias Principales

```json
{
  "next": "16.1.6",              // Framework
  "react": "^19.0.0",            // UI library
  "next-intl": "^3.15.0",        // Internacionalización
  "tailwindcss": "^4.x",         // CSS framework (v4!)
  "lucide-react": "^0.379.0",    // Iconos
  "@radix-ui/*": "...",          // Primitivos UI (shadcn base)
  "class-variance-authority": "...",  // Variantes de componentes
  "clsx": "...",                 // Class merging
  "tailwind-merge": "..."        // Tailwind class merging
}
```

---

## 📝 Notas Importantes

1. **Server vs Client Components:**
   - Por defecto, todo es Server Component
   - Usar `'use client'` solo cuando necesites:
     - useState, useEffect, eventos
     - Hooks de navegación (useRouter, usePathname)
   - Ejemplos en el proyecto: Header, ContactForm, LanguageSwitcher

2. **Estructura de Traducciones:**
   - Mantener misma estructura en `en.json` y `es.json`
   - Usar índices numéricos para arrays (`"0": "...", "1": "..."`)
   - Esto permite iterar fácilmente: `Array.from({ length: 5 }, (_, i) => t(\`key.\${i}\`))`

3. **Imágenes:**
   - Siempre usar `next/image` para optimización automática
   - Poner imágenes en `public/images/`
   - Para logos, considerar SVG inline para mejor control

4. **Performance:**
   - Turbopack está habilitado por defecto en Next.js 16
   - Todas las páginas son static por defecto
   - Si necesitas dynamic rendering, agregar: `export const dynamic = 'force-dynamic'`

---

## 🔮 Mejoras Futuras Sugeridas

- [ ] Agregar animaciones con Framer Motion
- [ ] Implementar blog con MDX
- [ ] Agregar CMS headless (Sanity/Contentful) si contenido crece
- [ ] A/B testing con Vercel Edge Config
- [ ] Agregar más casos de estudio con páginas individuales
- [ ] Implementar sistema de tags para servicios
- [ ] Dark mode toggle (colores ya están preparados en CSS)

---

## 📞 Contacto para Modificaciones

Cuando uses Claude Code para modificaciones:

1. **Menciona este archivo:** "Lee CLAUDE.md primero"
2. **Sé específico:** Indica qué sección cambiar
3. **Verifica traducciones:** Siempre actualizar EN y ES
4. **Testea localmente:** `npm run build` antes de deploy

---

**Última actualización:** 2026-02-11
**Versiones:** Next.js 16.1.6, React 19.2, Tailwind CSS 4.x, next-intl 3.15
