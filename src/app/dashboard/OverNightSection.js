'use client';

import React from 'react';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoBtnDropdown from '@/components/evosist_elements/EvoBtnDropdown';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import EvoChartLine from '@/components/evosist_elements/EvoChartLine';
import { RiSearchLine, RiUser3Line } from '@remixicon/react';
import { getDefaultDateAwal, getDefaultDateAkhir } from '@/helpers/dateRangeHelper';

export default function OverNightSection() {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const tableData = {
    columns: [
      { label: 'No.' },
      { label: 'Tiket ID' },
      { label: 'Plat Nomor' },
      { label: 'Kendaraan' },
      { label: 'Waktu' },
      { label: 'Lokasi Gerbang' },
      { label: 'Buka/Tutup' },
      { label: 'Petugas' },
      { label: 'Status Palang' },
    ],
    rows: [
      {
        ticket: 'TKT-000001',
        plate: 'B 1234 ABC',
        type: 'Mobil',
        time: '2025-04-21 07:00:12',
        gate: 'Gerbang Utama 1',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },

      {
        ticket: 'TKT-000077',
        plate: 'B 1234 ABC',
        type: 'Mobil',
        time: '2025-04-21 07:00:12',
        gate: 'Gerbang Utama 1',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000002',
        plate: 'D 5678 XYZ',
        type: 'Motor',
        time: '2025-04-21 07:05:12',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000003',
        plate: 'F 6789 BCD',
        type: 'Mobil',
        time: '2025-04-21 07:10:12',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Rudi',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000004',
        plate: 'E 3344 QWE',
        type: 'Motor',
        time: '2025-04-21 07:15:00',
        gate: 'Gerbang Utama 2',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000005',
        plate: 'G 8899 MMM',
        type: 'Mobil',
        time: '2025-04-21 07:30:15',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Sari',
        result: 'Gagal (Sensor)',
      },
      {
        ticket: 'TKT-000006',
        plate: 'H 9988 ZZZ',
        type: 'Motor',
        time: '2025-04-21 07:40:05',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000007',
        plate: 'B 9876 PQR',
        type: 'Mobil',
        time: '2025-04-21 07:45:30',
        gate: 'Gerbang Utama 1',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000008',
        plate: 'D 6789 LMN',
        type: 'Motor',
        time: '2025-04-21 07:50:12',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000009',
        plate: 'F 1234 GHI',
        type: 'Mobil',
        time: '2025-04-21 07:55:00',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Rudi',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000010',
        plate: 'B 5678 CBA',
        type: 'Motor',
        time: '2025-04-21 08:00:00',
        gate: 'Gerbang Utama 2',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000011',
        plate: 'E 1122 QAZ',
        type: 'Mobil',
        time: '2025-04-21 08:05:15',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Sari',
        result: 'Gagal (Sensor)',
      },
      {
        ticket: 'TKT-000012',
        plate: 'H 5566 ZXC',
        type: 'Motor',
        time: '2025-04-21 08:10:10',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000013',
        plate: 'F 7788 RST',
        type: 'Mobil',
        time: '2025-04-21 08:15:45',
        gate: 'Gerbang Utama 1',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Andi',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000014',
        plate: 'D 2233 BNM',
        type: 'Motor',
        time: '2025-04-21 08:20:25',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000015',
        plate: 'B 7788 QWE',
        type: 'Mobil',
        time: '2025-04-21 08:25:35',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Sari',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000016',
        plate: 'G 4455 ASX',
        type: 'Motor',
        time: '2025-04-21 08:30:00',
        gate: 'Gerbang Utama 2',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000017',
        plate: 'C 5566 POI',
        type: 'Mobil',
        time: '2025-04-21 08:35:50',
        gate: 'Gerbang Utama 1',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000018',
        plate: 'F 3344 KLM',
        type: 'Motor',
        time: '2025-04-21 08:40:30',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000019',
        plate: 'H 1234 CVB',
        type: 'Mobil',
        time: '2025-04-21 08:45:15',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Andi',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000020',
        plate: 'B 9090 LKJ',
        type: 'Motor',
        time: '2025-04-21 08:50:45',
        gate: 'Gerbang Utama 2',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000021',
        plate: 'E 9988 QPA',
        type: 'Mobil',
        time: '2025-04-21 08:55:55',
        gate: 'Gerbang Utama 1',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000022',
        plate: 'G 8877 ZXC',
        type: 'Motor',
        time: '2025-04-21 09:00:20',
        gate: 'Gerbang Barat',
        status: 'Masuk',
        open: 'Terbuka',
        officer: 'Sistem Otomatis',
        result: 'Sukses',
      },
      {
        ticket: 'TKT-000023',
        plate: 'B 5566 ASD',
        type: 'Mobil',
        time: '2025-04-21 09:05:35',
        gate: 'Gerbang Timur',
        status: 'Keluar',
        open: 'Tertutup',
        officer: 'Petugas: Sari',
        result: 'Gagal (Sensor)',
      },
      {
        ticket: 'TKT-000024',
        plate: 'C 3344 FGH',
        type: 'Motor',
        time: '2025-04-21 09:10:05',
        gate: 'Gerbang Utama 2',
        status: 'Masuk',
        open: 'Tertutup',
        officer: 'Petugas: Sari',
        result: 'Gagal (Sensor)',
      },
      {
        ticket: 'TKT-000025',
        plate: 'C 3345 FGH',
        type: 'Motor',
        time: '2025-04-21 09:10:05',
        gate: 'Gerbang Utama 2',
        status: 'Masuk',
        open: 'Tertutup',
        officer: 'Petugas: Sari',
        result: 'Gagal (Sensor)',
      },
    ],
  };

  const data = {
    labels: [
      'April 21',
      'April 22',
      'April 23',
      'April 24',
      'April 25',
      'April 26',
      'April 27',
      'April 28',
      'April 29',
      'April 30',
    ],
    datasets: [
      {
        // label: 'Motor',
        data: [20, 25, 15, 20, 22, 18, 28, 32, 30, 35],
        borderColor: '#FF5B2A',
        backgroundColor: '#FF5B2A',
        pointBackgroundColor: 'black',
      },
    ],
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  return (
    <EvoCardSection>
      <EvoTitleSection
        title="Over Night"
        handleChange={handleChange}
        onDateAkhir={getDefaultDateAkhir}
        onDateAwal={getDefaultDateAwal}
        onDateChange={handleDateChange}
      />
      <EvoChartLine data={data} />
    </EvoCardSection>
  );
}
