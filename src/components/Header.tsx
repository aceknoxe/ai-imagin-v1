"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-background/70 backdrop-blur-2xl border border-primary/10 rounded-2xl p-4 z-50 shadow-lg">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-primary">
          AI Imagine <span className="text-xs align-super">BETA</span>
        </Link>
        
        <button 
          className="md:hidden text-2xl text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <ul className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row absolute md:relative top-full left-0 md:top-auto md:left-auto right-0 md:right-auto mt-2 md:mt-0 bg-background/90 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-4 md:p-0 rounded-xl md:rounded-none border border-primary/10 md:border-none gap-2 md:gap-8 min-w-[200px] md:min-w-0`}>
          <li>
            <Link 
              href="/" 
              className={`block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 ${
                pathname === '/' ? 'text-primary' : 'text-text'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
          </li>
          <li>
            <Link 
              href="/gallery" 
              className={`block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 ${
                pathname === '/gallery' ? 'text-primary' : 'text-text'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/10 ${
                pathname === '/about' ? 'text-primary' : 'text-text'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 