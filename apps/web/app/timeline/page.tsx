'use client';

import { useState } from 'react';
import { useTimelineStore } from '@/store/timelineStore';

export default function TimelinePage() {
  const [currentPlayhead, setCurrentPlayhead] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration] = useState(60);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  
  const { mode, setMode, timeline } = useTimelineStore();

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Get video URL from timeline
  const videoUrl = timeline.tracks.find(t => t.type === 'video')?.items[0]?.src;

  return (
    <div className="min-h-screen bg-MM-bg-main text-MM-text-primary">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-MM-bg-surface border-b border-MM-border-glow">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-MM-bg-card flex items-center center justify-center">
              <span className="text-MM-cyan font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold">Timeline</h1>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Editor de línea de tiempo</h1>
          <p className="text-MM-text-secondary">
            {duration}s de duración
          </p>
        </div>

        {/* Video Player */}
        {videoUrl && (
          <div className="mm-card-cyber p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={togglePlayback}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-MM-cyan text-MM-black hover:bg-MM-magenta transition-all duration-200"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="6,4 6,20 14,12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              
              <div className="text-MM-text-primary font-mono text-sm">
                {Math.floor(currentPlayhead / 60).toString().padStart(2, '0')}:{Math.floor(currentPlayhead % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60).toString().padStart(2, '0')}:{Math.floor(duration % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="bg-MM-bg-card rounded-lg overflow-hidden border border-MM-border-glow">
              <video
                src={videoUrl}
                controls
                className="w-full h-64 object-cover"
                onTimeUpdate={(e) => setCurrentPlayhead((e.target as HTMLVideoElement).currentTime)}
              />
            </div>
          </div>
        )}

        {/* Tracks */}
        <div className="space-y-4">
          {timeline.tracks.map((track) => (
            <div key={track.id} className="mm-card-cyber p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  track.type === 'video' ? 'bg-MM-cyan border-MM-cyan' :
                  track.type === 'captions' ? 'bg-MM-green border-MM-green' :
                  'bg-MM-magenta border-MM-magenta'
                }`} />
                <span className="font-medium text-MM-text-primary">{track.label}</span>
                <span className="text-MM-text-secondary text-sm">({track.items.length} items)</span>
              </div>
              
              {track.items.map(item => (
                <div key={item.id} className="bg-MM-bg-card rounded-lg p-3 mb-2">
                  {item.text ? (
                    <div className="text-sm text-MM-text-primary">
                      {item.highlight && '🔴 '}{item.text}
                      <div className="text-xs text-MM-text-secondary">
                        {Math.floor(item.start * 60).toString().padStart(2, '0')}:{(item.start * 60 % 60).toString().padStart(2, '0')} - {Math.floor(item.end * 60).toString().padStart(2, '0')}:{(item.end * 60 % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-MM-text-primary">
                      {item.component || 'Overlay'} at {item.start}s - {item.end}s
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}