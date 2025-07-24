import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const KendaraanForm = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  dataKendaraan = {}, // Expects: { kendaraan_id: [...] }
  dataJenisKendaraan = { data: [] },
  existingData = [],
  parentData = {},
  addFormParentData = {},
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: masterDataDataKendaraan,
    errorDataKendaraan,
    isLoadingDataKendaraan,
  } = useQuery({
    queryKey: ['masterDataDataKendaraan', currentPage],
    queryFn: () =>
      fetchApiMasterDataDataKendaraan({
        limit: 905,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () => fetchApiPengaturanParameterTipeKendaraan(),
  });

  const [formData, setFormData] = useState({
    nomor_polisi: '',
    kendaraan_id: '',
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      nomor_polisi: '',
      kendaraan_id: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        nomor_polisi: '',
        kendaraan_id: '',
      });
    }
  }, [editData]);

  // Clear notifikasi saat modal ditutup
  useEffect(() => {
    if (!isOpen) {
      setNotifMessage('');
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nomor_polisi:
        formData.nomor_polisi === '' ? 'Nomor Polisi wajib diisi' : '',
      kendaraan_id:
        formData.kendaraan_id === '' ? 'Jenis Kendaraan wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    const isDuplicate = existingData.some(
      (item) =>
        item.nomor_polisi.toLowerCase() ===
          formData.nomor_polisi.toLowerCase() &&
        (!editData || item.nomor_polisi !== editData.nomor_polisi)
    );

    if (isDuplicate) {
      setNotifMessage('Nomor Polisi sudah terdaftar.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    setNotifMessage(
      editData
        ? 'Data kendaraan berhasil diperbarui!'
        : 'Data kendaraan berhasil ditambahkan!'
    );
    setNotifType('success');

    setTimeout(() => handleCloseModal(), 1000);
  };

  if (isLoadingDataKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorDataKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorDataKendaraan)} />
    ); // ✅ Pastikan error ditampilkan di UI
  }

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={editData ? 'Edit Kendaraan' : 'Tambah Kendaraan'}
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
          noform={true}
        >
          <EvoInText
            name="nomor_polisi"
            label="Nomor Polisi"
            placeholder="Masukkan nomor polisi"
            value={formData.nomor_polisi}
            onChange={handleChange}
            error={errors.nomor_polisi}
          />
          <EvoInDropdown
            name="kendaraan_id"
            label="Jenis Kendaraan"
            // options={(dataKendaraan?.data || []).map((item) => {
            //   const tipe = dataJenisKendaraan?.data.find(
            //     (tipe) => tipe.id === item.tipe_kendaraan_id
            //   );
            //   return {
            //     ...item,
            //     label: `${item.nama_kendaraan} (${
            //       tipe?.tipe_kendaraan || 'Tidak Diketahui'
            //     })`,
            //     value: `${item.id || 0}`,
            //   };
            // })}
            // value={formData.kendaraan_id}
            // onChange={(value) => {
            //   setFormData((prev) => ({ ...prev, kendaraan_id: value }));
            // }}
            options={(addFormParentData?.list_id_kendaraan?.length > 0
              ? addFormParentData?.list_id_kendaraan || []
              : parentData?.json?.produk_member?.list_id_kendaraan || []
            ).map((id) => {
              const kendaraan = masterDataDataKendaraan?.data?.find(
                (item) => item.id === Number(id) // cocokkan angka
              );

              return {
                label: kendaraan
                  ? `${kendaraan.nama_kendaraan} (${
                      kendaraan.tipe_kendaraan?.tipe_kendaraan || 'Tanpa Tipe'
                    })`
                  : `ID ${id} (Tidak Ditemukan)`,
                value: id, // tetap string, supaya cocok dengan formData
              };
            })}
            value={formData.kendaraan_id}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, kendaraan_id: value }));
            }}
            error={errors.kendaraan_id}
            placeholder="Pilih Jenis Kendaraan"
          />
          {/* <>
            {JSON.stringify(parentData?.json?.produk_member?.list_id_kendaraan)}{' '}
            ++++ {JSON.stringify(addFormParentData?.list_id_kendaraan)}
          </> */}
          {/* <br />
          {parentData?.json?.produk_member?.list_id_kendaraan +
            '++++' +
            addFormParentData?.list_id_kendaraan} */}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default KendaraanForm;
