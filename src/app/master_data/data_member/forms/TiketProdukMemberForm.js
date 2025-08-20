'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoTicketMember from '@/components/EvoTicketMember';

const TiketProdukMemberForm = ({
  isOpen,
  onClose,
  onSubmit,
  listProdukMembers = [],
  // onReceiveListIdKendaraan,
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  useEffect(() => {
    if (!isOpen) {
      setSelectedVoucher(null);
      setNotifMessage('');
    }
  }, [isOpen]);

  const handleSelectVoucher = (produkMember) => {
    setSelectedVoucher(produkMember);
    setNotifMessage('');
    onSubmit?.(produkMember); // Langsung submit data saat dipilih
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVoucher) {
      setNotifMessage('Harap pilih produk member sebelum menyimpan.');
      setNotifType('error');
      return;
    }

    // console.log('Voucher yang dikirim:', selectedVoucher);
    onSubmit?.(selectedVoucher);

    setNotifMessage('Voucher berhasil dipilih!');
    setNotifType('success');

    setTimeout(() => onClose(), 1000);
  };

  // console.log(listProdukMembers);
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Pilih Produk Voucher">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
          noform={true}
        >
          <div className="flex flex-col gap-2">
            {listProdukMembers?.length > 0 ? (
              listProdukMembers.map((produkMember, index) => (
                <div
                  key={`${produkMember.id}-${index}`}
                  onClick={() => handleSelectVoucher(produkMember)}
                  className={`cursor-pointer ${
                    selectedVoucher?.id === produkMember.id
                      ? 'border-2 border-primary rounded-lg'
                      : ''
                  }`}
                >
                  <EvoTicketMember
                    produkMember={produkMember}
                    // onSendListIdKendaraan={onReceiveListIdKendaraan}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">Tidak ada produk member tersedia.</p>
            )}
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default TiketProdukMemberForm;
