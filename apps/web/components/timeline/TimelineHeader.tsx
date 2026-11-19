import { motion } from 'framer-motion';

interface TimelineHeaderProps {
  duration: number;
  currentPlayhead: number;
  onPlayheadChange: (time: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function TimelineHeader({ 
  duration, 
  currentPlayhead, 
  onPlayheadChange,
  isPlaying,
  onPlayPause
}: TimelineHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const clickX = (e as any).clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    onPlayheadChange(newTime);
  };

  const totalMarkers = Math.max(10, Math.floor(duration / 5));
  const markers = Array.from({ length: totalMarkers }, (_, i) => {
    const time = i * 5;
    return time <= duration;
  });

  return (
    <div className="mm-card-cyber p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={onPlayPause}
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
          
          <div className="flex items-center gap-2">
            <span className="text-MM-text-secondary text-sm">🎬</span>
            <span className="text-MM-text-primary font-mono text-sm">
              {formatTime(currentPlayhead)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-MM-text-secondary">
          <span>🎞️ 60 FPS</span>
          <span>⚙️ 16:9</span>
          <span>🎨 Motion Graphics</span>
        </div>
      </div>

      {/* Timeline ruler */}
      <div
        className="relative h-8 bg-MM-bg-card rounded-full border border-MM-border-glow cursor-pointer"
        onClick={handleSeek}
      >
        {/* Markers as CSS elements */}
        {markers.map((show, i) => {
          const time = i * 5;
          if (time > duration) return null;
          
          const isMinute = time % 10 === 0 && time > 0;
          const position = (time / duration) * 100;
          
          return (
            <div key={time} className="absolute top-0 bottom-0 flex items-center">
              <div 
                className={`w-px ${isMinute ? 'h-4' : 'h-3'} bg-MM-border-glow`}
                style={{ left: `${position}%` }}
              />
              {isMinute && (
                <span 
                  className="absolute text-xs text-MM-cyan font-mono"
                  style={{ left: `${position}%`, bottom: '-16px' }}
                >
                  {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
          );
        })}

        {/* Playhead */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-MM-cyan rounded-full"
          style={{ left: `${(currentPlayhead / duration) * 100}%` }}
          animate={{ opacity: isPlaying ? 1 : 0.5 }}
        >
          <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full border-2 border-MM-cyan bg-MM-cyan" />
        </motion.div>

        {/* Playhead drag area */}
        <div
          className="absolute top-0 bottom-0 w-2 -translate-x-1 bg-transparent"
          style={{ left: `${(currentPlayhead / duration) * 100}%` }}
          onMouseDown={(e) => {
            e.preventDefault();
            const handleMouseMove = (e: MouseEvent) => {
              const target = e.currentTarget as HTMLElement;
              const rect = target.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              const newTime = (percentage / 100) * duration;
              onPlayheadChange(newTime);
            };
            document.addEventListener('mousemove', handleMouseMove);
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />
      </div>
    </div>
  );
}