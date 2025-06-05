'use client';

import React, { useState } from 'react';

export default function EvoTab({ tabs, defaultTab, tabComponents }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].key);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const ActiveComponent = tabComponents[activeTab] || (() => <div>Konten tidak tersedia</div>);

  return (
    <div className="w-full">
      {/* Container tab */}
      <div className="flex px-3">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`mx-0.5 px-4 py-2.5 text-card font-medium rounded-t-[12px] transition-all duration-300 border-2 border-primaryTransparent border-b-0 cursor-pointer ${
              activeTab === tab.key
                ? 'bg-primary text-white border-b-2 border-primary '
                : 'bg-primaryTransparent text-primary hover:bg-black hover:text-white'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Render komponen sesuai tab aktif */}
      <div className="py-4 px-4 border border-primaryTransparent rounded-[20px] bg-white shadow-card">
        <ActiveComponent />
      </div>
    </div>
  );
}
