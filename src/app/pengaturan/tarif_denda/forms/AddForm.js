import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';


const AddTarifDendaForm = ({ isOpen, onClose, onSubmit }) => {
  
  const tipeKendaraan = 'Mobil';

  const [formData, setFormData] = useState({
    tipeKendaraan: tipeKendaraan,
    dendaTiket: '',
    dendaSTNK: '',
    berlakuUntukMember: '',
  });

  const [selectedOptions, setSelectedOptions] = useState({
    iya:false,
  });

  const [selectedBerlakuUntukMember, setSelectedBerlakuUntukMember] = useState({
    iya: false,
  });

  // const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: '',
    // }));
  };

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;
    
    // Update the state with the changed checkbox value
    setSelectedOptions((prev) => ({
      ...prev,
      [answer.value]: checked, // Update the value of the checkbox (checked or unchecked)
    }));

    // setErrors((prev) => ({
    //   ...prev,
    //   [answer.name]: '', // Remove the error related to the checkbox
    // }));
  };

  const handleBerlakuUntukMemberChange = (e, answer) => {
    const { checked } = e.target;
    
    // Update the state for camera selection
    setSelectedBerlakuUntukMember((prev) => ({
      ...prev,
      [answer.value]: checked, // Update camera1 or camera2 selection
    }));

    // setErrors((prev) => ({
    //   ...prev,
    //   cameras: '', // Remove camera selection error
    // }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newErrors = {
    //   dendaTiket: formData.dendaTiket.trim() === '' ? 'Silahkan isi nilai terlebih dahulu' : '',
    //   dendaSTNK: formData.dendaSTNK.trim() === '' ? 'Silahkan isi nilai terlebih dahulu' : '',
    // };

    // setErrors(newErrors);

    // if (Object.values(newErrors).some((err) => err !== '')) {
    //   setNotifMessage('Formulir tidak boleh kosong.');
    //   setNotifType('error');
    //   return;
    // }

    onSubmit?.({
      ...formData,
      ...selectedOptions,
      iya: selectedBerlakuUntukMember.iya,
      
    });

    setNotifMessage('Data Gerbang berhasil disimpan!');
    setNotifType('success');

    // Automatically close the modal after a short delay
    setTimeout(() => onClose(), 2000);
  };

  return (
    <>
      {notifMessage && (
        <EvoNotifCard message={notifMessage} onClose={() => setNotifMessage('')} type={notifType} autoClose={true} />
      )}

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Gerbang">
        <EvoForm onSubmit={handleSubmit} submitText="Simpan" cancelText="Batal" onCancel={onClose}>
          
        <div className="border-2 border-primary rounded-[20px] p-4">
            <div className="text-card mb-1">Tipe Kendaraan</div>
            <div className="text-title_small">{tipeKendaraan}</div>
          </div>
          <div className="flex gap-3">
          <EvoInText
            name="dendaTiket"
            label="Denda Tiket"
            placeholder="Rp. 0"
            value={formData.dendaTiket}
            onChange={handleChange}
            // error={errors.dendaTiket}
          />
           <EvoInText
            name="dendaSTNK"
            label="Denda STNK"
            placeholder="Rp. 0"
            value={formData.dendaSTNK}
            onChange={handleChange}
            // error={errors.dendaSTNK}
          /></div>

          <EvoInCheckbox
            label="Berlaku Untuk Member?"
            answers={[
              { label: 'Iya', value: 'iya', checked: selectedBerlakuUntukMember.iya },
            ]}
            onChange={handleBerlakuUntukMemberChange}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddTarifDendaForm;
