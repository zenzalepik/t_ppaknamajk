// components/evosist_elements/EvoCardSection.js

import React from 'react';

const EvoCardSection = ({ children, className='' }) => {
  return (
    <div className={`flex flex-col gap-8 bg-white mx-6 p-5 rounded-[20px] shadow-card ${className}`}>
      {children}
    </div>
  );
};

export default EvoCardSection;
