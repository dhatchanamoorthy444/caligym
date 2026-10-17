'use client';

import { motion } from 'framer-motion';

export default function HeroVideo() {
  return (
    <motion.div
      className="relative w-full h-full rounded-lg overflow-hidden bg-navy"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            className="w-16 h-16 mx-auto rounded-full bg-orange/20 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-8 h-8 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 9.348l-7.407 7.407a1 1 0 01-1.414-1.414l7.407-7.407a1 1 0 011.414 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 9.348l-7.407 7.407a1 1 0 01-1.414-1.414l7.407-7.407a1 1 0 011.414 0z"/>
            </svg>
          </motion.div>
          <p className="text-slate-400 font-medium">Hero Video: Pull-up Tutorial</p>
          <p className="text-sm text-slate-500">Autoplay · Muted · Loop</p>
        </div>
      </div>
      {/* Video placeholder - would be <video> tag in production */}
    </motion.div>
  );
}