"use client";

import { useState } from 'react';
import { downloadImage } from '@/utils/downloadImage';

interface ImageModalProps {
  imageUrl: string;
  prompt: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, prompt, onClose }: ImageModalProps) {
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);

  const handleUpscale = async () => {
    setIsUpscaling(true);
    try {
      const response = await fetch('/api/upscale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setUpscaledUrl(data.upscaledUrl);
    } catch (error) {
      console.error('Upscale error:', error);
      alert('Failed to upscale image. Please try again.');
    } finally {
      setIsUpscaling(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-background/90 rounded-2xl p-4 border border-primary/20"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text/70 hover:text-text"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <div className="aspect-square w-full relative">
          <img
            src={upscaledUrl || imageUrl}
            alt={prompt}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={handleUpscale}
              disabled={isUpscaling || !!upscaledUrl}
              className="p-3 rounded-lg bg-primary/20 backdrop-blur hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpscaling ? (
                <i className="fas fa-spinner fa-spin text-text text-xl"></i>
              ) : upscaledUrl ? (
                <i className="fas fa-check text-text text-xl"></i>
              ) : (
                <i className="fas fa-expand text-text text-xl"></i>
              )}
            </button>
            <button 
              onClick={() => downloadImage(upscaledUrl || imageUrl, prompt)}
              className="p-3 rounded-lg bg-primary/20 backdrop-blur hover:bg-primary/30 transition-all duration-300"
              title="Download"
            >
              <i className="fas fa-download text-text"></i>
            </button>
          </div>
        </div>
        
        <p className="mt-4 text-text/90">{prompt}</p>
      </div>
    </div>
  );
} 