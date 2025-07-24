import { useState } from 'react';
import EvoNotifCard from '@/components/EvoNotifCard';

export default function ElecUpdateButton() {
  const [status, setStatus] = useState('Idle');
  const [showUpgrade, setShowUpgrade] = useState(false);

  // 🔔 State untuk notifikasi
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const handleCek = async () => {
    setStatus('Memeriksa versi terbaru...');
    try {
      const result = await window.electronAPI.checkUpdate();
      console.log(result.raw); // misalnya: "VERSI_TERBARU"
      if (result.updateAvailable) {
        setStatus('✅ Ada versi baru!');
        setShowUpgrade(true);
        setNotifType('info');
        setNotifMessage('🔔 Versi baru tersedia! Silakan lakukan update.');
      } else {
        setStatus('✅ Sudah versi terbaru');
        setNotifType('success');
        setNotifMessage('Aplikasi sudah menggunakan versi terbaru.');
      }
    } catch (err) {
      setStatus('❌ Gagal memeriksa update');
      setNotifType('error');
      setNotifMessage('Terjadi kesalahan saat memeriksa versi. ' + err);
    }
  };

  const handleUpgrade = async () => {
    setStatus('⬇️ Sedang mengupdate sistem...');
    try {
      const result = await window.electronAPI.runUpdate();
      console.log(result.raw); // misalnya: "VERSI_TERBARU"
      if (result.success) {
        setStatus('✅ Update berhasil!');
        setNotifType('success');
        setNotifMessage('Aplikasi berhasil diperbarui!');
      } else {
        setStatus('❌ Gagal update: ' + result.message);
        setNotifType('error');
        setNotifMessage('Gagal melakukan update: ' + result.message);
      }
    } catch (err) {
      setStatus('❌ Gagal update');
      setNotifType('error');
      setNotifMessage('Terjadi kesalahan saat update.' + err);
    }
  };

  return (
    <div className="flex w-full items-center">
      {/* 🔔 Notifikasi muncul di bagian atas tombol */}
      {notifMessage && (
        <EvoNotifCard
          type={notifType}
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          autoClose
        />
      )}

      {status != '✅ Ada versi baru!' &&
      status != '⬇️ Mengunduh dan mengupdate...' &&
      status != 'Memeriksa versi terbaru...' ? (
        <button
          onClick={handleCek}
          className="w-[140px] mr-16 text-[14px] text-white/40 hover:text-white bg-white/[0.05] py-1 px-3 hover:bg-white/10 border-x border-black/20"
        >
          Cek Update
        </button>
      ) : (
        <></>
      )}
      {status != 'Idle' ? (
        <div
          className={`${
            status == '⬇️ Mengunduh dan mengupdate...'
              ? 'min-w-[340px]'
              : 'min-w-[140px]'
          } text-[14px] ml-2`}
        >
          {status}
        </div>
      ) : (
        <></>
      )}
      {showUpgrade && status != '✅ Update berhasil!' && (
        <button
          onClick={handleUpgrade}
          className="w-[240px] ml-3 rounded-[12px] text-[14px] py-1 mr-5"
          style={{ background: 'red', color: 'white' }}
        >
          Upgrade Aplikasi
        </button>
      )}
    </div>
  );
}
