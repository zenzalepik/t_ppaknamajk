import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import EvoTable from '@/components/evosist_elements/EvoTable';

const levelData = {
  no: 1,
  nama: 'Admin',
  perusahaan: 'PT. KAS',
  hakAkses: [
    {
      nama_menu: 'Dashboard',
      nama_sub_menu: null,
      aksi: { create: true, read: true, update: true, delete: true },
    },
    {
      nama_menu: 'Master',
      nama_sub_menu: [
        {
          nama: 'User',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama: 'Level Akses',
          aksi: {
            create: true,
            read: true,
            update: true,
            delete: true,
            konfigurasi_menu: true,
          },
        },
        {
          nama: 'Produk Member',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama: 'Produk Voucher',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama: 'Data Member',
          aksi: {
            create: true,
            read: true,
            update: true,
            delete: true,
            perpanjang: true,
            ganti_kartu: true,
            ganti_nopol: true,
          },
        },
        {
          nama: 'Data Voucher',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama: 'POS',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama: 'Kendaraan',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        { nama: 'Shift', aksi: { create: true, update: true, delete: true } },
        {
          nama: 'Perusahaan',
          aksi: { create: true, read: true, update: true, delete: true },
        },
      ],
    },
    {
      nama_menu: 'Setting',
      nama_sub_menu: [
        {
          nama: 'Tarif Parkir',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama: 'Tarif Denda',
          aksi: { create: true, read: true, update: true, delete: true },
        },
        { nama: 'Parameter', aksi: { read: true, update: true } },
        { nama: 'Global', aksi: { read: true, update: true } },
        { nama: 'Payment', aksi: { read: true, update: true } },
      ],
    },
    {
      nama_menu: 'Transaksi',
      nama_sub_menu: [
        { nama: 'Manual mix', aksi: null },
        { nama: 'Pembatalan Transaksi', aksi: null },
        {
          nama: 'Permasalahan atau Perbaikan',
          aksi: {
            create_permasalahan: true,
            create_perbaikan: true,
            read: true,
            update: true,
            delete: true,
          },
        },
      ],
    },
    {
      nama_menu: 'Report',
      nama_sub_menu: [
        { nama: 'Kendaraan', aksi: null },
        { nama: 'Overnight', aksi: null },
        { nama: 'Pendapatan Parkir', aksi: null },
        { nama: 'Pendapatan Gabungan', aksi: null },
        { nama: 'Pendapatan Member', aksi: null },
        { nama: 'Pendapatan Voucher', aksi: null },
        { nama: 'Pembatalan Transaksi', aksi: null },
        { nama: 'Audit Transaksi', aksi: null },
        { nama: 'Settlement Cashless', aksi: null },
      ],
    },
  ],
  added: '31-10-2022 14:39',
  updated: '31-10-2022 14:39',
};

const AddLevelPenggunaForm = ({ isOpen, onClose, onSubmit }) => {
  const [namaHakAkses, setNamaHakAkses] = useState(levelData.nama);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState({});

  const handleCheckboxChange = (e, answer, menuName) => {
    const { checked } = e.target;
    const key = `${menuName}-${answer.value}`;

    setSelectedOptions((prev) => ({
      ...prev,
      [key]: checked,
    }));

    setErrors((prev) => ({
      ...prev,
      [answer.name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ namaHakAkses, selectedOptions });
  };

  // **Transform levelData ke format rows untuk EvoTable**
  const rows = levelData.hakAkses.flatMap((menu) => {
    const parentRow = {
      menu: <b>{menu.nama_menu}</b>, // Menu utama ditampilkan tebal
      actions: (
        <div className="inline-flex gap-4 justify-start items-start">
          {menu.aksi
            ? Object.keys(menu.aksi).map((aksiKey) => (
                <EvoInCheckbox
                  key={`${menu.nama_menu}-${aksiKey}`}
                  horizontal={true}
                  type="hak akses"
                  name={menu.nama_menu}
                  answers={[
                    {
                      label: aksiKey,
                      value: aksiKey,
                      checked:
                        selectedOptions[`${menu.nama_menu}-${aksiKey}`] ??
                        menu.aksi[aksiKey],
                    },
                  ]}
                  onChange={(e, answer) =>
                    handleCheckboxChange(e, answer, menu.nama_menu)
                  }
                />
              ))
            : '—'}
        </div>
      ),
    };

    if (menu.nama_sub_menu) {
      const childRows = menu.nama_sub_menu.map((submenu) => ({
        menu: ' - ' + submenu.nama, // Submenu tetap normal (tidak bold)
        actions: (
          <div className="inline-flex gap-4 justify-start items-start">
            {submenu.aksi
              ? Object.keys(submenu.aksi).map((aksiKey) => (
                  <EvoInCheckbox
                    horizontal={true}
                    type="hak akses"
                    key={`${submenu.nama}-${aksiKey}`}
                    name={submenu.nama}
                    answers={[
                      {
                        label: aksiKey,
                        value: aksiKey,
                        checked:
                          selectedOptions[`${submenu.nama}-${aksiKey}`] ??
                          submenu.aksi[aksiKey],
                      },
                    ]}
                    onChange={(e, answer) =>
                      handleCheckboxChange(e, answer, submenu.nama)
                    }
                  />
                ))
              : '—'}
          </div>
        ),
      }));

      return [parentRow, ...childRows]; // Gabungkan parent dengan child rows
    }

    return parentRow;
  });

  // **Data untuk EvoTable**
  const tableData = {
    columns: [{ label: 'Menu' }, { label: 'Hak Akses' }],
    rows,
  };

  return (
    <EvoModal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambah Level Pengguna"
      maxWidthModal="max-w-[1040px]"
    >
      <EvoForm
        onSubmit={handleSubmit}
        submitText="Simpan"
        cancelText="Batal"
        onCancel={onClose}
      >
        <EvoInText
          name="namaHakAkses"
          label="Nama Hak Akses"
          placeholder="Masukkan nama hak akses"
          value={namaHakAkses}
          onChange={(e) => setNamaHakAkses(e.target.value)}
        />

        {/* Gunakan EvoTable */}

        <label className="text-card mt-2">Pengaturan Hak Akses</label>
        <EvoTable
          id="tableToPrint"
          tableData={tableData}
          currentPage={1}
          totalPages={1}
          onPageChange={(page) => console.log('Page:', page)}
        />
      </EvoForm>
    </EvoModal>
  );
};

export default AddLevelPenggunaForm;
