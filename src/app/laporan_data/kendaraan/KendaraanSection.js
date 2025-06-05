//KendaraanSection.js
'use client';

import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import KendaraanContentIn from './KendaraanContentIn';
import KendaraanContentOut from './KendaraanContentOut';



export default function KendaraanSection() {
  const tabs = [
    { key: 'in', label: 'In (Masih di dalam)' },
    { key: 'out', label: 'Out (Sudah keluar)' },
  ];
  
  const tabComponents = {
  in: KendaraanContentIn,
  out: KendaraanContentOut,
};
  return (
    <EvoCardSection
    className='!p-0 !bg-transparent !shadow-none'
    >

      <EvoTab tabs={tabs} defaultTab="in" tabComponents={tabComponents} />

    </EvoCardSection>
  );
}
