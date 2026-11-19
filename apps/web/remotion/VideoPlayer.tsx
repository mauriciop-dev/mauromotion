import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  duration: number;
  playhead: number;
  showCaptions?: boolean;
  captions?: Array<{ text: string; start: number; end: number }>;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  duration,
  playhead,
  showCaptions = false,
  captions = [],
}) => {
  return (
    <div className="relative w-full h-full bg-MM-bg-card rounded-lg overflow-hidden border border-MM-border-glow">
      {/* Video element for client-side playback */}
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        onTimeUpdate={(e) => {
          // This would be synced with playhead
        }}
      />

      {/* Captions overlay */}
      {showCaptions && (
        <div className="absolute bottom-16 left-0 right-0 px-4">
          <div className="bg-MM-bg-card/80 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto text-MM-text-primary">
            {captions
              .filter((c) => playhead >= c.start && playhead <= c.end)
              .map((caption, i) => (
                <p key={i} className="text-center text-lg font-medium">
                  {caption.text}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};