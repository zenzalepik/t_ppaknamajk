export const tanggalHariIni = () => {
    const today = new Date();
    return today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };
  