import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import { useQueryClient } from '@tanstack/react-query';
// import { fetchApiPengaturanGlobalOperatorUpdate } from '../api/fetchApiPengaturanGlobalOperatorUpdate';
import { fetchApiGlobalLogoUpload } from '../api/fetchApiGlobalLogoUpload'; // pastikan path ini benar

const EditFormUploadLogo = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    // id: '',
    // nama_operator: '',
  });

  const [fileLogo, setFileLogo] = useState(null);

  const handleCloseModal = () => {
    setFormData({
      //  id: '',
      // nama_operator: '' 
      });
    setFileLogo(null);
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        // id: initialData.id || '',
        // nama_operator: initialData.nama_operator || '',
      });
    }
  }, [initialData]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      setNotifMessage('File harus berupa gambar');
      setNotifType('error');
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      setNotifMessage('Ukuran file maksimal 2MB');
      setNotifType('error');
      return;
    }
    setFileLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
        newErrors[key] = `${formattedKey.charAt(0).toUpperCase()}${formattedKey
          .slice(1)
          .toLowerCase()} wajib diisi`;
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    try {
      // 1. Update data operator
      // await fetchApiPengaturanGlobalOperatorUpdate(formData);

      // 2. Upload logo jika ada file
      if (fileLogo) {
        const logoFormData = new FormData();
        logoFormData.append('logo', fileLogo);

        await fetchApiGlobalLogoUpload(logoFormData);
      }

      queryClient.invalidateQueries(['pengaturanGlobal']);

      setNotifMessage('Data operator dan logo berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
        title="Ganti Logo Operator"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          {/* <EvoInText
            name="nama_operator"
            label="Nama Operator"
            placeholder="Masukkan nama operator"
            value={formData.nama_operator}
            onChange={handleChange}
            error={errors.nama_operator}
          /> */}

          <div className="mt-4">
            <label className="block font-medium mb-1">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
            {fileLogo && (
              <p className="text-sm text-gray-600 mt-1">
                File dipilih: {fileLogo.name}
              </p>
            )}
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditFormUploadLogo;
