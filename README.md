# MauroMotion - AI Motion Graphics & Cinema Engine

Plataforma para editar videos, crear videos y generar sitios web usando motion graphics impulsados por IA.

## 🚀 Tecnologías

### Frontend
- **Next.js 15** (App Router)
- **Remotion** para renderizado de video programático
- **Framer Motion** para animaciones
- **Tailwind CSS 3.4** con tema cyberpunk neón
- **Zustand** para estado global con persistencia
- **Lucide React** para iconos

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

# Setup backend Python
cd services/engine
python -m venv venv
.\venv\Scripts\pip.exe install -r requirements.txt

# En desarrollo
cd ../../
pnpm dev
```

## 🏗️ Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia frontend (Next.js) |
| `pnpm build` | Build de producción |
| `pnpm start` | Inicia servidor de producción |

### Backend Python

```bash
cd services/engine
.\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

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
| Glass Green | `#00FF66` | Subtítulos |
| Glass Purple | `#9D00FF` | Overlays |
| Glass Blue | `#94A3B8` | Texto secundario |

## 🔧 Configuración del entorno

```bash
# Variables de entorno
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENGINE_URL=http://localhost:8000
NEXT_PUBLIC_INSFORGE_URL=https://tu-proyecto.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=ik_tu-anon-key
```

## 📁 Estructura del proyecto

```
mauromotion-repo/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
├── DEPLOY.md              # Guía de despliegue
├── estado_actual.md       # Estado de desarrollo
├── apps/web/              # Frontend Next.js
│   ├── app/              # Páginas (App Router)
│   │   ├── page.tsx      # Dashboard principal
│   │   ├── edit-video/   # Editor de video
│   │   ├── create-video/ # Generador de videos (4 pasos)
│   │   ├── create-web/   # Generador de sitios web (4 pasos)
│   │   ├── timeline/     # Línea de tiempo
│   │   └── test-connection.tsx  # Test de conexión
│   ├── components/       # Componentes React
│   │   ├── ui/           # Componentes UI básicos
│   │   ├── timeline/     # Timeline editor
│   │   └── storyboard/   # Storyboard editor
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types
│   ├── lib/              # Utilidades e insforge.ts
│   ├── remotion/         # Componentes Remotion
│   └── styles/           # Tailwind CSS
└── services/engine/      # Backend Python
    ├── main.py           # FastAPI server
    ├── requirements.txt  # Dependencias Python
    ├── venv/             # Virtual environment
    └── migrations/       # SQL migrations
        ├── 001_initial_schema.sql
        └── 002_insert_initial_data.sql
```

## 🗂️ Archivos clave

- **`services/engine/main.py`** - API FastAPI con endpoints para video, transcripción, tracking
- **`apps/web/store/timelineStore.ts`** - Estado unificado con persistencia
- **`apps/web/types/timeline.ts`** - Tipos TypeScript principales
- **`apps/web/lib/insforge.ts`** - Integración SDK InsForge

## 📚 Documentación

Ver `LineamientosInicialesOptimizado.txt` para especificaciones técnicas completas.

Ver `estado_actual.md` para el estado de desarrollo actualizado.

## 🔗 Enlaces útiles

- [InsForge SDK Documentation](https://docs.insforge.app/sdks/typescript)
- [Remotion Documentation](https://remotion.io/docs)
- [WhisperX GitHub](https://github.com/laitx/whisperx)
- [MediaPipe](https://developers.google.com/mediapipe)