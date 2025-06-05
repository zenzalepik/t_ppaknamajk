'use client';
import React from 'react';
import EvoBtnEdit from '@/components/evosist_elements/EvoBtnEdit';
import EvoBtnDelete from '@/components/evosist_elements/EvoBtnDelete';
import EvoTooltipConfirm from '@/components/EvoTooltipConfirm';
import EvoTooltipActionDataMember from '@/components/EvoTooltipActionDataMember';
import * as Popover from '@radix-ui/react-popover';
import EvoBtnMore from '@/components/evosist_elements/EvoBtnMore';
import EvoBtnAktifkan from '@/components/evosist_elements/EvoBtnAktifkan';
import EvoBtnKonfigurasi from '@/components/evosist_elements/EvoBtnKonfigurasi';

export default function EvoActionButtons({
  rowId,
  onPerpanjang = () => {},
  onGantiKartu = () => {},
  onGantiNomorPolisi = () => {},
  onRiwayatTransaksi = () => {},
  onEdit,
  onDelete,
  onAktifkan,
  onNonAktifkan,
  onConfigure,
  isActive = true, // optional status aktif
  moreAction = '',
  customButtons = [], // Parameter untuk tombol custom
}) {
  const handleAktifkanClick = () => {
    if (isActive && typeof onNonAktifkan === 'function') {
      onNonAktifkan(rowId);
    } else if (!isActive && typeof onAktifkan === 'function') {
      onAktifkan(rowId);
    }
  };
  return (
    <div className="relative flex gap-2 justify-end">
      {/* Custom Buttons */}
      {customButtons.map((button, index) => (
        <div key={index}>{button}</div>
      ))}

      {/* Konfigurasi */}
      {onConfigure && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <span>
              <EvoBtnKonfigurasi onClick={onConfigure} />
            </span>
          </Popover.Trigger>
        </Popover.Root>
      )}

      {/* Aktifkan */}
      {isActive != null && (onAktifkan || onNonAktifkan) && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <span>
              <EvoBtnAktifkan
                isActive={isActive}
                onClick={handleAktifkanClick}
              />
            </span>
          </Popover.Trigger>
        </Popover.Root>
      )}

      {/* Edit */}
      {onEdit && <EvoBtnEdit onClick={() => onEdit(rowId)} />}

      {/* Deletee */}
      {onDelete && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <span>
              <EvoBtnDelete onClick={() => {}} />
            </span>
          </Popover.Trigger>
          <EvoTooltipConfirm
            onConfirm={() => onDelete(rowId)}
            onCancel={() => document.activeElement?.blur()}
          />
        </Popover.Root>
      )}

      {moreAction === 'Data Member' && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <div className="flex justify-center items-center ml-1.5 ">
              <EvoBtnMore />
            </div>
          </Popover.Trigger>
          <EvoTooltipActionDataMember
            onConfirm={() => onDelete(rowId)}
            onCancel={() => document.activeElement?.blur()}
            onPerpanjang={onPerpanjang}
            onGantiKartu={onGantiKartu}
            onGantiNomorPolisi={onGantiNomorPolisi}
            onRiwayatTransaksi={onRiwayatTransaksi}
          />
        </Popover.Root>
      )}
    </div>
  );
}
