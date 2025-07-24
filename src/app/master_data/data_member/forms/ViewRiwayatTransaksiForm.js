import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import {
  RiAddLine,
  RiDeleteBin2Line,
  RiCalendarEventLine,
  RiFileEditLine,
  RiCalendarEventFill,
  RiCalendar2Line,
  RiMoneyDollarCircleLine,
  RiBox3Line,
  RiUser3Line,
  RiHourglassLine,
  RiBankCardLine,
  RiInformationLine,
  RiCarLine,
  // RiBankCardLine
  // RiBox3Line
} from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import colors from '@/utils/colors';
import KendaraanForm from './KendaraanForm';
import { fetchApiMasterDataPerusahaan } from '@/app/master_data/perusahaan/api/fetchApiMasterDataPerusahaan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiMasterDataProdukMember } from '@/app/master_data/produk_member/api/fetchApiMasterDataProdukMember';
import TiketProdukMemberForm from './TiketProdukMemberForm';
import EvoTicketMember from '@/components/EvoTicketMember';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataMemberUpdate } from '../api/fetchApiMasterDataDataMemberUpdate';
import { fetchApiRiwayatTransaksiGantiKartu } from '../api/fetchApiRiwayatTransaksiGantiKartu';
import { fetchApiRiwayatTransaksiMember } from '../api/fetchApiRiwayatTransaksiMember';
import { fetchApiRiwayatTransaksiGantiNopol } from '../api/fetchApiRiwayatTransaksiGantiNopol';
import EvoTab from '@/components/EvoTab';
import { formatTanggalIndo } from '@/helpers/formatTanggal';
import { formatRupiah } from '@/helpers/formatRupiah';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';

// import dataKendaraan from '../data/dataKendaraan';

