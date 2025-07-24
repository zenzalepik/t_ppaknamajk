import React, { useState, useEffect } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import companyTypes from '@/utils/companyTypes';
import strings from '@/utils/strings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPOSUpdate } from '../api/fetchApiMasterDataPOSUpdate';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { fetchApiPengaturanParameterTipeManless } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeManless';
import { fetchApiPengaturanParameterNamaPrinter } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterNamaPrinter';
import { fetchApiPengaturanParameterNamaInterface } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterNamaInterface';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const EditPosForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();
  const [currentPageTipeKendaraan, setCurrentPageTipeKendaraan] = useState(1);
    const [currentPageTipeManless, setCurrentPageTipeManless] = useState(1);
    const [currentPageNamaPrinter, setCurrentPageNamaPrinter] = useState(1);
    const [currentPageNamaInterface, setCurrentPageNamaInterface] = useState(1);

  const {
    data: pengaturanParameterTipeKendaraan,
    errorTipeKendaraan,
    isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanParameterTipeKendaraan', currentPageTipeKendaraan],
    queryFn: () =>
      fetchApiPengaturanParameterTipeKendaraan({
        limit: 5,
        page: currentPageTipeKendaraan,
        offset: (currentPageTipeKendaraan - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

    const {
      data: pengaturanParameterTipeManless,
      errorTipeManless,
      isLoadingTipeManless,
    } = useQuery({
      queryKey: ['pengaturanParameterTipeManless', currentPageTipeManless],
      queryFn: () =>
        fetchApiPengaturanParameterTipeManless({
          limit: 111,
          page: currentPageTipeManless,
          // offset: (currentPageTipeManless - 1) * 5,
          // sortBy: 'id',
          sortOrder: 'desc',
        }),
      // retry: false,
    });
  
    const {
      data: pengaturanParameterNamaPrinter,
      errorNamaPrinter,
      isLoadingNamaPrinter,
    } = useQuery({
      queryKey: ['pengaturanParameterNamaPrinter', currentPageNamaPrinter],
      queryFn: () =>
        fetchApiPengaturanParameterNamaPrinter({
          limit: 111,
          page: currentPageNamaPrinter,
          // offset: (currentPageNamaPrinter - 1) * 5,
          // sortBy: 'id',
          sortOrder: 'desc',
        }),
      // retry: false,
    });
  
    const {
      data: pengaturanParameterNamaInterface,
      errorNamaInterface,
      isLoadingNamaInterface,
    } = useQuery({
      queryKey: ['pengaturanParameterNamaInterface', currentPageNamaInterface],
      queryFn: () =>
        fetchApiPengaturanParameterNamaInterface({
          limit: 111,
          page: currentPageNamaInterface,
          // offset: (currentPageNamaInterface - 1) * 5,
          // sortBy: 'id',
          sortOrder: 'desc',
        }),
      // retry: false,
    });


  const [formData, setFormData] = useState({
    id: '',
    kode: '',
    keterangan: '',
    synchronize: '',
    com_port: '',
    user_id: '',

    otorisasi: false,
    tipe_kendaraan: '',
    tipe_pos: '',
    tipe_manless_id: '',
    nama_printer_id: '',
    nama_interface_id: '',
  });

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setFormData((prev) => ({
        ...prev,
        id: initialData.id || '',
        kode: initialData.kode || '',
        keterangan: initialData.keterangan || '',
        synchronize: initialData.synchronize || '',
        com_port: initialData.com_port || '',
        // user_id: initialData.user_id ||'',

        otorisasi: initialData.otorisasi || false,
        tipe_kendaraan: initialData.tipe_kendaraan || '',
        tipe_pos: initialData.tipe_pos || '',
        tipe_manless_id: initialData.tipe_manless_id || '',
        nama_printer_id: initialData.nama_printer_id || '',
        nama_interface_id: initialData.nama_interface_id || '',
      }));

      setSelectedOptions({
        otorisasi: initialData.otorisasi || false,
      });

      setSelectedCameras({
        kamera_1: initialData.kamera_1 || false,
        kamera_2: initialData.kamera_2 || false,
      });
    }
  }, [initialData]);

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      id: '',
      kode: '',
      keterangan: '',
      synchronize: '',
      com_port: '',
      // user_id: '',

      otorisasi: false,
      tipe_kendaraan: '',
      tipe_pos: '',
      tipe_manless_id: '',
      nama_printer_id: '',
      nama_interface_id: '',
    }));

    setSelectedOptions({
      otorisasi: false,
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
    // tipe_kendaraan: '',
    // tipe_pos: '',
    // tipe_manless_id: '',
    // nama_printer_id: '',
    // nama_interface_id: '',
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
        formData.tipe_kendaraan === '' ? 'Tipe Kendaraan wajib dipilih' : '',
      tipe_pos: formData.tipe_pos === '' ? 'Tipe Pos wajib dipilih' : '',
      tipe_manless_id:
        formData.tipe_manless_id === '' ? 'Tipe Manless wajib dipilih' : '',
      nama_printer_id:
        formData.nama_printer_id === '' ? 'nama_printer_id wajib dipilih' : '',
      nama_interface_id:
        formData.nama_interface_id === '' ? 'nama_interface_id wajib dipilih' : '',
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
      await fetchApiMasterDataPOSUpdate(finalData);

      queryClient.invalidateQueries(['masterDataPOS']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Pos berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  if (
    isLoadingTipeKendaraan ||
    isLoadingTipeManless ||
    isLoadingNamaPrinter ||
    isLoadingNamaInterface
  )
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (
    errorTipeKendaraan ||
    errorTipeManless ||
    errorNamaPrinter ||
    errorNamaInterface
  ) {
    return (
      <EvoErrorDiv
        errorHandlerText={getErrorMessage(
          errorTipeKendaraan ||
            errorTipeManless ||
            errorNamaPrinter ||
            errorNamaInterface
        )}
      />
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
            // options={[
            //   { label: 'Motor', value: 'Motor' },
            //   { label: 'Mobil', value: 'Mobil' },
            //   { label: 'All', value: 'All' },
            // ]}
            options={(pengaturanParameterTipeKendaraan?.data || []).map(
              (item) => ({
                label: item.tipe_kendaraan,
                value: item.tipe_kendaraan,
              })
            )}
            value={formData.tipe_kendaraan}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                tipe_kendaraan: value,
              }))
            }
            error={errors.tipe_kendaraan}
            placeholder="Pilih tipe kendaraan"
          />
          <EvoInDropdown
            name="tipe_pos"
            label="Tipe Pos"
            options={[
              { label: 'In', value: 'In' },
              { label: 'Out', value: 'Out' },
            ]}
            value={formData.tipe_pos}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                tipe_pos: value,
              }))
            }
            error={errors.tipe_pos}
            placeholder="Pilih tipe pos"
          />
         
          <EvoInDropdown
            name="tipe_manless_id"
            label="Tipe Manless"
            options={(pengaturanParameterTipeManless?.data || []).map(
              (item) => ({
                label: item.tipe_manless,
                value: item.id,
              })
            )}
            value={formData.tipe_manless_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                tipe_manless_id: value,
              }))
            }
            error={errors.tipe_manless_id}
            placeholder="Pilih tipe manless"
          />
          <EvoInDropdown
            name="nama_printer_id"
            label="Nama Printer"
            options={(pengaturanParameterNamaPrinter?.data || []).map(
              (item) => ({
                label: item.nama_printer,
                value: item.id,
              })
            )}
            value={formData.nama_printer_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                nama_printer_id: value,
              }))
            }
            error={errors.nama_printer_id}
            placeholder="Pilih nama printer"
          />
        
            <EvoInDropdown
            name="nama_interface_id"
            label="Nama Interface"
            options={(pengaturanParameterNamaInterface?.data || []).map(
              (item) => ({
                label: item.nama_interface,
                value: item.id,
              })
            )}
            value={formData.nama_interface_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                nama_interface_id: value,
              }))
            }
            error={errors.nama_interface_id}
            placeholder="Pilih nama interface"
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

export default EditPosForm;
