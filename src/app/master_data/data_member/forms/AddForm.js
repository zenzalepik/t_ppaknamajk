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
import { fetchApiMasterDataDataMemberCreate } from '../api/fetchApiMasterDataDataMemberCreate';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import numbers from '@/utils/numbers';
// import dataKendaraan from '../data/dataKendaraan';

const AddDataMemberForm = ({ isOpen, onClose, onSubmit }) => {
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

  const {
    data: masterDataPerusahaan,
    errorPerusahaan,
    isLoadingPerusahaan,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
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
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
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

  const {
    data: masterDataDataKendaraan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataKendaraan', currentPage],
    queryFn: () =>
      fetchApiMasterDataDataKendaraan({
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
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
      console.log(JSON.stringify(formData));
      await fetchApiMasterDataDataMemberCreate(formData);

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
        title="Tambah Member"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <div className="text-title_small">
            <span className="text-primary">A.</span> Data Member
          </div>
          <EvoInText
            name="nama"
            label="Nama Member"
            placeholder="Masukkan nama lengkap member"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
          />
          <EvoInText
            name="no_hp"
            label="Nomor Handphone"
            placeholder="Masukkan nomor handphone"
            value={formData.no_hp}
            onChange={handleChange}
            error={errors.no_hp}
          />
          <EvoInDropdown
            name="perusahaan_id"
            label="Nama Perusahaan"
            options={dataApiPerusahaan.map((item) => ({
              label: item.nama,
              value: item.id,
            }))}
            value={formData.perusahaan_id}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, perusahaan_id: value }))
            }
            error={errors.perusahaan_id}
            placeholder="Pilih perusahaan"
          />

          <div className="text-title_small mt-4">
            <span className="text-primary">B.</span> Akses Gerbang
          </div>
          <EvoInCheckbox
            label="Apakah Menggunakan Tiket?"
            answers={[
              {
                label: 'Iya',
                value: 'akses_tiket',
                checked: formData.akses_tiket,
              },
            ]}
            onChange={(e) => {
              const { value, checked } = e.target;
              setFormData((prev) => ({
                ...prev,
                [value]: checked,
              }));
            }}
            error={errors.akses_tiket}
          />
          <EvoInCheckbox
            label="Apakah Menggunakan Kartu?"
            answers={[
              {
                label: 'Iya',
                value: 'akses_kartu',
                checked: formData.akses_kartu,
              },
            ]}
            onChange={(e) => {
              const { value, checked } = e.target;
              setFormData((prev) => ({
                ...prev,
                [value]: checked,
              }));
            }}
            error={errors.akses_kartu}
          />

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

          <div className="text-title_small mt-4">
            <span className="text-primary">C.</span> Transaksi
          </div>
          <div className="w-full">
            {/* Pilih Tiket */}
            <EvoButton
              buttonText={
                selectedProdukMember == null ? 'Pilih Tiket' : 'Ubah Tiket'
              }
              onClick={() => setModalProdukMemberOpen(true)}
              size="large"
              type="button"
              outlined={selectedProdukMember == null ? false : true}
            />
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
                  <span className="text-card mb-1">Tanggal Akhir Aktif</span>
                  <div className="flex w-full gap-3 py-3 px-3.5 rounded-[16px] border border-dashed border-primary justify-center items-center">
                    <div className="w-full">
                      {Array.isArray(selectedProdukMember?.periode) &&
                      selectedProdukMember?.periode.length >= 2 ? (
                        <>
                          <RiCalendarEventFill
                            size={18}
                            className="inline-block mr-1"
                          />
                          {selectedProdukMember?.periode[0]?.value || '-'}
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                    <RiCalendarEventLine className="text-black/50" size={28} />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-card mb-1">Tanggal Akhir Aktif</span>
                  <div className="flex w-full gap-3 py-3 px-3.5 rounded-[16px] border border-dashed border-primary justify-center items-center">
                    <div className="w-full">
                      {Array.isArray(selectedProdukMember?.periode) &&
                      selectedProdukMember?.periode.length >= 2 ? (
                        <>
                          <RiCalendarEventFill
                            size={18}
                            className="inline-block mr-1"
                          />
                          {selectedProdukMember?.periode[1]?.value || '-'}
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                    <RiCalendarEventLine className="text-black/50" size={28} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-title_small mt-4">
            <span className="text-primary">D.</span> Data Kendaraan/Nomor Polisi
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-card w-full bg-primary text-white">
                  {['Nomor Polisi', 'Jenis Kendaraan', 'Aksi'].map((header) => (
                    <th key={header} className="py-2 px-4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataKendaraan.map(({ nomor_polisi, kendaraan_id }) => {
                  const kendaraanDetail = masterDataDataKendaraan?.data?.find(
                    (k) => String(k.id) === String(kendaraan_id)
                  );

                  const namaKendaraan =
                    kendaraanDetail?.nama_kendaraan || 'Tidak Diketahui';
                  const idJenisKendaraan =
                    kendaraanDetail?.tipe_kendaraan_id || 'Tidak Diketahui';

                  // Temukan tipe kendaraan berdasarkan ID
                  const jenisKendaraan =
                    dataTipeKendaraan?.data?.find(
                      (t) => String(t.id) === String(idJenisKendaraan)
                    )?.tipe_kendaraan || 'Tidak Diketahui';

                  return (
                    <tr key={nomor_polisi} className="border-b">
                      <td className="py-2 px-4">{nomor_polisi}</td>
                      <td className="py-2 px-4">
                        {`
                        ${namaKendaraan} (${jenisKendaraan}) 
                        `}
                      </td>
                      {/* <pre>{JSON.stringify(dataKendaraan, null, 2)}</pre> */}

                      <td className="py-2 px-4 flex space-x-2 justify-center">
                        <EvoButton
                          icon={<RiFileEditLine size={24} />}
                          onClick={() => {
                            setEditKendaraan({ nomor_polisi, kendaraan_id }); // Kirim data untuk edit
                            setModalKendaraanOpen(true);
                          }}
                          className="mt-3"
                          type="button"
                        />
                        <EvoButton
                          icon={<RiDeleteBin2Line size={24} />}
                          outlined
                          fillColor={colors.danger}
                          onClick={() => handleDeleteKendaraan(nomor_polisi)}
                          className="mt-3"
                          type="button"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {selectedProdukMember?.max_kendaraan > dataKendaraan.length ? (
              <EvoButton
                buttonText="Tambah Kendaraan"
                icon={<RiAddLine size={24} />}
                outlined={true}
                onClick={() => {
                  setEditKendaraan(null);
                  setModalKendaraanOpen(true);
                }}
                className="mt-3"
                type="button" // Pastikan type adalah "button"
              />
            ) : (
              <></>
            )}

            {errors.data_nomor_polisi != '' && (
              <p className="text-danger text-sm mt-1">
                {errors.data_nomor_polisi}
              </p>
            )}
          </div>
          {/* <>{JSON.stringify(selectedProdukMember)}</> */}
        </EvoForm>
      </EvoModal>
      <KendaraanForm
        isOpen={modalKendaraanOpen}
        onClose={() => setModalKendaraanOpen(false)}
        editData={editKendaraan}
        onSubmit={(kendaraanBaru) => {
          if (editKendaraan) {
            setDataKendaraan((prev) =>
              prev.map((item) =>
                item.nomor_polisi === editKendaraan.nomor_polisi
                  ? { ...item, ...kendaraanBaru }
                  : item
              )
            );
          } else {
            // mode tambah
            setDataKendaraan((prev) => [...prev, kendaraanBaru]);
          }
          setModalKendaraanOpen(false);
        }}
        existingData={dataKendaraan}
        dataKendaraan={masterDataDataKendaraan}
        dataJenisKendaraan={dataTipeKendaraan}
        addFormParentData={selectedProdukMember}
      />

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

export default AddDataMemberForm;
