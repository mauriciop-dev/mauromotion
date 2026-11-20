'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Download, RefreshCw, BookOpen, Palette, Settings, Monitor, LayoutDashboard } from 'lucide-react';
import { useTimelineStore } from '@/store/timelineStore';

interface CreateWebProps {
  theme: 'cyberpunk' | 'minimal' | 'dark' | 'brand';
  animations: 'scroll' | 'hover' | 'both';
  brandColors?: { primary: string; secondary: string; accent: string };
}

export default function CreateWebPage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<CreateWebProps>({
    theme: 'cyberpunk',
    animations: 'both',
  });
  const [generatedProjectId, setGeneratedProjectId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mode, setMode, setConfig: updateStoreConfig } = useTimelineStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const projectId = `web-project-${Date.now()}`;
      
      // Actualizar configuración del proyecto
      updateStoreConfig({
        aspectRatio: '16:9',
        durationSeconds: 0, // Sitio web no tiene duración fija
      });
      
      setMode('CREATE_WEB');
      setGeneratedProjectId(projectId);
      
      console.log('Generating website with config:', config, 'Project:', projectId);
      
    } catch (err) {
      setError('Error al generar el sitio web');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-MM-bg-main text-MM-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-MM-bg-surface border-b border-MM-border-glow">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-MM-bg-card flex items-center center justify-center">
              <Monitor className="w-5 h-5 text-MM-cyan" />
            </div>
            <h1 className="text-xl font-bold">Crear Sitio Web</h1>
          </a>
        </div>
        <div className="px-4 py-2 rounded-full bg-MM-bg-card border border-MM-border-glow">
          <span className="text-xs text-MM-cyan font-mono">MODE: CREATE_WEB</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-MM-cyan" />
            Crear Sitio Web con IA
          </h1>
          <p className="text-MM-text-secondary max-w-2xl">
            Genera sitios web modernos con animaciones al scroll y motion graphics sincronizado.
          </p>
        </div>

        {/* Step 1: Tema */}
        {step === 1 && (
          <AnimatePresence>
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mm-card-cyber p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-MM-cyan" />
                  Estilo del sitio
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { 
                      key: 'cyberpunk', 
                      label: 'Cyberpunk Neón', 
                      desc: 'Colores vibrantes, efectos de glow, fondos oscuros',
                      icons: ['🔮', '⚡', '🌌']
                    },
                    { 
                      key: 'minimal', 
                      label: 'Minimal', 
                      desc: 'Limpio, espacio blanco, tipografía destacada',
                      icons: ['✨', '🕊️', '📐']
                    },
                    { 
                      key: 'dark', 
                      label: 'Dark Mode', 
                      desc: 'Modo oscuro elegante, contrastes profundos',
                      icons: ['🌙', '✨', '🎨']
                    },
                    { 
                      key: 'brand', 
                      label: 'Tu marca', 
                      desc: 'Personalizado con tus colores y tipografía',
                      icons: ['🎨', '🎯', '✍️']
                    },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setConfig({ ...config, theme: item.key as any })}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        config.theme === item.key 
                          ? 'bg-MM-cyan text-MM-black border-MM-cyan' 
                          : 'bg-MM-bg-card text-MM-text-primary border-MM-border-glow hover:scale-105'
                      }`}
                    >
                      <div className="text-2xl mb-2">{item.icons.join(' ')}</div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-xs text-MM-text-secondary">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="mm-card-cyber px-6 py-3 flex items-center"
                >
                  <span className="text-MM-text-primary font-bold">Continuar</span>
                  <Send className="w-4 h-4 ml-2 text-MM-cyan" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Step 2: Animaciones */}
        {step === 2 && (
          <AnimatePresence>
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mm-card-cyber p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-MM-cyan" />
                  Animaciones
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { 
                      key: 'scroll', 
                      label: 'Scroll Triggered', 
                      desc: 'Animaciones al hacer scroll',
                      icon: '⬇️'
                    },
                    { 
                      key: 'hover', 
                      label: 'Hover Effects', 
                      desc: 'Animaciones en hover del mouse',
                      icon: '🖱️'
                    },
                    { 
                      key: 'both', 
                      label: 'Ambas', 
                      desc: 'Scroll + Hover integrados',
                      icon: '🎭'
                    },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setConfig({ ...config, animations: item.key as any })}
                      className={`p-4 rounded-lg border transition-all ${
                        config.animations === item.key 
                          ? 'bg-MM-cyan text-MM-black border-MM-cyan' 
                          : 'bg-MM-bg-card text-MM-text-primary border-MM-border-glow hover:scale-105'
                      }`}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-xs text-MM-text-secondary">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="mm-card-cyber px-6 py-3"
                >
                  <span className="text-MM-text-primary">Volver</span>
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="mm-card-cyber px-6 py-3"
                >
                  <span className="text-MM-text-primary font-bold">Continuar</span>
                  <Send className="w-4 h-4 ml-2 text-MM-cyan" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Step 3: Detalles */}
        {step === 3 && (
          <AnimatePresence>
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mm-card-cyber p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-MM-cyan" />
                  Detalles del sitio
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-MM-text-primary mb-2">
                      URL del sitio
                    </label>
                    <input
                      type="text"
                      placeholder="mi-sitio.vercel.app"
                      className="w-full p-3 rounded-lg bg-MM-bg-card border border-MM-border-glow text-MM-text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-MM-text-primary mb-2">
                      Nombre del proyecto
                    </label>
                    <input
                      type="text"
                      placeholder="Mi Proyecto"
                      className="w-full p-3 rounded-lg bg-MM-bg-card border border-MM-border-glow text-MM-text-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="mm-card-cyber px-6 py-3"
                >
                  <span className="text-MM-text-primary">Volver</span>
                </button>
                <button 
                  onClick={() => setStep(4)}
                  className="mm-card-cyber px-6 py-3"
                >
                  <span className="text-MM-text-primary font-bold">Previsualizar</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Step 4: Previsualización */}
        {step === 4 && (
          <AnimatePresence>
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mm-card-cyber p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-MM-cyan" />
                  Previsualización
                </h2>
                <div className="aspect-video bg-MM-bg-card rounded-lg border border-MM-border-glow flex items-center justify-center">
                  <div className="text-center">
                    <Monitor className="w-12 h-12 text-MM-cyan mx-auto mb-4" />
                    <p className="text-MM-text-secondary">
                      Previsualización del sitio web en {config.theme}
                    </p>
                    <p className="text-xs text-MM-text-secondary mt-2">
                      Animaciones: {config.animations === 'scroll' ? 'Scroll' : config.animations === 'hover' ? 'Hover' : 'Ambas'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button 
                  onClick={() => setStep(3)}
                  className="mm-card-cyber px-6 py-3"
                >
                  <span className="text-MM-text-primary">Editar</span>
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="mm-card-cyber px-6 py-3 disabled:opacity-50 flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin text-MM-cyan" />
                      <span className="text-MM-text-primary">Generando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 text-MM-cyan" />
                      <span className="text-MM-text-primary font-bold">Deploy</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Resultado */}
        {generatedProjectId && (
          <div className="mm-card-cyber p-6">
            <h2 className="text-xl font-bold mb-4 text-MM-green">✓ Sitio generado</h2>
            <p className="text-MM-text-secondary mb-4">
              Tu sitio web ha sido generado exitosamente. ID del proyecto: <span className="font-mono text-MM-cyan">{generatedProjectId}</span>
            </p>
            <div className="flex gap-4">
              <button className="mm-card-cyber px-4 py-2 flex items-center">
                <Download className="w-4 h-4 mr-2 text-MM-green" />
                <span className="text-MM-text-primary">Descargar código</span>
              </button>
              <button className="mm-card-cyber px-4 py-2 flex items-center">
                <Send className="w-4 h-4 mr-2 text-MM-cyan" />
                <span className="text-MM-text-primary">Editar</span>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-400 bg-MM-bg-card p-4 rounded-lg border border-red-500">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}