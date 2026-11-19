# MauroMotion - AI Motion Graphics & Cinema Engine

Plataforma para editar videos, crear videos y generar sitios web usando motion graphics impulsados por IA.

## 🚀 Tecnologías

### Frontend
- **Next.js 15** (App Router)
- **Remotion** para renderizado de video programático
- **Framer Motion** para animaciones
- **Tailwind CSS 3.4** con tema cyberpunk neón
- **Zustand** para estado global
- **Zod** para validación

### Backend
- **FastAPI** (Python) en puerto 8000
- **WhisperX** para transcripción con timestamps
- **MediaPipe** para motion tracking
- **Edge-TTS/Kokoro** para TTS local
- **FFmpeg** para renderizado final

## 📦 Instalación

```bash
# Clone el repo
git clone https://github.com/mauriciop-dev/mauromotion.git
cd mauromotion

# Instala dependencias Node.js
pnpm install

# Setup backend Python (opcional, para funcionalidad completa)
python setup-backend.py

# En desarrollo
pnpm dev
```

## 🏗️ Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia frontend (Next.js) |
| `pnpm dev:all` | Inicia frontend + backend simultáneamente |
| `pnpm dev:backend` | Inicia solo el backend Python |
| `pnpm build` | Build de producción |
| `pnpm setup:backend` | Setup del entorno Python |

## 🎨 Modos de trabajo

1. **EDIT_VIDEO** - `/edit-video` - Editar video existente
2. **CREATE_VIDEO** - `/create-video` - Crear video desde cero
3. **CREATE_WEB** - `/create-web` - Crear sitio web interactivo

## 🎯 Dashboard

En la página principal (`/`), el usuario elige:
- **Editar Video** - Subir archivo → WhisperX → MediaPipe → Timeline editable
- **Crear Video** - Formato → Objetivo → Storyboard → IA genera video
- **Crear Sitio Web** - Temas → Animaciones → Preview interactivo

## 🎨 Paleta de colores (Cyber-Pop Neon)

| Color | HEX | Uso |
|-------|-----|-----|
| Cyber Cyan | `#00F0FF` | Botones, timeline, acentos |
| Laser Magenta | `#FF007A` | Alerts, keyframes, playhead |
| High-Voltage Yellow | `#FFE600` | Badges, highlights |
| Dark Cosmic | `#06070B` | Background principal |
| Glass Card | `#181B26` | Cards, surfaces |

## 🔧 Configuración del entorno

```bash
# Variables de entorno
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENGINE_URL=http://localhost:8000
```

## 📁 Estructura del proyecto

```
mauromotion-repo/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
├── apps/web/              # Frontend Next.js
│   ├── app/              # Páginas (App Router)
│   │   ├── page.tsx      # Dashboard principal
│   │   ├── edit-video/   # Editor de video
│   │   ├── create-video/ # Generador de videos
│   │   ├── create-web/   # Generador de sitios web
│   │   └── timeline/     # Línea de tiempo
│   ├── components/       # Componentes React
│   │   ├── ui/           # Componentes UI básicos
│   │   ├── timeline/     # Timeline editor
│   │   └── storyboard/   # Storyboard editor
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types
│   ├── remotion/         # Componentes Remotion
│   └── styles/           # Tailwind CSS
└── services/engine/      # Backend Python
    ├── main.py           # FastAPI server
    └── requirements.txt
```

## 📚 Documentación

Ver `LineamientosInicialesOptimizado.txt` para especificaciones técnicas completas.