const ViewRiwayatTransaksiForm = ({
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
  const [
    currentPageRiwayatTransaksiGantiKartu,
    setCurrentPageRiwayatTransaksiGantiKartu,
  ] = useState(1);
  const [currentPageRiwayatTransaksiMember, setCurrentPageTransaksiMember] =
    useState(1);
  const [
    currentPageRiwayatTransaksiGantiNopol,
    setCurrentPageRiwayatTransaksiGantiNopol,
  ] = useState(1);

  const [modalProdukMemberOpen, setModalProdukMemberOpen] = useState(false);
  const [selectedProdukMember, setSelectedProdukMember] = useState(null);

  const queryClient = useQueryClient();

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
  });

  useEffect(() => {
    if (initialData) {
      console.log(initialData.json);

      setSelectedProdukMember(initialData.json.produk_member);

      const periodeMulai = initialData.periode?.[0]?.value || '';
      const periodeAkhir = initialData.periode?.[1]?.value || '';

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
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);

    try {
      console.log(formData);
      await fetchApiMasterDataDataMemberUpdate(formData);

      queryClient.invalidateQueries(['masterDataDataMember']); // Refresh tabel setelah tambah data

      setNotifMessage('Data member berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  const {
    data: dataRiwayatTransaksiMember,
    errorRiwayatTransaksiMember,
    isLoadingRiwayatTransaksiMember,
  } = useQuery({
    queryKey: ['dataRiwayatTransaksiMember', currentPageRiwayatTransaksiMember],
    queryFn: () =>
      fetchApiRiwayatTransaksiMember({
        limit: 905,
        page: currentPageRiwayatTransaksiMember,
        offset: (currentPageRiwayatTransaksiMember - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: dataRiwayatTransaksiGantiKartu,
    errorRiwayatTransaksiGantiKartu,
    isLoadingRiwayatTransaksiGantiKartu,
  } = useQuery({
    queryKey: [
      'dataRiwayatTransaksiGantiKartu',
      currentPageRiwayatTransaksiGantiKartu,
    ],
    queryFn: () =>
      fetchApiRiwayatTransaksiGantiKartu({
        limit: 905,
        page: currentPageRiwayatTransaksiGantiKartu,
        offset: (currentPageRiwayatTransaksiGantiKartu - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: dataRiwayatTransaksiGantiNopol,
    errorRiwayatTransaksiGantiNopol,
    isLoadingRiwayatTransaksiGantiNopol,
  } = useQuery({
    queryKey: [
      'dataRiwayatTransaksiGantiNopol',
      currentPageRiwayatTransaksiGantiNopol,
    ],
    queryFn: () =>
      fetchApiRiwayatTransaksiGantiNopol({
        limit: 905,
        page: currentPageRiwayatTransaksiGantiNopol,
        offset: (currentPageRiwayatTransaksiGantiNopol - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  if (
    isLoadingPerusahaan ||
    isLoadingProdukMember ||
    isLoadingRiwayatTransaksiGantiKartu ||
    isLoadingRiwayatTransaksiMember ||
    isLoadingRiwayatTransaksiGantiNopol
  )
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (
    errorPerusahaan ||
    errorProdukMember ||
    errorRiwayatTransaksiGantiKartu ||
    errorRiwayatTransaksiMember ||
    errorRiwayatTransaksiGantiNopol
  ) {
    return (
      <EvoErrorDiv
        errorHandlerText={getErrorMessage(
          error ||
            errorProdukMember ||
            errorRiwayatTransaksiGantiKartu ||
            errorRiwayatTransaksiMember ||
            errorRiwayatTransaksiGantiNopol
        )}
      />
    ); // ✅ Pastikan error ditampilkan di UI
  }

  const tabs = [
    {
      key: 'tab1',
      label: (
        <div className="flex justify-center items-center gap-1">
          <RiBox3Line className="w-5 h-5" /> Member
        </div>
      ),
    },
    {
      key: 'tab2',
      label: (
        <div className="flex justify-center items-center gap-1">
          <RiBankCardLine className="w-5 h-5" /> Kartu
        </div>
      ),
    },
    {
      key: 'tab3',
      label: (
        <div className="flex justify-center items-center gap-1">
          <RiCarLine className="w-5 h-5" /> Nomor Polisi
        </div>
      ),
    },
  ];

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
        title="Tambah Member"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <div className="grid gap-8">
            <EvoTab
              tabs={tabs}
              defaultTab="tab1"
              tabComponents={{
                tab1: () => (
                  <div className="py-5">
                    {/* Data Transaksi Member */}
                    <div className="">
                      <h2 className="text-title_small font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="">
                          <RiBox3Line />
                        </span>{' '}
                        Data Transaksi Member
                      </h2>
                      {/*  */}
                      {dataRiwayatTransaksiMember?.data.map((item, index) => (
                        <div
                          key={item.id + '-' + index}
                          className="mb-2 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex flex-col gap-y-2 gap-x-6 text-sm text-slate-700">
                            <div className="flex justify-between">
                              <div className="flex rounded-[12px] bg-primaryTransparent h-8 w-8 text-primary font-medium justify-center items-center">
                                {index + 1}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-label_medium_semibold font-normal text-black/[0.64]">
                                  Masa Aktif:{' '}
                                </span>
                                <span className="flex gap-2 px-3 py-1 bg-black/10 text-xs font-semibold rounded-full">
                                  {Array.isArray(item.masa_aktif) &&
                                  item.masa_aktif.length === 2 ? (
                                    <>
                                      {formatTanggalIndo(item.masa_aktif[0])} -{' '}
                                      {formatTanggalIndo(item.masa_aktif[1])}
                                    </>
                                  ) : (
                                    'Tidak tersedia'
                                  )}
                                </span>
                              </div>
                            </div>

                            <hr className="mt-1 mb-2" />

                            <div className="flex items-center gap-2">
                              <RiCalendar2Line className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Tanggal:
                              </div>{' '}
                              {item.tgl_transaksi != null &&
                              item.tgl_transaksi != undefined
                                ? formatTanggalIndo(item.tgl_transaksi)
                                : '-'}
                            </div>

                            <div className="flex items-center gap-2">
                              <RiMoneyDollarCircleLine className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Tarif:
                              </div>{' '}
                              <div className="text-primary">
                                <b>
                                  {item.tarif != null && item.tarif != undefined
                                    ? formatRupiah(item.tarif)
                                    : '-'}
                                </b>
                              </div>
                            </div>

                            <div className="col-span-2 flex items-center gap-2">
                              <RiBox3Line className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Produk:
                              </div>{' '}
                              <b>{item.produk_member.nama || '-'}</b>
                            </div>

                            <div className="flex items-center gap-2">
                              <RiUser3Line className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                User:
                              </div>{' '}
                              {item.user.nama || '-'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),

                tab2: () => (
                  <div className="py-5">
                    {/* Data Transaksi Kartu */}
                    <div className="">
                      <h2 className="text-title_small font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="">
                          <RiBankCardLine />
                        </span>{' '}
                        Data Transaksi Kartu
                      </h2>

                      {dataRiwayatTransaksiGantiKartu?.data.map(
                        (item, index) => (
                          <div
                            key={item.id + '-' + index}
                            className="mb-2 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-pink-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <div className="flex flex-col gap-y-2 gap-x-6 text-sm text-slate-700">
                              <div className="flex justify-between">
                                <div className="flex rounded-[12px] bg-primaryTransparent h-8 w-8 text-primary font-medium justify-center items-center">
                                  {index + 1}
                                </div>
                              </div>

                              <hr className="mt-1 mb-2" />

                              <div className="flex items-center gap-2">
                                <RiCalendar2Line className="w-4 h-4 text-black/[0.64]" />
                                <div className="w-[120px] text-black/[0.64]">
                                  Tanggal:
                                </div>
                                {item.tgl_transaksi !== null &&
                                item.tgl_transaksi != undefined
                                  ? formatTanggalIndo(item.tgl_transaksi)
                                  : '-'}
                              </div>

                              <div className="flex items-center gap-2">
                                <RiMoneyDollarCircleLine className="w-4 h-4 text-black/[0.64]" />
                                <div className="w-[120px] text-black/[0.64]">
                                  Tarif:
                                </div>
                                <div className="text-primary">
                                  <b>
                                    {item.tarif != undefined &&
                                    item.tarif != null
                                      ? formatRupiah(item.tarif)
                                      : ''}
                                  </b>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <RiBankCardLine className="w-4 h-4 text-black/[0.64]" />
                                <div className="w-[120px] text-black/[0.64]">
                                  No. Kartu:
                                </div>
                                {item.no_kartu || '-'}
                              </div>

                              <div className="flex items-center gap-2">
                                <RiInformationLine className="w-4 h-4 text-black/[0.64]" />
                                <div className="w-[120px] text-black/[0.64]">
                                  Keterangan:
                                </div>
                                <b>{item.keterangan || '-'}</b>
                              </div>

                              <div className="flex items-center gap-2">
                                <RiUser3Line className="w-4 h-4 text-black/[0.64]" />
                                <div className="w-[120px] text-black/[0.64]">
                                  User:
                                </div>
                                {item.user.nama || '-'}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ),

                tab3: () => (
                  <div className="py-5">
                    {/* Data Transaksi Ganti Nopol */}
                    <div className="">
                      <h2 className="text-title_small font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="">
                          <RiCarLine />
                        </span>{' '}
                        Data Transaksi Ganti Nopol
                      </h2>
                      {dataRiwayatTransaksiGantiNopol?.data.map((item,index) => (
                        <div
                          key={item.no+'-'+index}
                          className="mb-2 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex flex-col gap-y-2 gap-x-6 text-sm text-slate-700">
                            <div className="flex justify-between">
                              <div className="flex rounded-[12px] bg-primaryTransparent h-8 w-8 text-primary font-medium justify-center items-center">
                                {index+1}
                              </div>
                            </div>

                            <hr className="mt-1 mb-2" />

                            <div className="flex items-center gap-2">
                              <RiCalendar2Line className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Tanggal:
                              </div>
                               {item.tgl_transaksi !== null &&
                                item.tgl_transaksi != undefined
                                  ? formatTanggalIndo(item.tgl_transaksi)
                                  : '-'}
                            </div>

                            <div className="flex items-center gap-2">
                              <RiCarLine className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Nopol Lama:
                              </div>
                              <b>{item.nomor_polisi_lama||'-'}</b>
                            </div>

                            <div className="flex items-center gap-2">
                              <RiCarLine className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Nopol Baru:
                              </div>
                              <b>{item.nomor_polisi_baru||'-'}</b>
                            </div>

                            <div className="flex items-center gap-2">
                              <RiMoneyDollarCircleLine className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                Tarif:
                              </div>
                              <div className="text-primary">
                                <b>
                                    {item.tarif != undefined &&
                                    item.tarif != null
                                      ? formatRupiah(item.tarif)
                                      : ''}
                                  </b>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <RiUser3Line className="w-4 h-4 text-black/[0.64]" />
                              <div className="w-[120px] text-black/[0.64]">
                                User:
                              </div>
                              {item.user.nama||'-'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              }}
            />
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default ViewRiwayatTransaksiForm;
