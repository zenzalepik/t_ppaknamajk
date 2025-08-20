import React, { useState } from 'react';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import { motion } from 'framer-motion';

export default function FilterMasDataPengguna({
  isOpenFilter,
  onChangeFilter,
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    namaPerusahaan: '',
    produkMember: '',
  });

  const [selectedKendaraan, setSelectedKendaraan] = useState({
    all: true,
    active: false,
    inactive: false,
  });

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
    onChangeFilter({ ...selectedOptions, [name]: value });
  };

  const handleChangeStatusKendaraan = (e, answer) => {
    const { checked } = e.target;
    setSelectedKendaraan((prev) => ({ ...prev, [answer.value]: checked }));
    onChangeFilter({
      ...selectedOptions,
      kendaraan: { ...selectedKendaraan, [answer.value]: checked },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -90, transformOrigin: 'top' }} // Mulai dari posisi atas
      animate={
        isOpenFilter ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }
      }
      exit={{ opacity: 0, rotateX: -90 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex gap-3 w-full py-6 px-6 rounded-[24px] border border-border/40 shadow-cardInfo"
    >
      <div className="flex gap-3 w-full">
        <EvoInDropdown
          name="namaPerusahaan"
          label="Nama Perusahaan"
          options={[
            { label: 'PT Sukses Jaya', value: 'sukses_jaya' },
            { label: 'CV Maju Bersama', value: 'maju_bersama' },
            { label: 'PT Teknologi Nusantara', value: 'teknologi_nusantara' },
            { label: 'UD Berkah Sejahtera', value: 'berkah_sejahtera' },
            { label: 'PT Inovasi Digital', value: 'inovasi_digital' },
          ]}
          value={selectedOptions.namaPerusahaan}
          onChange={handleDropdownChange}
          placeholder="Pilih perusahaan"
          className="basis-full"
        />

        <EvoInDropdown
          name="produkMember"
          label="Produk Member"
          options={[
            { label: 'Member Silver', value: 'silver' },
            { label: 'Member Gold', value: 'gold' },
            { label: 'Member Platinum', value: 'platinum' },
            { label: 'Member Corporate', value: 'corporate' },
            { label: 'Member VIP', value: 'vip' },
          ]}
          value={selectedOptions.produkMember}
          onChange={handleDropdownChange}
          placeholder="Pilih produk member"
          className="basis-full"
        />
      </div>

      <div className="flex gap-3 !w-[304px]">
        <EvoInCheckbox
          label="Status"
          horizontal={true}
          answers={[
            { label: 'All', value: 'all', checked: selectedKendaraan.all },
            {
              label: 'Aktif',
              value: 'active',
              checked: selectedKendaraan.active,
            },
            {
              label: 'Tidak Aktif',
              value: 'inactive',
              checked: selectedKendaraan.inactive,
            },
          ]}
          onChange={handleChangeStatusKendaraan}
        />
      </div>
    </motion.div>
  );
}
