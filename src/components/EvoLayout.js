'use client';

import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
// const LogConsole = dynamic(() => import('@/components/LogConsole'), {
//   ssr: false,
// });

export default function EvoLayout({ children, pageTitle = 'Page' }) {
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isElectron, setIsElectron] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 0);
    }
  };

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(window.innerHeight === screen.height);
    };

    checkFullscreen(); // check on mount
    window.addEventListener('resize', checkFullscreen);

    return () => window.removeEventListener('resize', checkFullscreen);
  }, []);

  // Simulasikan loading saat halaman pertama kali dimuat
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800); // durasi loading bisa kamu sesuaikan

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      setIsElectron(true);
    }
  }, []);

  return (
    <div
      className={`flex overscroll-contain ${
        isFullscreen
          ? 'max-h-screen '
          : isElectron
          ? 'max-h-[calc(100vh-38px)] '
          : 'max-h-screen '
      } overflow-hidden`}
    >
      <Sidebar />

      <div
        className={`evo_wrap_content flex flex-col flex-grow  ${
          isFullscreen
            ? 'max-h-screen '
            : isElectron
            ? 'max-h-[calc(100vh-38px)] '
            : 'max-h-full '
        } overflow-y-scroll gap-6 pb-6`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {/* Header */}
        <Header isScrolled={isScrolled} title={pageTitle} />

        {/* Spacer */}
        <div className="h-16 mb-6 opacity-0">space</div>

        {/* Page Content */}
        {/* <div className="px-4 md:px-8"> */}
        {/* <LogConsole /> */}
        {isLoading ? (
          // {/* Loading */}
          <div className="flex items-center justify-center h-screen">
            <Spinner size={40} color="blue-500" />
          </div>
        ) : (
          children
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
