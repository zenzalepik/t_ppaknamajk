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
import { fetchApiPengaturanParameterTipeKendaraan } from '../api/fetchApiPengaturanParameterTipeKendaraan';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataMemberUpdatePerpanjangMasaAktif } from '../api/fetchApiMasterDataDataMemberUpdatePerpanjangMasaAktif';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');
import numbers from '@/utils/numbers';
import hideNotFinished from '@/utils/hideNotFinished';
import EvoEmpty from '@/components/EvoEmpty';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import EvoLoading from '@/components/EvoLoading';

const EditPerpanjangMasaAktifForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const [modalProdukMemberOpen, setModalProdukMemberOpen] = useState(false);
  const [selectedProdukMember, setSelectedProdukMember] = useState(null);

  const [isUserReady, setIsUserReady] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: masterDataProdukMember,
    errorProdukMember,
    isLoadingProdukMember,
  } = useQuery({
    queryKey: ['masterDataProdukMember'],
    queryFn: () =>
      fetchApiMasterDataProdukMember({
        limit: numbers.apiNumLimitExpanded,
        page: 1,
        // offset: (currentPage - 1) * 5,
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

  const [formData, setFormData] = useState({
    id: '',
    produk_id: '',
    tarif: '',
    periode: [],
    user_id: '',
  });

  useEffect(() => {
    if (!initialData) return;

    // console.log(JSON.stringify(initialData));

    // Ambil periode member dari initialData.json.periode
    const memberPeriode = Array.isArray(initialData?.json?.periode)
      ? initialData.json.periode
      : [];

    const periodeMulai = memberPeriode[1]?.value
      ? dayjs(memberPeriode[1].value).add(1, 'day').format('YYYY-MM-DD')
      : '';

    setFormData((prev) => ({
      ...prev,
      id: initialData?.id || '',
      produk_id: initialData?.produk_id || '',
      tarif: initialData?.tarif || '',
      periode: memberPeriode, // pakai periode member, bukan produk
      user_id: initialData?.user_id || '',
      periode_mulai: periodeMulai,
    }));

    // Set selectedProdukMember dari json.produk_member
    if (initialData?.json?.produk_member) {
      setSelectedProdukMember({
        ...initialData.json.produk_member,
        tarif: initialData.tarif,
        biaya_kartu: initialData.biaya_kartu,
        periode: initialData.json.periode,
      });
    }
  }, [initialData]);

  useEffect(() => {}, [formData]);

  // Ambil user_id secara async
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setFormData((prev) => ({ ...prev, user_id: id }));
      setIsUserReady(true);
    };
    fetchUserId();
  }, []);

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

  const jumlahHari = (() => {
    if (
      Array.isArray(selectedProdukMember?.periode) &&
      selectedProdukMember.periode.length >= 2
    ) {
      const start = new Date(selectedProdukMember.periode[0]?.value);
      const end = new Date(selectedProdukMember.periode[1]?.value);
      if (isNaN(start) || isNaN(end)) return 0;
      return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  })();

  useEffect(() => {
    if (formData.periode_mulai && jumlahHari > 0) {
      const newAkhir = dayjs(formData.periode_mulai)
        .add(jumlahHari - 1, 'day') // -1 karena periode_mulai dihitung sebagai hari pertama
        .format('YYYY-MM-DD');

      setFormData((prev) => ({
        ...prev,
        periode_akhir: newAkhir,
      }));
    }
  }, [formData.periode_mulai, jumlahHari]);

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      id: '',
      produk_id: '',
      tarif: '',
      periode: [],
    }));
    setErrors({});
    setNotifMessage('');
    setSelectedProdukMember(null);
    onClose();
  };

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      periode: [String(prev.periode_mulai), String(prev.periode_akhir)],
    }));
  }, [formData.periode_mulai, formData.periode_akhir]);

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

  const handleSubmit = async (e) => {
    if (!isUserReady) {
      setNotifMessage('User belum siap. Silakan tunggu sebentar.');
      setNotifType('error');
      return;
    }

    e.preventDefault();

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
      id: formData.id === '' ? 'ID data member tidak ditemukan' : '',
      tarif: formData.tarif === '' ? 'Tarif belum diisi' : '',
      periode: formData.periode === '' ? 'Periode wajib ditentukan dahulu' : '',
      user_id: formData.user_id === '' ? 'User tidak ditemukan' : '',
      produk_id: formData.produk_id === '' ? 'Produk member wajib dipilih' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);
    // console.log(JSON.stringify(formData));
    try {
      // console.log('formData:' + JSON.stringify(formData));
      await fetchApiMasterDataDataMemberUpdatePerpanjangMasaAktif(formData);

      queryClient.invalidateQueries(['masterDataDataMember']); // Refresh tabel setelah tambah data

      setNotifMessage('Data member berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  if (isLoadingProdukMember)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorProdukMember) {
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
        title="Perpanjang Masa Aktif Member"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <div className="text-title_small mt-4">
            <span className="text-primary"></span> Produk & Periode
          </div>
          <div className="w-full">
            {/* Pilih Tiket */}
            {/* <EvoButton
              buttonText={
                selectedProdukMember == null
                  ? 'Pilih Produk Member'
                  : 'Ubah Produk Member'
              }
              onClick={() => setModalProdukMemberOpen(true)}
              size="large"
              type="button"
              outlined={selectedProdukMember == null ? false : true}
            /> */}
            {errors.produk_id && (
              <p className="text-red-500 text-sm">{errors.produk_id}</p>
            )}
            {selectedProdukMember && (
              <EvoTicketMember
                produkMember={selectedProdukMember}
                type="small"
              />
            )}
          </div>

          {errors.produk && (
            <p className="text-red-500 text-sm">{errors.produk}</p>
          )}

          {/* Selected Produk Member */}
          {selectedProdukMember && (
            <div className="flex flex-col gap-2 border border-primary/40 p-6 rounded-[24px] w-full shadow-card">
              <div className="flex gap-6">
                <p className="w-[180px] text-black/[0.64]">Periode</p>
                <div className="text-black font-semibold">
                  :{' '}
                  {Array.isArray(selectedProdukMember?.periode) &&
                  selectedProdukMember?.periode.length >= 2 ? (
                    <>
                      {(() => {
                        const start = new Date(
                          selectedProdukMember.periode[0]?.value
                        );
                        const end = new Date(
                          selectedProdukMember.periode[1]?.value
                        );
                        if (isNaN(start) || isNaN(end)) return '0 hari';
                        const diff =
                          Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                        return `${diff} hari`;
                      })()}
                    </>
                  ) : (
                    '-'
                  )}
                </div>

                {/* <pre>
                {JSON.stringify(selectedProdukMember)}
              </pre> */}
              </div>
              <div className="flex gap-6">
                <p className="w-[180px] text-black/[0.64]">
                  Tarif Dasar Member
                </p>
                <div className="text-black font-semibold">
                  : Rp{' '}
                  {selectedProdukMember?.tarif == null
                    ? ' -'
                    : new Intl.NumberFormat('id-ID').format(
                        selectedProdukMember?.tarif
                      )}
                </div>
              </div>
              <div className="flex gap-6">
                <p className="w-[180px] text-black/[0.64]">Biaya Member</p>
                <div className="text-black font-semibold">
                  {' '}
                  : Rp{' '}
                  {selectedProdukMember?.tarif == null
                    ? ' -'
                    : new Intl.NumberFormat('id-ID').format(
                        selectedProdukMember?.tarif
                      )}
                </div>
              </div>
              <div className="flex gap-6">
                <p className="w-[180px] text-black/[0.64]">Biaya Kartu RFID</p>
                <div className="text-black font-semibold">
                  {' '}
                  : Rp{' '}
                  {selectedProdukMember?.biaya_kartu == null
                    ? ' -'
                    : new Intl.NumberFormat('id-ID').format(
                        selectedProdukMember?.biaya_kartu
                      )}
                </div>
              </div>
              <hr className="my-3  border-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-black/80 text-card">
                  Total Biaya Member + Kartu:
                </p>
                <div className="text-black text-title_small">
                  {' '}
                  : Rp{' '}
                  {
                    // selectedProdukMember?.tarif == null || selectedProdukMember?.biaya_kartu==null
                    //   ? ' -error'
                    // :
                    new Intl.NumberFormat('id-ID').format(
                      selectedProdukMember?.tarif +
                        selectedProdukMember?.biaya_kartu
                    )
                  }
                </div>
              </div>
              <hr className="my-3  border-primary" />

              <div className="flex gap-3 relative">
                <div className="flex flex-col w-full">
                  <EvoInDatePicker
                    name="periode_mulai"
                    label="Tanggal Mulai Aktif"
                    placeholder="Pilih tanggal mulai aktif"
                    value={formData.periode_mulai}
                    isWidthFull={true}
                    onChange={(value) =>
                      handleDateChange('periode_mulai', value)
                    }
                    error={errors.periode_mulai}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-card mb-1">Tanggal Akhir Aktif</span>
                  <div className="flex w-full gap-3 py-3 px-3.5 rounded-[16px] border border-dashed border-primary justify-center items-center">
                    <div className="w-full">
                      {Array.isArray(selectedProdukMember?.periode) &&
                      selectedProdukMember?.periode.length >= 2
                        ? formData.periode_akhir &&
                          dayjs(formData.periode_akhir).format('D MMMM YYYY')
                        : '-'}
                    </div>
                    <RiCalendarEventLine className="text-black/50" size={28} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </EvoForm>
      </EvoModal>

      <TiketProdukMemberForm
        isOpen={modalProdukMemberOpen}
        onClose={() => setModalProdukMemberOpen(false)}
        onSubmit={handleSelectProdukMember}
        listProdukMembers={masterDataProdukMember?.data || []}
        // onReceiveListIdKendaraan={handleListIdKendaraanFromChild}
      />
    </>
  );
};

export default EditPerpanjangMasaAktifForm;
