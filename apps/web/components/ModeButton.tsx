import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ModeButtonProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent: 'cyan' | 'magenta' | 'yellow';
}

export function ModeButton({ id, title, description, icon: Icon, href, accent }: ModeButtonProps) {
  const accentColors = {
    cyan: 'text-mm-cyan border-mm-cyan hover:shadow-cyan-glow',
    magenta: 'text-mm-magenta border-mm-magenta hover:shadow-magenta-glow',
    yellow: 'text-mm-yellow border-mm-yellow hover:shadow-yellow-glow',
  };

  return (
    <Link href={href}>
      <motion.div
        className={`mm-card-cyber p-6 rounded-xl border-2 transition-all duration-300 ${accentColors[accent]}`}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-mm-bg-surface">
            <Icon className={`w-6 h-6 text-mm-${accent}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-mm-text-secondary">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}