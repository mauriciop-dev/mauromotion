import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Save, Shuffle, Lightbulb } from 'lucide-react';
import { useTimelineStore } from '@/store/timelineStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Label, Textarea, Badge, Input, Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui';

interface StoryboardScene {
  sceneId: string;
  duration: number;
  script: string;
  voiceoverUrl?: string;
  visualDescription: string;
  camera: 'static' | 'pan' | 'zoom' | 'tracking';
  elements?: SceneElement[];
}

interface SceneElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'video' | 'motion-component';
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
  duration?: number;
  startTime?: number;
}

export function StoryboardEditor() {
  const [editingScene, setEditingScene] = useState<string | null>(null);
  const [newSceneScript, setNewSceneScript] = useState('');
  const [newSceneDuration, setNewSceneDuration] = useState(5);
  
  const { storyboard, addStoryboardScene, updateStoryboardScene } = useTimelineStore();

  const addScene = () => {
    const newScene: StoryboardScene = {
      sceneId: `scene-${Date.now()}`,
      duration: newSceneDuration,
      script: newSceneScript,
      visualDescription: '',
      camera: 'static',
      elements: [],
    };
    addStoryboardScene(newScene);
    setNewSceneScript('');
    setNewSceneDuration(5);
  };

  const generateAIScenes = () => {
    // Simulate AI-generated storyboard
    const aiScenes: StoryboardScene[] = [
      {
        sceneId: `scene-${Date.now()}`,
        duration: 10,
        script: "Introducción impactante con presentación del tema principal",
        visualDescription: "Fondo oscuro con título neón tipo motion graphics que aparece con animación",
        camera: 'zoom',
        elements: [
          {
            id: `elem-${Date.now()}-1`,
            type: 'text',
            position: { x: 50, y: 30 },
            size: { width: 400, height: 100 },
            content: 'Título principal',
            duration: 5
          }
        ]
      },
      {
        sceneId: `scene-${Date.now() + 1}`,
        duration: 15,
        script: "Desarrollo principal con ejemplos visuales y datos clave",
        visualDescription: "Animación de elementos flotantes con información clave",
        camera: 'pan',
        elements: []
      },
    ];
    
    aiScenes.forEach(scene => addStoryboardScene(scene));
  };

  return (
    <div className="space-y-6">
      <Card className="mm-card-cyber">
        <CardHeader>
          <CardTitle>Storyboard</CardTitle>
          <CardDescription>Define las escenas de tu video</CardDescription>
        </CardHeader>
        <CardContent>
          {/* AI Generation */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-MM-text-secondary">
                {storyboard.length} escenas definidas
              </p>
            </div>
            <Button
              variant="outline"
              onClick={generateAIScenes}
              className="border-MM-cyan text-MM-cyan"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Generar con IA
            </Button>
          </div>

          {/* Add Scene */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label>Guion de la escena</Label>
              <Textarea
                placeholder="Describe qué pasará en esta escena..."
                value={newSceneScript}
                onChange={(e) => setNewSceneScript(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Duración: {newSceneDuration}s</Label>
              <Input
                type="range"
                min="3"
                max="30"
                step="1"
                value={newSceneDuration}
                onChange={(e) => setNewSceneDuration(parseInt(e.target.value))}
                className="mt-2 w-full"
              />
            </div>
          </div>

          <Button onClick={addScene} disabled={!newSceneScript.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar escena
          </Button>

          {/* Scenes List */}
          <AnimatePresence>
            <div className="mt-6 space-y-4">
              {storyboard.map((scene, index) => (
                <motion.div
                  key={scene.sceneId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-MM-bg-card rounded-lg p-4 border border-MM-border-glow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Escena {index + 1}</Badge>
                      <span className="text-MM-text-secondary text-sm">
                        {scene.duration}s
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingScene(scene.sceneId)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // Remove scene - would need a remove action in store
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Textarea
                    value={scene.script}
                    onChange={(e) => {
                      updateStoryboardScene(scene.sceneId, { script: e.target.value });
                    }}
                    rows={3}
                    className="text-sm"
                  />
                  
                  <div className="flex gap-2 mt-2">
                    <select
                      value={scene.camera}
                      onChange={(e) => updateStoryboardScene(scene.sceneId, { camera: e.target.value as any })}
                      className="rounded-md border border-MM-border-glow bg-MM-bg-card px-3 py-2 text-sm text-MM-text-primary"
                    >
                      <option value="static">Estática</option>
                      <option value="pan">Panning</option>
                      <option value="zoom">Zoom</option>
                      <option value="tracking">Tracking</option>
                    </select>
                    
                    <Badge>Visual: {scene.visualDescription || 'Definir'}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}