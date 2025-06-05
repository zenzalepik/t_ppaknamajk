'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradientSecondary45">
      <Image src="/images/png/404.png" alt="404" className="w-1/2 mb-6 rounded-[32px]" width={678} height={678} />
      <h1 className="text-title_large font-bold text-white/40">404 - Page Not Found</h1>
      <p className="mb-4 text-white/20">Maaf, halaman yang kamu cari tidak ditemukan.</p>
      <button
        className="px-4 py-2 bg-primary text-white rounded-[16px]"
        onClick={() => router.push('/dashboard')}
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
}
