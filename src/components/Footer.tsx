export default function Footer() {
  return (
    <footer className="p-8 border-t border-primary/10 bg-background/70 rounded-t-3xl">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary mb-2">AI Image Generator</h3>
          <p className="text-text/70 max-w-md mx-auto text-sm">
            Transform your imagination into stunning visuals using cutting-edge AI technology. 
            Create, enhance, and share your artistic visions with the world.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href="https://t.me/knoxprojects" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text/70 hover:text-primary transition-colors duration-300"
            title="Telegram"
          >
            <i className="fab fa-telegram text-2xl"></i>
          </a>
          <a 
            href="aceknox@duck.com"
            className="text-text/70 hover:text-primary transition-colors duration-300"
            title="Email"
          >
            <i className="fas fa-envelope text-2xl"></i>
          </a>
          <a 
            href="https://github.com/aceknoxe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text/70 hover:text-primary transition-colors duration-300"
            title="GitHub Repository"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
        </div>

        <div className="text-text/50 text-sm">
          <p>© {new Date().getFullYear()} AI Image Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 