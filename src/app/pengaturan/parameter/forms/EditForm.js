import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';

const EditParameterForm = ({
  isOpen,
  onClose,
  onSubmit,
  namaParameter = 'Bayar Member Ketika Keluar',
}) => {
  const [formData, setFormData] = useState({
    namaParameter: namaParameter,
    nilai: "",
  });


  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} wajib diisi`;
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
      setNotifMessage("Formulir tidak boleh kosong.");
      setNotifType("error");
      return;
    }

    onSubmit?.(formData);

    setNotifMessage("Tarif Parkir berhasil disimpan!");
    setNotifType("success");

    setTimeout(() => onClose(), 2000);
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Ubah Nilai Parameter">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <div className="border-2 border-primary rounded-[20px] p-4">
            <div className="text-card mb-1">Nama Parameter</div>
            <div className="text-title_small">{formData.namaParameter}</div>
          </div>

          <div className="mx-4">
                <EvoInText
                  name="nilai"
                  label="Nilai"
                  placeholder="Masukkan nilai"
                  value={formData.nilai}
                  onChange={handleChange}
                  error={errors.nilai}
                />
                </div>
          
          <div className="border-dashed p-4 !pt-0">
            <div className="text-card mb-1">Keterangan</div>
            <div className="text-title_content">Pengaturan mekanisme pembayaran untuk member</div>
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditParameterForm;
