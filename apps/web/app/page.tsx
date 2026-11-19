export default function HomePage() {
  const modes = [
    {
      id: 'EDIT_VIDEO' as const,
      title: 'Editar Video',
      description: 'Carga un video existente para procesar subtítulos, tracking y motion graphics',
      href: '/edit-video',
      accent: 'cyan',
    },
    {
      id: 'CREATE_VIDEO' as const,
      title: 'Crear Video',
      description: 'Genera videos explicativos desde cero con storyboard interactivo',
      href: '/create-video',
      accent: 'magenta',
    },
    {
      id: 'CREATE_WEB' as const,
      title: 'Crear Sitio Web',
      description: 'Crea sitios web con animaciones al scroll y motion graphics',
      href: '/create-web',
      accent: 'yellow',
    },
  ];

  return (
    <div className="min-h-screen bg-MM-bg-main text-MM-text-primary">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-MM-bg-card flex items-center justify-center">
              <span className="text-MM-cyan font-bold">M</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-MM-text-primary">
                Mauro<span className="text-transparent bg-clip-text bg-gradient-to-r from-MM-cyan to-MM-magenta">Motion</span>
              </h1>
              <p className="text-MM-text-secondary text-sm mt-1">
                AI Motion Graphics & Cinema Engine
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-full bg-MM-bg-card border border-MM-border-glow">
            <span className="text-xs text-MM-cyan font-mono">DEV MODE</span>
          </div>
        </header>

        {/* Main Question */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4 text-MM-text-primary">
            ¿Qué locura cinematográfica vamos a renderizar hoy, Mauricio?
          </h2>
          <p className="text-MM-text-secondary max-w-2xl mx-auto">
            Elige tu próximo proyecto y déjanos la magia de la IA hacer el resto.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {modes.map((mode) => (
            <a 
              key={mode.id} 
              href={mode.href} 
              className="mm-card-cyber p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
            >
              <div className="mb-6">
                {mode.accent === 'cyan' && <span className="text-4xl">🎬</span>}
                {mode.accent === 'magenta' && <span className="text-4xl">🎥</span>}
                {mode.accent === 'yellow' && <span className="text-4xl">🌐</span>}
              </div>
              <h3 className="text-xl font-bold mb-2 text-MM-text-primary">
                {mode.title}
              </h3>
              <p className="text-MM-text-secondary text-sm mb-6">
                {mode.description}
              </p>
              <span className="text-xs text-MM-cyan font-mono">
                ACTIVAR MODO {mode.id.replace('_', ' ')}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}