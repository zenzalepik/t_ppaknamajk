// helpers/statusLabel.js
import React from 'react';

// Fungsi untuk mengecek apakah masa aktif masih berlaku
const isStillActive = (expiryDate) => {
  const now = new Date();
  const expiration = new Date(expiryDate);
  return expiration >= now;
};

export const StatusLabel = {
  settlementStatus: (status) => {
    let bgColor = '';
    let textColor = '';
    let label = '';

    switch (status) {
      case 'settled':
        bgColor = 'bg-success/10';
        textColor = 'text-success';
        label = 'Settled';
        break;
      case 'pending':
        bgColor = 'bg-warning/10';
        textColor = 'text-warning';
        label = 'Pending';
        break;
      case 'failed':
        bgColor = 'bg-danger/10';
        textColor = 'text-danger';
        label = 'Gagal';
        break;
      // case 'refund':
      //   bgColor = 'bg-blue-100';
      //   textColor = 'text-blue-800';
      //   label = 'Refund';
      //   break;
      default:
        bgColor = 'bg-tag';
        textColor = 'text-black/64';
        label = status || 'Unknown';
        break;
    }

    return (
      <span
        className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${bgColor} ${textColor}`}
      >
        {label}
      </span>
    );
  },

  untukMember: (untukMember) => (
    <span
      className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
        untukMember ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
      }`}
    >
      {untukMember ? 'Ya' : 'Tidak'}
    </span>
  ),

  aksesTiket: (aksesTiket) => (
    <span
      className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
        aksesTiket ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
      }`}
    >
      {aksesTiket ? true : false}
    </span>
  ),

  aksesKartu: (aksesKartu) => (
    <span
      className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
        aksesKartu ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
      }`}
    >
      {aksesKartu ? true : false}
    </span>
  ),

  kamera: (isActive) => (
    <span
      className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
        isActive ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
      }`}
    >
      {isActive ? 'Aktif' : 'Tidak Aktif'}
    </span>
  ),

  otorisasi: (isAuthorized) => (
    <span
      className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
        isAuthorized ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
      }`}
    >
      {isAuthorized ? 'Ya' : 'Tidak'}
    </span>
  ),

  // Menambahkan status untuk kendaraan
  // status: (isActive) => (
  //   <span
  //     className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
  //       isActive ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
  //     }`}
  //   >
  //     {isActive ? 'Aktif' : 'Tidak Aktif'}
  //   </span>
  // ),

  status: (isActive) => {
    if (isActive === null || isActive === undefined) {
      return <span className="italic text-black/40">*Empty</span>;
    }

    return (
      <span
        className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
          isActive ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
        }`}
      >
        {isActive ? 'Aktif' : 'Tidak Aktif'}
      </span>
    );
  },

  // Menambahkan status untuk kendaraan
  isDendaMember: (isActive) => (
    <span
      className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
        isActive ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
      }`}
    >
      {isActive ? 'Aktif' : 'Tidak Aktif'}
    </span>
  ),

  masaAktif: (expiryDate) => {
    const active = isStillActive(expiryDate);
    return (
      <span
        className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${
          active ? 'bg-success/10 text-success' : 'bg-tag text-black/64'
        }`}
      >
        {active ? 'Aktif' : 'Tidak Aktif'}
      </span>
    );
  },

  permasalahanPerbaikan: (status) => {
    let bgColor = '';
    let textColor = '';
    let label = '';

    switch (status) {
      case 'Pending':
        bgColor = 'bg-warning/10';
        textColor = 'text-warning';
        label = 'Pending';
        break;
      case 'On Progress':
        bgColor = 'bg-info/10';
        textColor = 'text-info';
        label = 'On Progress';
        break;
      case 'Done':
        bgColor = 'bg-success/10';
        textColor = 'text-success';
        label = 'Done';
        break;
      default:
        bgColor = 'bg-tag';
        textColor = 'text-black/64';
        label = status || 'Unknown';
        break;
    }

    return (
      <span
        className={`px-3 py-1 rounded-[8px] text-label_small_semilight font-semibold ${bgColor} ${textColor}`}
      >
        {label}
      </span>
    );
  },
};
