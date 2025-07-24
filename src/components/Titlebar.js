// components/Titlebar.js
'use client';

import { useEffect, useState } from 'react';
import ElecUpdateButton from '@/components/ElecUpdateButton';

export default function Titlebar() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ✅ Pindahkan ke luar useEffect agar tidak undefined
  const handleFullscreen = () => {
    window.ipcRenderer.send('set-fullscreen', true);
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    window.ipcRenderer.send('set-fullscreen', false);
    setIsFullscreen(false);
  };

  useEffect(() => {
    const minimize = () => window.electronAPI?.minimize();
    const maximize = () => window.electronAPI?.maximize();
    const close = () => window.electronAPI?.close();

    const handleFullscreen = () => {
      window.ipcRenderer.on('set-fullscreen', () => {}); // Opsional, kalau mau dengar respon
      window.ipcRenderer.send('set-fullscreen', true); // ✅ Aktifkan fullscreen
    };

    const handleExitFullscreen = () => {
      window.ipcRenderer.send('set-fullscreen', false); // ✅ Keluar fullscreen
    };

    document.getElementById('min-btn')?.addEventListener('click', minimize);
    document.getElementById('max-btn')?.addEventListener('click', maximize);
    document.getElementById('close-btn')?.addEventListener('click', close);

    return () => {
      document
        .getElementById('min-btn')
        ?.removeEventListener('click', minimize);
      document
        .getElementById('max-btn')
        ?.removeEventListener('click', maximize);
      document.getElementById('close-btn')?.removeEventListener('click', close);
    };
  }, []);

  return (
    <div
      className={isFullscreen ? 'evo_title_bar_fullsreen' : 'evo_title_bar'}
      // style={{
      //   WebkitAppRegion: 'drag',
      // }}
    >
    
      <div
        // style={{
        //   WebkitAppRegion: 'drag',
        // }}
        className=" flex justify-between items-center w-full"
      >
        <div
          className="flex items-center justify-start w-fit max-w-fit"
          // style={{ WebkitAppRegion: 'no-drag' }}
        >
          <button
            className="w-[140px] text-[14px] text-white/40 hover:text-white bg-white/[0.05] py-1 px-3 hover:bg-white/10 border-x border-black/20"
            onClick={() => window.history.back()}
          >
            {'< '}Kembali
          </button>
          <button
            className="w-[140px] ml-3 text-[14px] text-white/40 hover:text-white bg-white/[0.05] py-1 px-3 hover:bg-white/10 border-x border-black/20"
            onClick={() => window.location.reload()}
          >
            Muat Ulang ⟳
          </button>
        </div>

        <div
          className="w-full h-full"
          style={{ WebkitAppRegion: 'drag' }}
        ></div>
        <div
          className="flex items-center w-fit justify-end  max-w-fit"
          // style={{ WebkitAppRegion: 'no-drag' }}
        >
          <ElecUpdateButton />
          {/* Fullscreen icon */}
          {!isFullscreen && (
            <button
              onClick={handleFullscreen}
              className="w-[44px] h-[32px] px-2 ml-3 flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] text-white rounded"
              title="Fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 3H22V9H20V5H16V3ZM2 3H8V5H4V9H2V3ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z"></path>
              </svg>
            </button>
          )}

          {/* Exit Fullscreen icon */}
          {isFullscreen && (
            <button
              onClick={handleExitFullscreen}
              className="w-[44px] h-[32px] px-2 ml-2 flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.1] text-white rounded"
              title="Exit Fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 7H22V9H16V3H18V7ZM8 9H2V7H6V3H8V9ZM18 17V21H16V15H22V17H18ZM8 15V21H6V17H2V15H8Z"></path>
              </svg>
            </button>
          )}

          <button
            className="ml-9 hover:scale-100 hover:transform-none text-[20px] text-white/40 hover:text-white bg-white/[0.05] py-1 px-3  hover:bg-white/10 border-x border-black/20"
            id="min-btn"
          >
            —
          </button>
          <button
            className="hover:scale-100 hover:transform-none text-[20px] text-white/40 hover:text-white bg-white/[0.05] py-1 px-3  hover:bg-white/10 border-x border-black/20"
            id="max-btn"
          >
            ▢
          </button>
          <button
            className="hover:scale-100 hover:transform-none text-[20px] text-white/40 hover:text-danger bg-white/[0.05] py-1 px-3  hover:bg-danger/40 border-x border-black/20"
            id="close-btn"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
