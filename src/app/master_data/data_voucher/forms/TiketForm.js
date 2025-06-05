'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoTicketVoucher from '@/components/EvoTicketVoucher';

const TiketForm = ({ isOpen, onClose, onSubmit, listVouchers = [] }) => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  useEffect(() => {
    if (!isOpen) {
      setSelectedVoucher(null);
      setNotifMessage('');
    }
  }, [isOpen]);

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setNotifMessage('');
    onSubmit?.(voucher); // Langsung submit data saat dipilih
  onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVoucher) {
      setNotifMessage('Harap pilih voucher sebelum menyimpan.');
      setNotifType('error');
      return;
    }

    console.log('Voucher yang dikirim:', selectedVoucher);
    onSubmit?.(selectedVoucher);

    setNotifMessage('Voucher berhasil dipilih!');
    setNotifType('success');

    setTimeout(() => onClose(), 1000);
  };

  return (
    <>
      {notifMessage && (
        <EvoNotifCard message={notifMessage} onClose={() => setNotifMessage('')} type={notifType} autoClose={true} />
      )}

      <EvoModal isOpen={isOpen} onClose={onClose} title="Pilih Produk Voucher">
        <EvoForm onSubmit={handleSubmit} submitText="Simpan" cancelText="Batal" onCancel={onClose} noform={true}>
          <div className="flex flex-col gap-2">
            {listVouchers.length > 0 ? (
              listVouchers.map((voucher) => (
                <div key={voucher.no} onClick={() => handleSelectVoucher(voucher)} className={`cursor-pointer ${selectedVoucher?.no === voucher.no ? 'border-2 border-primary rounded-lg' : ''}`}>
                  <EvoTicketVoucher voucher={voucher} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada voucher tersedia.</p>
            )}
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default TiketForm;
