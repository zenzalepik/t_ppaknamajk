'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  RiUser3Line,
  RiLock2Line,
  RiEyeLine,
  RiEyeOffLine,
  RiRoadMapLine,
} from '@remixicon/react';
import strings from '@/utils/strings';
import routes from '@/utils/routes';
import EvoNotifCard from '@/components/EvoNotifCard';
import { sanitizeInput } from '@/utils/security';
import { getToken, setToken, getUserId, setUserId } from '@/utils/db';
import { encryptText } from '@/utils/encryption';
import { usePengaturanGlobalFromLocal } from '@/app/pengaturan/global/hooks/usePengaturanGlobalFromLocal';
import { useSyncPengaturanGlobal } from '@/app/pengaturan/global/hooks/useSyncPengaturanGlobal';


export default function LoginPage() {
  useSyncPengaturanGlobal();
  const dataGlobal = usePengaturanGlobalFromLocal()?.data?.[0];

  console.log(dataGlobal);

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notif, setNotif] = useState({ message: '', type: 'error' });

  // ✅ Gunakan `useEffect` untuk cek apakah user sudah login
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        router.push(routes.dashboard); // ✅ Redirect langsung ke Dashboard jika ada token
      }
    };

    checkAuth();
  }, [router]);

  // ✅ Regex untuk validasi email dan password
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimal 8 karakter, ada huruf & angka

// const validateInput = (email, password) => {
//   if (!emailRegex.test(email)) {
//     return { valid: false, message: 'Format email tidak valid!' };
//   }
//   if (!passwordRegex.test(password)) {
//     return { valid: false, message: 'Password harus minimal 8 karakter dan mengandung huruf & angka!' };
//   }
//   return { valid: true };
// };

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotif({ message: 'Memproses login...', type: 'info' });

    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

  // ✅ Validasi input sebelum kirim ke API
  // const validationResult = validateInput(cleanEmail, cleanPassword);
  // if (!validationResult.valid) {
  //   setNotif({ message: validationResult.message, type: 'error' });
  //   return;
  // }

    try {
      const response = await fetch(`${strings.apiUrl}/auth/login`, {
        // ✅ Gunakan API login yang baru
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        body: JSON.stringify({ username: cleanEmail, password: cleanPassword }),
      });

      const data = await response.json();
      console.log(
        JSON.stringify({ email: cleanEmail, password: cleanPassword })
      );
      // console.log(data);
      if (!response.ok) throw new Error(data.message); // ✅ Sesuaikan dengan format error baru

      const token = data.results.token;
      const user_id = data.results.user_id;
      await setToken(token);
      await setUserId(user_id);

      setNotif({ message: 'Login berhasil!', type: 'success' });
      setTimeout(() => {
        router.push(routes.dashboard);
      }, 1500);
    } catch (error) {
      setNotif({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black">
      <EvoNotifCard
        message={notif.message}
        type={notif.type}
        onClose={() => setNotif({ message: '', type: 'error' })}
        autoClose
        autoCloseDelay={1500}
      />
      <div className="bg-[#0F172A] overflow-hidden flex w-[70%] max-w-[1140px] border border-primaryTransparent shadow-cardInfo rounded-[40px]">
        {/* Form Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 md:pl-12 md:pr-0 p-6">
          <h1 className="text-h1 text-center font-bold text-primary mb-2">
            LOGIN AKUN
          </h1>
          <div className="flex flex-col mb-8 p-2 border border-border/20 rounded-[24px]">
            <p className="text-title_large text-center text-white mb-0 font-semibold">
              {dataGlobal?.nama_operator || strings.appName}
            </p>

            <div className="opacity-40 flex gap-1 justify-center items-center text-article text-center text-white">
              <RiRoadMapLine size={20} />
              {dataGlobal?.nama_lokasi || strings.locationName}
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <RiUser3Line
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3  rounded-[16px] bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <RiLock2Line
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Kata sandi"
                className="w-full pl-10 pr-10 py-3  rounded-[16px] bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary"
              >
                {showPassword ? (
                  <RiEyeOffLine size={20} />
                ) : (
                  <RiEyeLine size={20} />
                )}
              </div>
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-orange-600 transition py-3 rounded-[16px] text-white font-semibold"
            >
              Masuk
            </button>
          </form>

          <p className="mt-8 text-label_small_reguler text-center text-gray-400">
            {strings.copyRight}
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-[480px] !max-w-[480px] items-center justify-center bg-black relative mr-8 ml-12 mt-8 mb-8">
          <Image
            src="/images/png/img_login.png"
            alt="Login Illustration"
            className="max-w-[480px] max-h-[480px] w-full h-full object-cover rounded-[40px] overflow-hidden"
            width={480}
            height={480}
          />
          <div className="absolute top-6 right-6 w-10 h-10 overflow-hidden rounded-[12px]">
            <Image
              src="/images/png/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className=" w-10 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
