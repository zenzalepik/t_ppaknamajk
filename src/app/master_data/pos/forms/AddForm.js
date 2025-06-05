import React, { useState, useEffect } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import companyTypes from '@/utils/companyTypes';
import strings from '@/utils/strings';
import { useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPOSCreate } from '../api/fetchApiMasterDataPOSCreate';

const AddPosForm = ({ isOpen, onClose, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    kode: '',
    keterangan: '',
    synchronize: '',
    com_port: '',
    user_id: '',
  });

  // Ambil user_id secara async
  useEffect(() => {
      const fetchUserId = async () => {
        try {
          const id = await getUserId();
          if (isOpen && !id) {
            throw new Error('User ID tidak ditemukan');
          }
          setFormData((prev) => ({ ...prev, user_id: id }));
        } catch (error) {
          setNotifMessage(`Error mengambil User ID: ${error.message}`);
          setNotifType('error');
        }
      };
  
      fetchUserId();
    }, [isOpen]);

  const [selectedOptions, setSelectedOptions] = useState({
    otorisasi: false,
    tipe_kendaraan: '',
    tipe_pos: '',
    tipe_manless: '',
    nama_printer: '',
    nama_interface: '',
  });

  const [selectedCameras, setSelectedCameras] = useState({
    kamera_1: false,
    kamera_2: false,
  });

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     jenis_perusahaan: selectedJenisPerusahaan,
  //   }));
  // }, [selectedJenisPerusahaan]);

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

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;

    // Update the state with the changed checkbox value
    setSelectedOptions((prev) => ({
      ...prev,
      [answer.value]: checked, // Update the value of the checkbox (checked or unchecked)
    }));

    setErrors((prev) => ({
      ...prev,
      [answer.name]: '', // Remove the error related to the checkbox
    }));
  };

  const handleCameraChange = (e, answer) => {
    const { checked } = e.target;

    // Update the state for camera selection
    setSelectedCameras((prev) => ({
      ...prev,
      [answer.value]: checked, // Update camera1 or camera2 selection
    }));

    setErrors((prev) => ({
      ...prev,
      cameras: '', // Remove camera selection error
    }));
  };

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData({
      kode: '',
      keterangan: '',
      synchronize: '',
      com_port: '',
      user_id: '',
    });

    setSelectedOptions({
      otorisasi: false,
      tipe_kendaraan: '',
      tipe_pos: '',
      tipe_manless: '',
      nama_printer: '',
      nama_interface: '',
    });

    setSelectedCameras({
      kamera_1: false,
      kamera_2: false,
    });

    setErrors({});
    setNotifMessage('');
    setNotifType('success'); // opsional, jika ingin reset ke default
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_id) {
      setNotifMessage('User ID tidak ditemukan, coba ulangi.');
      setNotifType('error');
      return;
    }
    
    const newErrors = {
      kode: formData.kode.trim() === '' ? 'Kode wajib diisi' : '',
      keterangan:
        formData.keterangan.trim() === '' ? 'Keterangan wajib diisi' : '',
      synchronize:
        formData.synchronize.trim() === ''
          ? 'Durasi Sinkronisasi wajib diisi'
          : '',
      com_port: formData.com_port.trim() === '' ? 'COM Port wajib diisi' : '',
      tipe_kendaraan:
        selectedOptions.tipe_kendaraan === ''
          ? 'Tipe Kendaraan wajib dipilih'
          : '',
      tipe_pos: selectedOptions.tipe_pos === '' ? 'Tipe Pos wajib dipilih' : '',
      tipe_manless:
        selectedOptions.tipe_manless === '' ? 'Tipe Manless wajib dipilih' : '',
      nama_printer:
        selectedOptions.nama_printer === '' ? 'nama_printer wajib dipilih' : '',
      nama_interface:
        selectedOptions.nama_interface === ''
          ? 'nama_interface wajib dipilih'
          : '',
      cameras:
        !selectedCameras.kamera_1 && !selectedCameras.kamera_2
          ? 'Minimal satu kamera harus dipilih'
          : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // ✅ Gabungkan `formData` dengan `selectedOptions`
    const finalData = {
      ...formData,
      ...selectedOptions,
      ...selectedCameras,
    };

    try {
      console.log(finalData);
      await fetchApiMasterDataPOSCreate(finalData);

      queryClient.invalidateQueries(['masterDataPOS']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Pos berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => onClose(), 500);
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

      <EvoModal isOpen={isOpen} onClose={handleCloseModal} title="Tambah Pos">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="kode"
            label="Kode"
            placeholder="Masukkan kode pos"
            value={formData.kode}
            onChange={handleChange}
            error={errors.kode}
          />
          <EvoInText
            name="keterangan"
            label="Keterangan"
            placeholder="Masukkan deskripsi pos"
            value={formData.keterangan}
            onChange={handleChange}
            error={errors.keterangan}
          />

          <EvoInCheckbox
            label="Pengaturan Kamera"
            answers={[
              {
                label: 'Kamera 1',
                value: 'kamera_1',
                checked: selectedCameras.kamera_1,
              },
              {
                label: 'Kamera 2',
                value: 'kamera_2',
                checked: selectedCameras.kamera_2,
              },
            ]}
            onChange={handleCameraChange}
            error={errors.cameras}
          />

          <EvoInCheckbox
            label="Otorisasi?"
            answers={[
              {
                label: 'Iya',
                value: 'otorisasi',
                checked: selectedOptions.otorisasi,
              },
            ]}
            onChange={handleCheckboxChange}
            error={errors.otorisasi}
          />

          <EvoInDropdown
            name="tipe_kendaraan"
            label="Tipe Kendaraan"
            options={[
              { label: 'Motor', value: 'Motor' },
              { label: 'Mobil', value: 'Mobil' },
              { label: 'All', value: 'All' },
            ]}
            value={selectedOptions.tipe_kendaraan}
            onChange={handleDropdownChange}
            error={errors.tipe_kendaraan}
            placeholder="Pilih Tipe Kendaraan"
          />
          <EvoInDropdown
            name="tipe_pos"
            label="Tipe Pos"
            options={[
              { label: 'In', value: 'In' },
              { label: 'Out', value: 'Out' },
            ]}
            value={selectedOptions.tipe_pos}
            onChange={handleDropdownChange}
            error={errors.tipe_pos}
            placeholder="Pilih Tipe Pos"
          />
          <EvoInDropdown
            name="tipe_manless"
            label="Tipe Manless"
            options={[
              { label: 'Loop 1 with Button', value: 'Loop 1 with Button' },
              {
                label: 'Loop 1 with Button and Feedback',
                value: 'Loop 1 with Button and Feedback',
              },
              { label: 'Feedback with Button', value: 'Feedback with Button' },
              { label: 'Button Only', value: 'Button Only' },
            ]}
            value={selectedOptions.tipe_manless}
            onChange={handleDropdownChange}
            error={errors.tipe_manless}
            placeholder="Pilih Tipe Manless"
          />
          <EvoInDropdown
            name="nama_printer"
            label="nama_printer"
            options={[
              { label: 'Epson TM-T81 Receipt', value: 'Epson TM-T81 Receipt' },
              { label: 'Epson TM-T82 Receipt', value: 'Epson TM-T82 Receipt' },
              {
                label: 'Epson TM-U220 Receipt',
                value: 'Epson TM-U220 Receipt',
              },
              {
                label: 'Epson TM-T88III Receipt',
                value: 'Epson TM-T88III Receipt',
              },
              {
                label: 'Epson TM-T88IV Receipt',
                value: 'Epson TM-T88IV Receipt',
              },
              {
                label: 'Epson TM-T88V Receipt',
                value: 'Epson TM-T88V Receipt',
              },
              {
                label: 'Epson TM-T82II Receipt',
                value: 'Epson TM-T82II Receipt',
              },
            ]}
            value={selectedOptions.nama_printer}
            onChange={handleDropdownChange}
            error={errors.nama_printer}
            placeholder="Pilih nama_printer"
          />
          <EvoInDropdown
            name="nama_interface"
            label="nama_interface"
            options={[
              { label: 'BGI', value: 'BGI' },
              { label: 'TWS', value: 'TWS' },
              { label: 'PAWL', value: 'PAWL' },
              { label: 'SMART PARKING', value: 'SMART PARKING' },
              { label: 'SER TELINKS', value: 'SER TELINKS' },
              { label: 'USB TELINKS', value: 'USB TELINKS' },
            ]}
            value={selectedOptions.nama_interface}
            onChange={handleDropdownChange}
            error={errors.nama_interface}
            placeholder="Pilih nama_interface"
          />

          <EvoInText
            name="com_port"
            label="COM Port"
            placeholder="Nomor Port"
            value={formData.com_port}
            onChange={handleChange}
            error={errors.com_port}
          />
          <EvoInText
            name="synchronize"
            label="Durasi Jeda Sinkronisasi (menit)"
            placeholder="Masukkan durasi"
            value={formData.synchronize}
            onChange={handleChange}
            error={errors.synchronize}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddPosForm;
