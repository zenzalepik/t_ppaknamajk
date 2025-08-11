import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EvoTicketMember from '@/components/EvoTicketMember';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataMemberUpdateGantiNomorPolisi } from '../api/fetchApiMasterDataDataMemberUpdateGantiNomorPolisi';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
// import dataKendaraan from '../data/dataKendaraan';

const EditGantiNomorPolisiForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [editKendaraan, setEditKendaraan] = useState(null);
  const [dataKendaraan, setDataKendaraan] = useState([]);

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [selectedProdukMember, setSelectedProdukMember] = useState(null);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    data_member_id: '',
    nomor_polisi_lama: '',
    nomor_polisi_baru: '',
    keterangan: '',
    kendaraan_lama_id: '',
    kendaraan_baru_id: '',
    user_id: '',
  });

  useEffect(() => {
    if (initialData) {
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

        data_member_id: initialData.id || '',
        // nomor_polisi_lama: initialData.nomor_polisi_lama || '',
        // nomor_polisi_baru: initialData.nomor_polisi_baru || '',
        kendaraan_id: initialData.kendaraan_id || '',
        keterangan: initialData.keterangan || '',
      }));

      setDataKendaraan(initialData?.json?.data_nomor_polisi || []);
    }
  }, [initialData]);

  useEffect(() => {}, [formData]);

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

      // setFormData((prev) => ({
      //   ...prev,
      // data_member_id: 43,
      // nomor_polisi_lama: 'ajkakjppopj',
      // nomor_polisi_baru: 'ajkakjppop',
      // keterangan: 'Ganti karena pindah alamat',
      // kendaraan_lama_id: 1,
      // kendaraan_baru_id: 3,
      // user_id: 1,
      // }));
    }
  }, [selectedProdukMember]);

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      data_member_id: '',
      nomor_polisi_lama: '',
      nomor_polisi_baru: '',
      keterangan: '',
      kendaraan_lama_id: '',
      kendaraan_baru_id: '',
      // user_id: 1,
    }));
    setEditKendaraan(null);
    setDataKendaraan([]);
    setErrors({});
    setNotifMessage('');
    setSelectedProdukMember(null);
    onClose();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      data_member_id:
        formData.data_member_id === '' ? 'Data member tidak ditemukan' : '',
      kendaraan_lama_id:
        formData.kendaraan_lama_id === ''
          ? 'Tipe kendaraan lama tidak ditemukan'
          : '',
      kendaraan_baru_id:
        formData.kendaraan_baru_id === ''
          ? 'Tipe kendaraan baru tidak ditemukan'
          : '',
      nomor_polisi_lama:
        formData.nomor_polisi_lama === ''
          ? 'Nomor polisi lama wajib dipilih'
          : '',
      nomor_polisi_baru:
        formData.nomor_polisi_baru === ''
          ? 'Nomor polisi baru wajib diisi'
          : '',
      keterangan: formData.keterangan === '' ? 'Keterangan wajib diisi' : '',
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
      await fetchApiMasterDataDataMemberUpdateGantiNomorPolisi(formData);

      queryClient.invalidateQueries(['masterDataDataMember']); // Refresh tabel setelah tambah data

      setNotifMessage('Nomor polisi baru berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

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
        title="Ganti Nomor Polisi"
      > 
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          {/* data_member_id:{JSON.stringify(formData.data_member_id)}
          <br />
          kendaraan_baru_id:{JSON.stringify(formData.kendaraan_baru_id)}
          <br />
          kendaraan_lama_id:{JSON.stringify(formData.kendaraan_lama_id)}
          <br />
          keterangan:{JSON.stringify(formData.keterangan)}
          <br />
          nomor_polisi_baru:{JSON.stringify(formData.nomor_polisi_baru)}
          <br />
          nomor_polisi_lama:{JSON.stringify(formData.nomor_polisi_lama)} */}
          <div className="text-title_small mt-4">
            <span className="text-primary">A.</span> Data Produk
          </div>
          <div className="w-full">
            {/* Pilih Tiket */}
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
              <div className="flex flex-col gap-1">
                <p className="text-black/80 text-card">Nama Member:</p>
                <div className="text-black text-content mb-2">
                  <b>Rp {initialData?.json?.nama}</b>
                </div>
                <hr className="border border-primaryTransparent mb-5" />
                <p className="text-black/80 text-card">
                  Biaya Ganti Nomor Polisi:
                </p>
                <div className="text-black text-title_small">
                  Rp{' '}
                  {
                    // selectedProdukMember?.tarif == null || selectedProdukMember?.biaya_kartu==null
                    //   ? ' -error'
                    // :
                    new Intl.NumberFormat('id-ID').format(
                      selectedProdukMember?.biaya_ganti_nopol
                    )
                  }
                </div>
              </div>
            </div>
          )}
          <div className="text-title_small mt-4">
            <span className="text-primary">B.</span> Data Kendaraan/Nomor Polisi
          </div>
          {/* {JSON.stringify(dataKendaraan)} */}
          <div className="mt-4 border border-primary/40 p-6 rounded-[24px] w-full shadow-card">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: '1px solid #ccc',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Nomor Polisi
                  </th>
                  <th
                    style={{
                      borderBottom: '1px solid #ccc',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    Kendaraan
                  </th>
                </tr>
              </thead>
              <tbody>
                {(initialData?.json?.data_nomor_polisi || []).map((nopol) => (
                  <tr key={nopol.id}>
                    <td
                      style={{ borderBottom: '1px solid #eee', padding: '8px' }}
                    >
                      <b className="text-primary">{nopol.nomor_polisi}</b>
                    </td>
                    <td
                      style={{ borderBottom: '1px solid #eee', padding: '8px' }}
                    >
                      {nopol.kendaraan?.nama_kendaraan ||
                        'Data kendaraan tidak ditemukan'}
                      {nopol.kendaraan?.tipe_kendaraan?.tipe_kendaraan
                        ? ` (${nopol.kendaraan.tipe_kendaraan.tipe_kendaraan})`
                        : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <EvoInDropdown
            name="nomor_polisi_lama"
            label="Nomor Polisi Lama"
            options={
              initialData?.json?.data_nomor_polisi?.map((item) => ({
                value: String(item.nomor_polisi), // atau item.nomor_polisi kalau mau valuenya itu
                label: `${item.nomor_polisi} - ${item.kendaraan.nama_kendaraan} (${item.kendaraan.tipe_kendaraan.tipe_kendaraan})`,
              })) || []
            }
            value={formData.nomor_polisi_lama}
            onChange={(value) => {
              const selected = initialData?.json?.data_nomor_polisi?.find(
                (item) => String(item.nomor_polisi) === String(value)
              );

              setFormData((prev) => ({
                ...prev,
                nomor_polisi_lama: value,
                kendaraan_lama_id: selected ? selected.kendaraan.id : '',
              }));
            }}
            error={errors.nomor_polisi_lama}
            placeholder="Pilih nomor polisi lama"
          />
          <EvoInText
            name="nomor_polisi_baru"
            label="Nomor Polisi Baru"
            placeholder="Masukkan nomor polisi baru"
            value={formData.nomor_polisi_baru}
            onChange={handleChange}
            error={errors.nomor_polisi_baru}
          />
          {/* {JSON.stringify(
            initialData?.json?.produk_member?.list_kendaraan_detail
          )} */}
          <EvoInDropdown
            name="kendaraan_baru_id"
            label="Jenis Kendaraan Baru"
            options={
              initialData?.json?.produk_member?.list_kendaraan_detail?.map(
                (kendaraan) => ({
                  value: kendaraan.id,
                  label: `${kendaraan.nama_kendaraan} - ${
                    kendaraan.tipe_kendaraan?.tipe_kendaraan || ''
                  }`,
                })
              ) || []
            }
            value={formData.kendaraan_baru_id}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, kendaraan_baru_id: value }));
            }}
            error={errors.kendaraan_baru_id}
            placeholder="Pilih Jenis Kendaraan Baru"
          />
          {/* {JSON.stringify(initialData?.json?.produk_member?.list_id_kendaraan)} */}
          {/* {JSON.stringify( dataTipeKendaraan?.data)} */}
          <EvoInTextarea
            name="keterangan"
            label="Keterangan"
            placeholder="Masukkan keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            error={errors.keterangan}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditGantiNomorPolisiForm;
