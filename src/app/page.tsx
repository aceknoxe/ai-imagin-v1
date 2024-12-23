"use client";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
      setRemaining(data.remaining);
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center px-8 py-28">
      <div className="w-full max-w-3xl bg-background/70 backdrop-blur-2xl rounded-3xl p-8 shadow-lg border border-primary/10">
        <h1 className="text-4xl font-semibold text-primary text-center mb-8">
          AI Image Generator
        </h1>
        
        <div className="w-full h-[300px] sm:h-[400px] sm:w-[400px] md:w-full bg-primary/5 border border-primary/10 rounded-xl mb-8 flex justify-center items-center overflow-hidden mx-auto">
          {loading ? (
            <Loader />
          ) : generatedImage ? (
            <div className="relative w-full h-full">
              <img
                src={generatedImage}
                alt="Generated artwork"
                className="w-full h-full object-contain"
                onLoad={() => setLoading(false)}
              />
              <button 
                onClick={() => window.open(generatedImage, '_blank')}
                className="absolute bottom-4 right-4 p-2 rounded-lg bg-primary/20 backdrop-blur hover:bg-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <i className="fas fa-download text-text"></i>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-text/50">
              <i className="fas fa-image text-5xl"></i>
              <p>Your imagination will appear here</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your imagination..."
              className="flex-1 p-4 rounded-xl bg-primary/10 text-text border-none outline-none focus:bg-primary/15 transition-all duration-300"
              disabled={loading}
            />
            <p className="text-text/50 text-sm">
              Note: Adult content, violence, and illegal content are not allowed.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-8 py-4 rounded-3xl bg-gradient-to-r from-secondary to-accent text-text font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}

        {remaining !== null && (
          <div className="text-text/70 text-sm text-center mt-4">
            {remaining} generations remaining today
          </div>
        )}
      </div>
    </main>
  );
}
