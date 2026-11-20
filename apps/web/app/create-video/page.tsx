'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Download, RefreshCw, BookOpen, Palette, Settings } from 'lucide-react';
import { useTimelineStore } from '@/store/timelineStore';
import { StoryboardEditor } from '@/components/storyboard/StoryboardEditor';

interface CreateVideoProps {
  mode: 'horizontal' | 'vertical' | 'square';
  duration: number;
  objective: string;
  theme: string;
  brandDocument?: string;
  referenceUrls: string[];
  voiceId: string;
  musicStyle: string;
}

export default function CreateVideoPage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<CreateVideoProps>({
    mode: 'horizontal',
    duration: 60,
    objective: '',
    theme: 'explainer',
    voiceId: 'alloy',
    musicStyle: 'ambient',
    referenceUrls: [],
  });
  const [generatedProjectId, setGeneratedProjectId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mode, setMode, setConfig: updateStoreConfig, setStoryboard, addStoryboardScene } = useTimelineStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Simular generación con IA (en producción llamaría a OpenRouter)
      const projectId = `project-${Date.now()}`;
      
      // Actualizar configuración del proyecto
      const aspectRatioMap: Record<'horizontal' | 'vertical' | 'square', '16:9' | '9:16' | '1:1'> = {
        horizontal: '16:9',
        vertical: '9:16',
        square: '1:1',
      };
      updateStoreConfig({
        aspectRatio: aspectRatioMap[config.mode],
        durationSeconds: config.duration,
      });
      
      // Generar storyboard básico con IA (placeholder)
      const aiStoryboard = generateStoryboard(config);
      aiStoryboard.forEach(scene => addStoryboardScene(scene));
      
      setGeneratedProjectId(projectId);
      setMode('CREATE_VIDEO');
      
      // Aquí se llamaría al backend para generar el video
      console.log('Generating video with config:', config, 'Project:', projectId);
      
    } catch (err) {
      setError('Error al generar el video');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateStoryboard = (cfg: CreateVideoProps) => {
    const scenes = [];
    const sceneCount = Math.ceil(cfg.duration / 5);
    
    for (let i = 0; i < sceneCount; i++) {
      scenes.push({
        sceneId: `scene-${i}`,
        duration: 5,
        script: `Escena ${i + 1}: Descripción del concepto clave`,
        visualDescription: `Animación motion graphics tipo ${cfg.theme}`,
        camera: 'static' as const,
        elements: [],
      });
    }
    return scenes;
  };

  return (
    <div className="min-h-screen bg-MM-bg-main text-MM-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-MM-bg-surface border-b border-MM-border-glow">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-MM-bg-card flex items-center center justify-center">
              <span className="text-MM-cyan font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold">Crear Video</h1>
          </a>
        </div>
        <div className="px-4 py-2 rounded-full bg-MM-bg-card border border-MM-border-glow">
          <span className="text-xs text-MM-cyan font-mono">MODE: CREATE_VIDEO</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Crear Video con IA</h1>
          <p className="text-MM-text-secondary max-w-2xl mx-auto">
            Genera videos profesionales desde cero con ayuda de IA. Define los parámetros y déjanos la magia.
          </p>
        </div>

        {/* Step 1: Formato y Duración */}
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
                  <Settings className="w-5 h-5 text-MM-cyan" />
                  Formato y Duración
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { key: 'horizontal', label: '16:9 Horizontal', desc: 'Video web estándar', icon: '🎬' },
                    { key: 'vertical', label: '9:16 Vertical', desc: 'Stories y reels', icon: '📱' },
                    { key: 'square', label: '1:1 Cuadrado', desc: 'Post para redes', icon: '📘' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setConfig({ ...config, mode: item.key as any })}
                      className={`p-4 rounded-lg border transition-all ${
                        config.mode === item.key 
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

              <div className="mm-card-cyber p-6">
                <label className="block text-sm font-medium text-MM-text-primary mb-2">
                  Duración del video
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="5"
                    value={config.duration}
                    onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-MM-cyan font-mono text-xl">{config.duration}s</span>
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

        {/* Step 2: Objetivo y Tema */}
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
                  <BookOpen className="w-5 h-5 text-MM-cyan" />
                  Objetivo del video
                </h2>
                <textarea
                  placeholder="¿Cuál es el objetivo principal de tu video? ¿Qué mensaje quieres transmitir?"
                  value={config.objective}
                  onChange={(e) => setConfig({ ...config, objective: e.target.value })}
                  className="w-full p-4 rounded-lg bg-MM-bg-card border border-MM-border-glow text-MM-text-primary mb-4"
                  rows={4}
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-MM-text-primary mb-2">
                    Documento de marca (opcional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="w-full p-3 border border-MM-border-glow rounded-lg bg-MM-bg-card text-MM-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-MM-text-primary mb-2">
                    URLs de referencia
                  </label>
                  <input
                    type="text"
                    placeholder="https://ejemplo.com, https://otroejemplo.com"
                    value={config.referenceUrls.join(', ')}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      referenceUrls: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    })}
                    className="w-full p-3 rounded-lg bg-MM-bg-card border border-MM-border-glow text-MM-text-primary"
                  />
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
                  disabled={!config.objective.trim()}
                  className="mm-card-cyber px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <span className="text-MM-text-primary font-bold">Continuar</span>
                  <Send className="w-4 h-4 ml-2 text-MM-cyan" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Step 3: Detalles de creación */}
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
                  <Palette className="w-5 h-5 text-MM-cyan" />
                  Estilo de video
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={config.theme}
                    onChange={(e) => setConfig({ ...config, theme: e.target.value })}
                    className="w-full p-3 rounded-lg bg-MM-bg-card border border-MM-border-glow text-MM-text-primary"
                  >
                    <option value="explainer">Explicativo / Tutorial</option>
                    <option value="product">Lanzamiento de producto</option>
                    <option value="demo">Demostración</option>
                    <option value="story">Narrativo / Storytelling</option>
                  </select>
                  
                  <select
                    value={config.voiceId}
                    onChange={(e) => setConfig({ ...config, voiceId: e.target.value })}
                    className="w-full p-3 rounded-lg bg-MM-bg-card border border-MM-border-glow text-MM-text-primary"
                  >
                    <option value="alloy">Alloy (neutral)</option>
                    <option value="nova">Nova (femenina cálida)</option>
                    <option value="echo">Echo (masculino grave)</option>
                    <option value="onyx">Onyx (profesional)</option>
                  </select>
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
                  <span className="text-MM-text-primary font-bold">Storyboard</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Step 4: Storyboard (editable) */}
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
                  <BookOpen className="w-5 h-5 text-MM-cyan" />
                  Storyboard del video
                </h2>
                <p className="text-MM-text-secondary mb-4">
                  Define las escenas de tu video. Puedes editar el guion y describir visualmente cada escena.
                </p>
                
                <StoryboardEditor />
              </div>

              <div className="flex justify-between gap-4">
                <button 
                  onClick={() => setStep(3)}
                  className="mm-card-cyber px-6 py-3"
                >
                  <span className="text-MM-text-primary">Volver</span>
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !config.objective.trim()}
                  className="mm-card-cyber px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin text-MM-cyan" />
                      <span className="text-MM-text-primary">Generando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 text-MM-cyan" />
                      <span className="text-MM-text-primary font-bold">Generar Video</span>
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
            <h2 className="text-xl font-bold mb-4 text-MM-green">✓ Video generado</h2>
            <p className="text-MM-text-secondary mb-4">
              Tu video ha sido generado exitosamente. ID del proyecto: <span className="font-mono text-MM-cyan">{generatedProjectId}</span>
            </p>
            <div className="flex gap-4">
              <button className="mm-card-cyber px-4 py-2 flex items-center">
                <Download className="w-4 h-4 mr-2 text-MM-green" />
                <span className="text-MM-text-primary">Descargar MP4</span>
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