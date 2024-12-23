"use client";

import { useEffect, useState } from 'react';
import ImageModal from '@/components/ImageModal';
import GalleryLoader from '@/components/GalleryLoader';

interface Generation {
  _id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export default function Gallery() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Generation | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch gallery');
        }
        setGenerations(data.generations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen pt-28 px-8">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-4xl font-semibold text-primary mb-12">Gallery</h1>
        
        {loading ? (
          <GalleryLoader />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
            {generations.map((generation) => (
              <div 
                key={generation._id}
                className="bg-background/70 backdrop-blur-xl border border-primary/10 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                onClick={() => setSelectedImage(generation)}
              >
                <div className="relative pt-[100%]">
                  <img
                    src={generation.imageUrl}
                    alt={generation.prompt}
                    className="absolute inset-0 w-full h-full object-contain bg-primary/5 p-4"
                  />
                </div>
                <div className="p-4">
                  <p className="text-text/90 text-sm line-clamp-2">{generation.prompt}</p>
                  <p className="text-text/50 text-xs mt-2">
                    {new Date(generation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage.imageUrl}
            prompt={selectedImage.prompt}
            onClose={() => setSelectedImage(null)}
          />
        )}

        {!loading && generations.length === 0 && (
          <div className="text-center text-text/50 py-12">
            <i className="fas fa-images text-4xl mb-4"></i>
            <p>No images generated yet</p>
          </div>
        )}
      </div>
    </main>
  );
} 