'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';

export default function CreateVideoPage() {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-MM-bg-main text-MM-text-primary">
      <header className="flex items-center justify-between p-6 bg-MM-bg-surface border-b border-MM-border-glow">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-MM-bg-card flex items-center center justify-center">
              <span className="text-MM-cyan font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold">Crear Video</h1>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Crear Video con IA</h1>
          <p className="text-MM-text-secondary max-w-2xl mx-auto">
            Genera videos profesionales desde cero con ayuda de IA
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Formato', desc: '16:9 horizontal, 9:16 vertical o 1:1 cuadrado' },
            { title: 'Duración', desc: 'De 15 a 180 segundos según tu contenido' },
            { title: 'Tema', desc: 'Define el objetivo y estilo del video' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mm-card-cyber p-6 text-center">
                <h3 className="font-bold text-MM-text-primary mb-2">{item.title}</h3>
                <p className="text-MM-text-secondary text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-MM-cyan text-MM-black">
            Comenzar creación
          </Button>
        </div>
      </main>
    </div>
  );
}