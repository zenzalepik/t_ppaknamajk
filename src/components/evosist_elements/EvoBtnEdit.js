import React from "react";
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiFileEditLine, RiArrowRightLine } from '@remixicon/react';

const EvoBtnEdit = ({ onClick, className }) => {
  return (
    <EvoButton
          // outlined
          // buttonText="🗑️"
          icon={<RiFileEditLine size={18} />}
          // borderColor="#FFC62A"
          fillColor="#FFC62A"
          onClick={onClick}
          title='Edit'
        />
  );
};

export default EvoBtnEdit;