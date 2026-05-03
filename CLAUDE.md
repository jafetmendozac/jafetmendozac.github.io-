# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio personal sin build step ni dependencias instaladas. Tres archivos separados:

```
index.html       — estructura HTML
css/styles.css   — todos los estilos
js/main.js       — todas las animaciones (GSAP)
```

Abrir localmente:
```
open index.html
```

## Architecture

**`css/styles.css`** — usa CSS custom properties definidas en `:root` para todo el sistema de color (`--bg`, `--ink`, `--blue`, `--teal`, `--amber`, `--green` + variantes `-light`/`-mid`). Tipografía y espaciado usan `clamp()` para escala fluida. Breakpoints responsivos: 1024px, 900px, 768px, 420px.

**`index.html`** — ocho secciones en orden: `#hero`, marquee strip, `#about`, `#experience`, `#projects`, `#skills`, `#testimonials`, `#contact`, más `<footer>`. El menú móvil fullscreen (`.nav-mobile-menu`) es un elemento separado del nav de escritorio.

**`js/main.js`** — todas las animaciones pasan por el objeto de configuración `M` al inicio del archivo. Es la fuente única de verdad para curvas de easing, duraciones y stagger. Al añadir animaciones, usar siempre `M.ease`, `M.spring`, `M.d.*`, `M.s.*` en lugar de valores hardcodeados.

Dos funciones utilitarias manejan la mayoría de las animaciones con scroll:
- `clipReveal(targets, opts)` — wipe con clip-path desde abajo, usado en headings
- `fadeUp(targets, opts)` — y-translate + opacity fade, usado en cards y cuerpo de texto

Scripts externos cargados desde CDN (sin copias locales):
- GSAP 3.12.5 + ScrollTrigger + ScrollToPlugin (cdnjs)
- Google Fonts: Syne (headings) + DM Sans (body)

## Content to update

Personal info is hardcoded inline in the HTML:
- Email: `abrahamjoelmc@gmail.com` (appears in nav CTA, contact section, mobile menu)
- LinkedIn: `https://linkedin.com/in/abraham-mendoza59890b345/`
- GitHub: `https://github.com/tu-usuario` (placeholder — not yet set)
- Location/copyright: footer (`Trujillo, Perú`)

Experience dates, project descriptions, and testimonials are plain HTML inside their respective `<section>` elements — no data layer.
