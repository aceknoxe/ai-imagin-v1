import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "Transform your words into stunning visuals",
  icons: {
    // Basic favicon
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    // Apple Touch Icon
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    // Other icons
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#d7db8b', // Your primary color
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#0b0c04', // Your background color
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI Image Generator',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body className="min-h-screen bg-background text-text flex flex-col">
        <Header />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
