'use client';

import { useState } from 'react';
import { Send, Download, RefreshCw } from 'lucide-react';
import { useTimelineStore } from '@/store/timelineStore';

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || 'http://localhost:8000';

export default function EditVideoPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mode, setMode, updateTrack } = useTimelineStore();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('videoFile') as HTMLInputElement;
    
    if (!fileInput.files?.[0]) return;

    const file = fileInput.files[0]!;
    setIsProcessing(true);
    setError(null);

    try {
      // Upload to backend
      const formData = new FormData();
      formData.append('file', file);
      formData.append('enable_transcription', 'true');
      formData.append('enable_tracking', 'true');

      const response = await fetch(`${ENGINE_URL}/upload-video`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const uploadedProjectId = data.project_id;
      setProjectId(uploadedProjectId);

      // Create object URL for preview
      const previewUrl = URL.createObjectURL(file);
      setVideoUrl(previewUrl);
      setMode('EDIT_VIDEO');

      // Update timeline
      updateTrack({
        id: 'track-video-base',
        label: 'Video Principal',
        type: 'video',
        items: [{ id: 'v1', start: 0, end: 60, src: previewUrl }]
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir el video');
      console.error('Upload error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-MM-bg-main text-MM-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-MM-bg-surface border-b border-MM-border-glow">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-MM-bg-card flex items-center center justify-center">
              <Send className="w-5 h-5 text-MM-cyan" />
            </div>
            <h1 className="text-xl font-bold">Editar Video</h1>
          </a>
        </div>
        <div className="px-4 py-2 rounded-full bg-MM-bg-card border border-MM-border-glow">
          <span className="text-xs text-MM-cyan font-mono">MODE: EDIT_VIDEO</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Sube tu video para procesar</h1>
          <p className="text-MM-text-secondary">
            WhisperX transcribe y MediaPipe detecta movimientos
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="mm-card-cyber p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-MM-text-primary mb-2">
                Archivo de video (MP4, MOV, AVI)
              </label>
              <input
                type="file"
                name="videoFile"
                accept="video/*"
                required
                className="w-full p-3 border border-MM-border-glow rounded-lg bg-MM-bg-card text-MM-text-primary"
              />
            </div>
            
            <div className="bg-MM-bg-card p-3 rounded-lg border border-MM-border-glow">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-MM-cyan animate-pulse" />
                <span className="text-MM-text-secondary">
                  Formatos soportados: MP4, MOV, AVI • Resolución máxima: 4K
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mm-card-cyber p-4 flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin text-MM-cyan" />
                <span className="text-MM-text-primary">Procesando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2 text-MM-cyan" />
                <span className="text-MM-text-primary font-bold">Procesar video</span>
              </>
            )}
          </button>

          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Video Player */}
        {videoUrl && (
          <div className="mt-8">
            <h3 className="font-bold text-MM-text-primary mb-4">Vista previa del video</h3>
            <div className="bg-MM-bg-card rounded-lg overflow-hidden border border-MM-border-glow mb-6">
              <video
                src={videoUrl}
                controls
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <button className="mm-card-cyber px-4 py-2 flex items-center transition-all duration-200 hover:scale-105">
                <Download className="w-4 h-4 mr-2 text-MM-green" />
                <span className="text-MM-text-primary">Exportar (MP4)</span>
              </button>
              <button className="mm-card-cyber px-4 py-2 flex items-center transition-all duration-200 hover:scale-105">
                <Send className="w-4 h-4 mr-2 text-MM-cyan" />
                <span className="text-MM-text-primary">Renderizar final</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}