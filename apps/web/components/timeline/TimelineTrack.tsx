import { motion } from 'framer-motion';

interface TimelineTrackProps {
  trackId: string;
  label: string;
  type: 'video' | 'captions' | 'motion-component' | 'audio' | 'bg-music';
  items: Array<{
    id: string;
    start: number;
    end: number;
    src?: string;
    text?: string;
    highlight?: boolean;
    component?: string;
    props?: Record<string, unknown>;
  }>;
  duration?: number;
  onItemClick?: (item: any) => void;
}

export function TimelineTrack({ trackId, label, type, items, duration = 60, onItemClick }: TimelineTrackProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'video': return 'bg-MM-cyan border-MM-cyan';
      case 'captions': return 'bg-MM-green border-MM-green';
      case 'motion-component': return 'bg-MM-magenta border-MM-magenta';
      case 'audio': return 'bg-MM-purple border-MM-purple';
      case 'bg-music': return 'bg-MM-yellow border-MM-yellow';
    }
  };

  const trackHeight = 80;

  return (
    <div className="mm-card-cyber mb-2">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getTypeColor()}`} />
          <span className="font-medium text-MM-text-primary">{label}</span>
          <span className="text-xs text-MM-text-secondary">({items.length} items)</span>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        {/* Timeline bar */}
        <div className="relative h-8 bg-MM-bg-card rounded-full border border-MM-border-glow overflow-hidden">
          {/* Time markers */}
          {Array.from({ length: Math.max(5, Math.ceil(duration / 15)) }).map((_, i) => {
            const time = i * 15;
            return (
              <div
                key={time}
                className="absolute w-px h-full bg-MM-border-glow"
                style={{ left: `${(time / duration) * 100}%` }}
              />
            );
          })}
          
          {/* Time labels */}
          {Array.from({ length: Math.max(5, Math.ceil(duration / 15)) }).map((_, i) => {
            const time = i * 15;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return (
              <span
                key={`label-${time}`}
                className="absolute text-xs text-MM-text-secondary"
                style={{ left: `${(time / duration) * 100}%`, transform: 'translateX(-50%)', bottom: -16 }}
              >
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            );
          })}

          {/* Items */}
          {items.map((item) => {
            const startPercent = (item.start / duration) * 100;
            const widthPercent = ((item.end - item.start) / duration) * 100;
            
            return (
              <motion.div
                key={item.id}
                className={`absolute top-2 rounded-md transition-all duration-200 cursor-pointer ${getTypeColor()}`}
                style={{
                  left: `${startPercent}%`,
                  width: `${widthPercent}%`,
                  height: type === 'video' ? '100%' : '70%',
                  bottom: type === 'video' ? 0 : 15,
                }}
                whileHover={{ scale: 1.05, opacity: 0.9 }}
                onClick={() => onItemClick?.(item)}
              >
                <div className="p-2">
                  {item.text ? (
                    <span className="text-xs text-MM-black font-medium line-clamp-2">
                      {item.highlight && '🔴 '}{item.text}
                    </span>
                  ) : type === 'captions' ? (
                    <span className="text-xs text-MM-black">Subtítulo</span>
                  ) : (
                    <div className="text-xs text-MM-black">
                      <div className="font-medium">{item.component || 'Overlay'}</div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}