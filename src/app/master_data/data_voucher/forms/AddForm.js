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
} from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import colors from '@/utils/colors';
import TiketProdukVoucherForm from './TiketProdukVoucherForm';
// import dataKendaraan from '../data/dataKendaraan';
import EvoTicketVoucher from '@/components/EvoTicketVoucher';
import { tableProdukVoucher } from '../../produk_voucher/tableProdukVoucher';
import { fetchApiMasterDataProdukVoucher } from '../api/fetchApiMasterDataProdukVoucher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { fetchApiMasterDataDataVoucherCreate } from '../api/fetchApiMasterDataDataVoucherCreate';
import numbers from '@/utils/numbers';

const AddDataVoucherForm = ({ isOpen, onClose, onSubmit, vouchers }) => {
  const [modalVoucherOpen, setModalVoucherOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const {
    data: kendaraanData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['kendaraanData'],
    queryFn: fetchApiMasterDataDataKendaraan,
  });

  const {
    data: masterDataProdukVoucher,
    errorProdukVoucher,
    isLoadingProdukVoucher,
  } = useQuery({
    queryKey: ['masterDataProdukVoucher', currentPage],
    queryFn: () =>
      fetchApiMasterDataProdukVoucher({
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
  });

  // console.log('add form' +JSON.stringify(masterDataProdukVoucher));

  const [formData, setFormData] = useState({
    // namaVoucher: '',
    no_tiket_atau_nopol: '',
    no_tiket: '',
    nomor_polisi: '',
    kendaraan_id: '',
    keterangan: '',
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData({
      nama: '',
      no_tiket_atau_nopol: '',
      no_tiket: '',
      nomor_polisi: '',
      periode_mulai: '',
      periode_akhir: '',
      periode: [],
      // periode_value: '',
      // periode_unit: '',
      list_id_kendaraan: [],
      max_kendaraan: '',
      diskon: '',
      biaya_kartu: '',
      biaya_ganti_nopol: '',
      status: false,
      kendaraan_id: '',
      keterangan: '',
    });
    setErrors({});
    setNotifMessage('');
    setSelectedVoucher(null);
    onClose();
  };

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setModalVoucherOpen(false);
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

    if (!selectedVoucher) {
      setErrors((prev) => ({
        ...prev,
        voucher: 'Harap pilih tiket terlebih dahulu.',
      }));
      setNotifMessage('Harap pilih tiket sebelum menyimpan.');
      setNotifType('error');
      return;
    }

    // if (formData.nomorPolisi === '') {
    //   setErrors({ nomorPolisi: 'Nomor Polisi wajib diisi' });
    //   return;
    // }

    const newErrors = {
      // no_tiket_atau_nopol:
      //   formData.no_tiket_atau_nopol === '' ? 'Kontak wajib diisi' : '',

      no_tiket:
        selectedVoucher.metode_verifikasi === 'Tiket' &&
        formData.no_tiket === ''
          ? 'Nomor tiket wajib'
          : '',
      nomor_polisi:
        selectedVoucher.metode_verifikasi === 'Nopol' &&
        formData.nomor_polisi === ''
          ? 'Nomor Polisi wajib diisi'
          : '',
      kendaraan_id:
        formData.kendaraan_id === '' ? 'Jenis Kendaraan wajib diisi' : '',
      keterangan: formData.keterangan === '' ? 'Keterangan wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    const finalData = {
      ...formData,
      no_tiket_atau_nopol: formData.no_tiket + '_' + formData.nomor_polisi,
      produk_voucher_id: selectedVoucher.id,
      diskon: selectedVoucher.diskon || '',
      model_bayar: selectedVoucher.model_pembayaran || '',
      verifikasi: selectedVoucher.metode_verifikasi || '',
      periode: [
        selectedVoucher.periode[0].value || '',
        selectedVoucher.periode[1].value || '',
      ],
    };

    console.log('Data yang akan dikirim ke onSubmit:', finalData);

    // onSubmit?.(finalData);
    try {
      await fetchApiMasterDataDataVoucherCreate(finalData);

      queryClient.invalidateQueries(['masterDataDataVoucher']); // Refresh tabel setelah tambah data

      setNotifMessage('Data voucher berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
      console.log(error);
    }
  };

  {
    isLoadingProdukVoucher && <p>Memuat data voucher...</p>;
  }
  {
    errorProdukVoucher && (
      <p className="text-red-500">Gagal mengambil data voucher</p>
    );
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
        title={`Tambah Voucher1`}
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <div className="text-title_small">
            <span className="text-primary">A.</span> Produk Voucher
          </div>

          {/* Pilih Tiket */}
          <EvoButton
            buttonText={selectedVoucher == null ? 'Pilih Tiket' : 'Ubah Tiket'}
            onClick={() => setModalVoucherOpen(true)}
            size="large"
            type="button"
            outlined={selectedVoucher == null ? false : true}
          />
          {errors.voucher && (
            <p className="text-red-500 text-sm">{errors.voucher}</p>
          )}
          {selectedVoucher && <EvoTicketVoucher voucher={selectedVoucher} />}
          {/* <pre>{JSON.stringify(selectedVoucher, null, 2)}</pre> */}
          <div className="text-title_small">
            <span className="text-primary">B.</span> Data Voucher
          </div>
          {/* <EvoInText
            name="no_tiket_atau_nopol"
            label="Nomor Tiket / Nomor Polisi"
            placeholder="Masukkan nomor tiket / nomor polisi"
            value={formData.no_tiket_atau_nopol || ''}
            onChange={handleChange}
            error={errors.no_tiket_atau_nopol}
          /> */}
          <EvoInText
            name="no_tiket"
            label="Nomor Tiket"
            placeholder="Masukkan nomor tiket"
            value={formData.no_tiket || ''}
            onChange={handleChange}
            error={errors.no_tiket}
          />
          <EvoInText
            name="nomor_polisi"
            label="Nomor Polisi"
            placeholder="Masukkan nomor polisi"
            value={formData.nomor_polisi || ''}
            onChange={handleChange}
            error={errors.nomor_polisi}
          />
          <EvoInDropdown
            name="kendaraan_id"
            label="Kendaraan"
            options={
              selectedVoucher?.list_id_kendaraan?.map((id) => {
                const kendaraan = kendaraanData?.data.find(
                  (item) => item.id.toString() === id.toString()
                );

                return {
                  label: kendaraan
                    ? `${kendaraan.nama_kendaraan} (${
                        kendaraan.tipe_kendaraan?.tipe_kendaraan || '-'
                      })`
                    : `ID Kendaraan: ${id}`, // fallback jika tidak ditemukan
                  value: id.toString(),
                };
              }) || []
            }
            value={formData.kendaraan_id || ''}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, kendaraan_id: value }));
              console.log(value);
            }}
            error={errors.kendaraan_id}
            placeholder="Pilih jenis kendaraan"
          />

          <EvoInText
            name="keterangan"
            label="Keterangan"
            placeholder="Masukkan keterangan"
            value={formData.keterangan || ''}
            onChange={handleChange}
            error={errors.keterangan}
          />
        </EvoForm>
      </EvoModal>

      <TiketProdukVoucherForm
        isOpen={modalVoucherOpen}
        onClose={() => setModalVoucherOpen(false)}
        onSubmit={handleSelectVoucher}
        listVouchers={masterDataProdukVoucher?.data || []}
        // onReceiveListIdKendaraan={handleListIdKendaraanFromChild}
      />
    </>
  );
};

export default AddDataVoucherForm;
