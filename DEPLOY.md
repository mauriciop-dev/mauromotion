# Despliegue de MauroMotion

## Opción 1: Vercel (Recomendado)

### Configuración requerida:

1. **Framework Preset**: `Next.js`
2. **Build Command**: `pnpm install && pnpm --filter web build`
3. **Output Directory**: `apps/web/.next`
4. **Install Command**: `pnpm install`

### Variables de Entorno:

```
NEXT_PUBLIC_ENGINE_URL=https://tu-dominio-backend.com  # FastAPI en producción
NEXT_PUBLIC_INSFORGE_URL=https://tu-proyecto.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=tu-anon-key
```

### Nota Importantísima:

Vercel tiene problemas con monorepos con pnpm workspaces. Si el deploy falla, usa una de estas alternativas:

---

## Opción 2: Netlify

1. Build Command: `pnpm install && cd apps/web && pnpm build`
2. Publish Directory: `apps/web/.next`
3. Base Directory: `/`

---

## Opción 3: Railway.app

1. Build Command: `pnpm install && pnpm --filter web build`
2. Output Directory: `apps/web/.next`

---

## Opción 4: Docker (Recomendado para producción)

Crear Dockerfile en raíz:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build only the web app
RUN pnpm --filter web build

EXPOSE 3000

CMD ["pnpm", "--filter", "web", "start"]
```

---

## Opción 5: Simplificar a estructura Next.js directa

Si necesitas una estructura más simple, migra la app a la raíz:

```bash
# Copiar apps/web/* a la raíz
cp -r apps/web/* ./
# Actualizar package.json para que apunte a los nuevos archivos
```

---

## Backend Python

El backend FastAPI debe desplegarse por separado, por ejemplo en:
- **Railway.app**
- **Render.com**
- **Heroku**
- **AWS EC2**
- **InsForge** (recomendado)

### Despliegue en InsForge

1. Sube el código de `services/engine/` a InsForge
2. Aplica la migración: `npx @insforge/mcp apply-migration --name 001_initial_schema`
3. Configura el puerto 8000
4. Obtén la URL de tu backend (ej: `https://project-xyz.insforge.app`)

---

## Base de Datos (InsForge)

Esquema preparado en `migrations/001_initial_schema.sql`

Tablas principales:
- `projects` - Proyectos (video/web)
- `storyboards` - Escenas del storyboard
- `timeline_items` - Items de timeline
- `media` - Video, transcripción, tracking

---

## Desarrollo Local

### Iniciar backend:
```bash
cd services/engine
.\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

### Iniciar frontend:
```bash
cd apps/web
pnpm dev
```

### Verificar conectividad:
```bash
curl http://localhost:8000/health
# Debería retornar: {"status":"healthy","engine":"online"}
```

---

## Variables de Entorno

Crea un archivo `.env.local` en la raíz:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENGINE_URL=http://localhost:8000
NEXT_PUBLIC_INSFORGE_URL=https://gi5rxzv6.us-east.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=ik_tu-anon-key-aqui
```