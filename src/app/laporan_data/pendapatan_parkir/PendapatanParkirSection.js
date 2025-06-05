//PendapatanParkirSection.js
'use client';

import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import PendapatanParkirCasual from './PendapatanParkirCasual';
import PendapatanParkirMember from './PendapatanParkirMember';

const titleSection = 'Pendapatan Parkir';

export default function PendapatanParkirSection() {
  const tabs = [
    { key: 'casual', label: 'Pendapatan dari Casual' },
    { key: 'member', label: 'Pendapatan dari Member' },
  ];

  const tabComponents = {
    // laporan: PendapatanParkirSemua,
    casual: PendapatanParkirCasual,
    member: PendapatanParkirMember,
  };
  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      <EvoTab tabs={tabs} defaultTab="casual" tabComponents={tabComponents} />
    </EvoCardSection>
  );
}
