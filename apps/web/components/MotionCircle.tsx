import { motion } from 'framer-motion';

interface MotionCircleProps {
  size?: number;
  className?: string;
}

export function MotionCircle({ size = 200, className = '' }: MotionCircleProps) {
  const gradients = [
    'from-mm-cyan to-transparent',
    'from-mm-magenta to-transparent',
    'from-mm-yellow to-transparent',
    'from-mm-purple to-transparent',
  ];

  return (
    <div className={`relative ${className}`}>
      {gradients.map((gradient, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 30% 30%, ${gradient}, transparent 70%)`,
            animationDelay: `${i * 0.5}s`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}