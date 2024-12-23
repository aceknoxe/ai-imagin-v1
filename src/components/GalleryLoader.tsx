"use client";

export default function GalleryLoader() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="bg-background/70 backdrop-blur-xl border border-primary/10 rounded-xl overflow-hidden"
        >
          <div className="relative pt-[100%]">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-primary/5 rounded animate-pulse" />
            <div className="h-3 bg-primary/5 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
} 