import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'CaliGym — Bodyweight Mastery with AI Coaching',
  description: 'Evidence-based calisthenics coaching with AI-powered progression tracking. Master bodyweight skills in 90 days.',
  keywords: 'calisthenics, bodyweight training, fitness, workout program, AI coaching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${sora.className} antialiased bg-darkbg text-offwhite`}>
        {children}
      </body>
    </html>
  );
}