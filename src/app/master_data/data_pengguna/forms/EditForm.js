import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import { fetchApiMasterDataDataPenggunaUpdate } from '../api/fetchApiMasterDataDataPenggunaUpdate';
import { useQuery , useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPerusahaan } from '@/app/master_data/perusahaan/api/fetchApiMasterDataPerusahaan';
import {fetchApiMasterDataLevelPengguna} from '@/app/master_data/level_pengguna/api/fetchApiMasterDataLevelPengguna';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const EditDataPenggunaForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

  

  const {
    data: masterDataPerusahaan,
    errorDataPerusahaan,
    isLoadingDataPerusahaan,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit: 905,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: masterDataLevelPengguna,
    errorDataLevelPengguna,
    isLoadingDataLevelPengguna,
  } = useQuery({
    queryKey: ['masterDataLevelPengguna', currentPage],
    queryFn: () =>
      fetchApiMasterDataLevelPengguna({
        limit: 905,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    no_hp: '',
    jenis_kelamin: '',
    alamat_lengkap: '',
    username: '',
    // password: '',
    // ulangiPassword: '',
    perusahaan_id: '',
    level_pengguna_id: '',
    // status: true,
    // added_by: userId,
  });

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setFormData((prev) => ({
        ...prev,
        id: initialData.id || '',
        nama: initialData.nama || '',
        no_hp: initialData.no_hp || '',
        jenis_kelamin: initialData.jenis_kelamin || '',
        alamat_lengkap: initialData.alamat_lengkap || '',
        username: initialData.username || '',
        // password: initialData.password || '',
        // ulangiPassword: initialData.password || '',
        perusahaan_id: initialData.perusahaan_id || '',
        level_pengguna_id: initialData.level_pengguna_id || '',
        // status:initialData.status,
        // added_by:initialData.added_by || '',
      }));
    }
  }, [initialData]);

  useEffect(() => {}, [formData]);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      console.log('User ID yang terautentikasi:', id);
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        added_by: userId,
      }));
    }
  }, [userId]);

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      nama: '',
      no_hp: '',
      jenis_kelamin: '',
      alamat_lengkap: '',
      username: '',
      // password: '',
      ulangiPassword: '',
      perusahaan_id: '',
      level_pengguna_id: '',
      // status: true,
      // added_by: userId,
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  // const [selectedOptions, setSelectedOptions] = useState({
  //   perusahaan_id: '',
  //   level_pengguna_id: '',
  // });

  const [selectedCameras, setSelectedCameras] = useState({
    kamera1: false,
    kamera2: false,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nama: formData.nama.trim() === '' ? 'Nama Lengkap wajib diisi' : '',
      no_hp: formData.no_hp.trim() === '' ? 'Nomor Telepon wajib diisi' : '',
      jenis_kelamin:
        formData.jenis_kelamin === '' ? 'Jenis Kelamin wajib dipilih' : '',
      alamat_lengkap:
        formData.alamat_lengkap.trim() === '' ? 'Alamat wajib diisi' : '',
      username: formData.username.trim() === '' ? 'Username wajib diisi' : '',
      // password: formData.password.trim() === '' ? 'Password wajib diisi' : '',
      // ulangiPassword:
      //   formData.ulangiPassword.trim() === ''
      //     ? 'Konfirmasi Password wajib diisi'
      //     : '',
      perusahaan_id:
        formData.perusahaan_id === '' ? 'Perusahaan wajib dipilih' : '',
      level_pengguna_id:
        formData.level_pengguna_id === '' ? 'Level Pengguna wajib dipilih' : '',
      // perusahaan_id:
      //   formData.perusahaan_id === '' ? 'Perusahaan Asal wajib dipilih' : '',
      // level_pengguna_id:
      //   formData.level_pengguna_id === '' ? 'Level Pengguna wajib dipilih' : '',
    };

    // if (formData.password !== formData.ulangiPassword) {
    //   newErrors.ulangiPassword = 'Password tidak cocok';
    // }

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);
    console.log(formData);
    try {
      await fetchApiMasterDataDataPenggunaUpdate(formData);

      queryClient.invalidateQueries(['masterDataDataPengguna']); // Refresh tabel setelah tambah data

      setNotifMessage('Data pengguna berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  if (isLoadingDataPerusahaan||isLoadingDataLevelPengguna)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorDataPerusahaan||errorDataLevelPengguna) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(errorDataPerusahaan||errorDataLevelPengguna)} />; // ✅ Pastikan error ditampilkan di UI
  }

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose
        />
      )}

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Edit Data Pengguna"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
          />

          <div className="flex gap-3 relative">
            <div className="flex w-1/2">
              <EvoInText
                name="no_hp"
                label="Nomor Handphone"
                placeholder="Masukkan nomor handphone"
                value={formData.no_hp}
                onChange={handleChange}
                error={errors.no_hp}
              />
            </div>
            <div className="flex w-1/2">
              <EvoInRadio
                name="jenis_kelamin"
                label="Jenis Kelamin"
                placeholder="Pilih jenis kelamin"
                items={[
                  { label: 'Laki-laki', value: 'Laki-laki' },
                  { label: 'Perempuan', value: 'Perempuan' },
                ]}
                value={formData.jenis_kelamin}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, jenis_kelamin: value }))
                }
                direction="horizontal"
                error={errors.jenis_kelamin}
              />
            </div>
          </div>
          <EvoInTextarea
            name="alamat_lengkap"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
            value={formData.alamat_lengkap}
            onChange={handleChange}
            error={errors.alamat_lengkap}
          />
          <EvoInText
            name="username"
            label="Username"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          {/* <div className="flex gap-3 relative">
            <EvoInText
              name="password"
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <EvoInText
              name="ulangiPassword"
              label="Ulangi Password"
              placeholder="Masukkan ulangi password"
              type="password"
              value={formData.ulangiPassword}
              onChange={handleChange}
              error={errors.ulangiPassword}
            />
          </div> */}
          <EvoInDropdown
            name="perusahaan_id"
            label="Asal Perusahaan"
            // options={[
            //   { label: 'Evolusi Sistem Digital', value: 1 },
            //   { label: 'Graha Sejahtera', value: 3 },
            //   { label: 'Smart Office Solutions', value: 4 },
            //   { label: 'Smart Office Solutions', value: 7 },
            //   { label: 'Mega Proyek Indonesia', value: 8 },
            // ]}
            options={(masterDataPerusahaan?.data || []).map(
              (item) => ({
                label: item.nama,
                value: item.id,
              })
            )}
            value={formData.perusahaan_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                perusahaan_id: value,
              }))
            }
            error={errors.perusahaan_id}
            placeholder="Pilih perusahaan_id"
          />
          <EvoInDropdown
            name="level_pengguna_id"
            label="Level Pengguna"
            // options={[
            //   { label: 'Admin', value: '1' },
            //   { label: 'User', value: '2' },
            // ]}
            options={(masterDataLevelPengguna?.data || []).map(
              (item) => ({
                label: item.nama,
                value: item.id,
              })
            )}
            value={formData.level_pengguna_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                level_pengguna_id: value,
              }))
            }
            error={errors.level_pengguna_id}
            placeholder="Pilih level pengguna"
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditDataPenggunaForm;
