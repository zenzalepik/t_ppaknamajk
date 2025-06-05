import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';

const EditTarifParkirForm = ({
  isOpen,
  onClose,
  onSubmit,
  tipeKendaraan = 'Mobil',
}) => {
  const [formData, setFormData] = useState({
    tipeKendaraan: tipeKendaraan,
    gracePeriode: "",
    tarifGracePeriode: "",
    rotasiPertama: "",
    tarifRotasiPertama: "",
    rotasiKedua: "",
    tarifRotasiKedua: "",
    rotasiSeterusnya: "",
    tarifRotasiSeterusnya: "",
    tarifMaksimal: "",
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Edit Tarif Parkir">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <div className="border-2 border-primary rounded-[20px] p-4">
            <div className="text-card mb-1">Tipe Kendaraan</div>
            <div className="text-title_small">{tipeKendaraan}</div>
          </div>

          <div className="flex gap-3 relative">
            <div className="w-[50%] flex gap-2 relative">
              <div className="w-[50%]">
                <EvoInText
                  name="gracePeriode"
                  label="Grace Periode"
                  placeholder="0"
                  value={formData.gracePeriode}
                  onChange={handleChange}
                  error={errors.gracePeriode}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">menit</div>
            </div>
            <EvoInText
              name="tarifGracePeriode"
              label="Tarif dalam Grace Periode"
              placeholder="Rp. 0"
              value={formData.tarifGracePeriode}
              onChange={handleChange}
              error={errors.tarifGracePeriode}
            />
          </div>

          <div className="flex gap-3 ">
            <div className="w-[50%] flex gap-2 ">
              <div className="w-[50%]">
                <EvoInText
                  name=""
                  label="Rotasi Pertama"
                  placeholder="0"
                  value={formData.rotasiPertama}
                  onChange={handleChange}
                  error={errors.rotasiPertama}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">jam</div>
            </div>
            <EvoInText
              name="tarifRotasiPertama"
              label="Tarif Rotasi Pertama"
              placeholder="Rp. 0"
              value={formData.tarifRotasiPertama}
              onChange={handleChange}
              error={errors.tarifRotasiPertama}
            />
          </div>

          <div className="flex gap-3 ">
            <div className="w-[50%] flex gap-2 ">
              <div className="w-[50%]">
                <EvoInText
                  name="rotasiKedua"
                  label="Rotasi Kedua"
                  placeholder="0"
                  value={formData.rotasiKedua}
                  onChange={handleChange}
                  error={errors.rotasiKedua}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">jam</div>
            </div>
            <EvoInText
              name="tarifRotasiKedua"
              label="Tarif Rotasi Kedua"
              placeholder="Rp. 0"
              value={formData.tarifRotasiKedua}
              onChange={handleChange}
              error={errors.tarifRotasiKedua}
            />
          </div>

          <div className="flex gap-3 ">
            <div className="w-[50%] flex gap-2 relative">
              <div className="w-[50%]">
                <EvoInText
                  name="rotasiSeterusnya"
                  label="Rotasi Seterusnya"
                  placeholder="0"
                  value={formData.rotasiSeterusnya}
                  onChange={handleChange}
                  error={errors.rotasiSeterusnya}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">jam</div>
            </div>
            <EvoInText
              name="tarifRotasiSeterusnya"
              label="Tarif Rotasi Seterusnya"
              placeholder="Rp. 0"
              value={formData.tarifRotasiSeterusnya}
              onChange={handleChange}
              error={errors.tarifRotasiSeterusnya}
            />
          </div>

          <EvoInText
            name="tarifMaksimal"
            label="Tarif Maksimal"
            placeholder="Rp. 0"
            value={formData.tarifMaksimal}
            onChange={handleChange}
            error={errors.tarifMaksimal}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditTarifParkirForm;
