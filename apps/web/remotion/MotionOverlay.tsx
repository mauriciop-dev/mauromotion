import React from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MotionOverlayProps {
  component: 'FloatingCard' | 'TypingText' | 'PulseCircle' | 'GradientBox';
  text?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  startTime: number;
  duration: number;
  isActive: boolean;
}

export const MotionOverlay: React.FC<MotionOverlayProps> = ({
  component,
  text,
  position = { x: 0, y: 0 },
  size = { width: 200, height: 100 },
  isActive,
}) => {
  const controls = useAnimation();

  React.useEffect(() => {
    if (isActive) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 }
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 }
      });
    }
  }, [isActive, controls]);

  return (
    <motion.div
      className="mm-card-cyber bg-MM-bg-card border border-MM-border-glow"
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: size.width,
        height: size.height,
      }}
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="p-4">
        {text && (
          <span className="text-MM-text-primary font-medium">
            {text}
          </span>
        )}
      </div>
    </motion.div>
  );
};