import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataPerusahaan } from '@/app/master_data/perusahaan/api/fetchApiMasterDataPerusahaan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiMasterDataProdukMember } from '@/app/master_data/produk_member/api/fetchApiMasterDataProdukMember';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataMemberUpdateGantiKartu } from '../api/fetchApiMasterDataDataMemberUpdateGantiKartu';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import Spinner from '@/components/Spinner';

const EditGantiKartuForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [modalKendaraanOpen, setModalKendaraanOpen] = useState(false);
  const [editKendaraan, setEditKendaraan] = useState(null);
  const [dataKendaraan, setDataKendaraan] = useState([]); // daftar kendaraan milik member

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [currentPage, setCurrentPage] = useState(1);

  const [modalProdukMemberOpen, setModalProdukMemberOpen] = useState(false);
  const [selectedProdukMember, setSelectedProdukMember] = useState(null);

  const queryClient = useQueryClient();

  const [nomorLama, setNomorLama] = useState('');

  const {
    data: masterDataPerusahaan,
    errorPerusahaan,
    isLoadingPerusahaan,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit: 305,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiPerusahaan = masterDataPerusahaan?.data || [];

  const {
    data: masterDataProdukMember,
    errorProdukMember,
    isLoadingProdukMember,
  } = useQuery({
    queryKey: ['masterDataProdukMember', currentPage],
    queryFn: () =>
      fetchApiMasterDataProdukMember({
        limit: 905,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiProdukMember = masterDataProdukMember?.data || [];

  const handleSelectProdukMember = (voucher) => {
    setSelectedProdukMember(voucher);
    setModalProdukMemberOpen(false);
  };

  const {
    data: masterDataDataKendaraan,
    error,
    isLoading,
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

  const handleDeleteKendaraan = (nomor_polisi) => {
    setDataKendaraan((prev) =>
      prev.filter((item) => item.nomor_polisi !== nomor_polisi)
    );
  };

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    no_hp: '',
    perusahaan_id: '',
    akses_tiket: false,
    akses_kartu: false,
    no_kartu: '',
    tgl_input: '',
    produk_id: '',
    tarif: '',
    biaya_member: '',
    biaya_kartu: '',
    user_id: '',
    periode: [],
    data_nomor_polisi: [],
    keterangan: '',
  });

  useEffect(() => {
    if (initialData) {
      console.log(initialData.json);

      setSelectedProdukMember(initialData.json.produk_member);

      const periodeMulai = initialData.periode?.[0]?.value || '';
      const periodeAkhir = initialData.periode?.[1]?.value || '';

      setNomorLama(initialData.no_kartu || '');

      setFormData((prev) => ({
        ...prev,
        id: initialData.id || '',
        nama: initialData.nama || '',
        no_hp: initialData.no_hp || '',
        perusahaan_id: initialData.perusahaan_id || '',
        akses_tiket: initialData.akses_tiket || false,
        akses_kartu: initialData.akses_kartu || false,
        no_kartu: initialData.no_kartu || '',
        tgl_input: initialData.tgl_input || '',
        produk_id: initialData.produk_id || '',
        tarif: initialData.tarif || '',
        biaya_member: initialData.biaya_member || '',
        biaya_kartu: initialData.biaya_kartu || '',
        user_id: initialData.user_id || '',
        periode: initialData.periode || [],
        ////////////
        data_nomor_polisi: initialData?.json?.data_nomor_polisi || [],
        keterangan: initialData?.keterangan || '',
        //////////////////
      }));

      setDataKendaraan(initialData?.json?.data_nomor_polisi || []);
    }
  }, [initialData]);

  useEffect(() => {
    // console.log('Form Data Updated:', formData);
  }, [formData]);

  // Ambil user_id secara async
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setFormData((prev) => ({ ...prev, user_id: id }));
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (dataKendaraan) {
      const kendaraanIds = dataKendaraan.map(
        (kendaraan) => kendaraan.kendaraan_id
      );
      setFormData((prev) => ({
        ...prev,
        // data_nomor_polisi: kendaraanIds,
        data_nomor_polisi: dataKendaraan,
      }));
    }
  }, [dataKendaraan]);

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     data_nomor_polisi: dataKendaraan.map((item) => item.kendaraan_id),
  //   }));
  // }, [dataKendaraan]);

  useEffect(() => {
    if (selectedProdukMember) {
      const periodeArray =
        Array.isArray(selectedProdukMember.periode) &&
        selectedProdukMember.periode.length === 2
          ? [
              selectedProdukMember.periode[0].value,
              selectedProdukMember.periode[1].value,
            ]
          : ['', ''];

      setFormData((prev) => ({
        ...prev,
        produk_id: selectedProdukMember.id,
        tarif: selectedProdukMember?.tarif,
        biaya_member: selectedProdukMember?.tarif,
        biaya_kartu: selectedProdukMember?.biaya_kartu,
        periode: periodeArray,
      }));
    }
  }, [selectedProdukMember]);

  useEffect(() => {
    const today = new Date();
    const formatted =
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' + // bulan
      String(today.getDate()).padStart(2, '0') +
      '-' + // tanggal
      today.getFullYear(); // tahun

    setFormData((prev) => ({
      ...prev,
      tgl_input: formatted,
    }));
  }, []); // kosong berarti hanya dijalankan sekali saat mount

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      nama: '',
      no_hp: '',
      perusahaan_id: '',
      akses_tiket: false,
      akses_kartu: false,
      no_kartu: '',
      // tgl_input: '',
      produk_id: '',
      tarif: '',
      biaya_member: '',
      biaya_kartu: '',
      // user_id: '',
      periode: [],
      periode_mulai: '',
      periode_akhir: '',
      data_nomor_polisi: [],
      keterangan: '',
    }));
    setEditKendaraan(null);
    setDataKendaraan([]);
    setErrors({});
    setNotifMessage('');
    setSelectedProdukMember(null);
    onClose();
  };

  const [selectedIsMenggunakanKartu, setSelectedIsMenggunakanKartu] = useState({
    iya: false,
  });

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;
    setSelectedKendaraan((prev) => ({
      ...prev,
      [answer.value]: checked,
    }));
    setErrors((prev) => ({ ...prev, kendaraan: '' }));
  };

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

  useEffect(() => {
    if (!formData.akses_kartu) {
      setFormData((prev) => ({
        ...prev,
        no_kartu: '',
      }));
    }
  }, [formData.akses_kartu]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.data_nomor_polisi);

    console.log('error' + JSON.stringify(errors));

    if (!selectedProdukMember) {
      setErrors((prev) => ({
        ...prev,
        produk: 'Harap pilih tiket terlebih dahulu.',
      }));
      setNotifMessage('Harap pilih tiket sebelum menyimpan.');
      setNotifType('error');
      return;
    }

    const newErrors = {
      nama: formData.nama === '' ? 'Nama Perusahaan wajib diisi' : '',
      no_hp: formData.no_hp.trim() === '' ? 'Kontak wajib diisi' : '',
      perusahaan_id:
        formData.perusahaan_id === '' ? 'Perusahaan wajib dipilih' : '',
      no_kartu:
        formData.akses_kartu && formData.no_kartu === ''
          ? 'Nomor Kartu wajib diisi'
          : '',
      produk_id: formData.produk_id === '' ? 'Produk member wajib dipilih' : '',
      data_nomor_polisi:
        formData.data_nomor_polisi.length === 0
          ? 'Kendaraan wajib dipilih'
          : '',
      keterangan: formData.keterangan === '' ? 'Keterangan wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    if (formData.akses_kartu && formData.no_kartu === nomorLama) {
      setNotifMessage('Nomor kartu tidak boleh sama dengan nomor lama.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);

    try {
      console.log(formData);
      await fetchApiMasterDataDataMemberUpdateGantiKartu(formData);

      queryClient.invalidateQueries(['masterDataDataMember']); // Refresh tabel setelah tambah data

      setNotifMessage('Data member berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  if (isLoadingPerusahaan || isLoadingProdukMember)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorPerusahaan || errorProdukMember) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
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
        title="Ganti Kartu Member"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          {!formData.akses_kartu && (
            <EvoErrorDiv errorHandlerText="Member tidak memiliki akses kartu" />
          )}

          {formData.akses_kartu && (
            <EvoInText
              name="no_kartu"
              label="Nomor RFID"
              placeholder="Masukkan nomor kartu RFID"
              value={formData.no_kartu}
              onChange={handleChange}
              error={errors.no_kartu}
            />
          )}

          {formData.akses_kartu && (
            <EvoInText
              name="keterangan"
              label="Keterangan"
              placeholder="Masukkan keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              error={errors.keterangan}
            />
          )}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditGantiKartuForm;
