import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'MauroMotion - AI Motion Graphics & Cinema Engine',
  description: 'Edita videos, crea videos y genera sitios web usando motion graphics impulsados por IA',
  keywords: 'motion graphics, AI video, editing, cinema, animation',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" className="dark">
      <head />
      <body className="min-h-screen bg-MM-bg-main text-MM-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}