import React from 'react';
import Spinner from '@/components/Spinner';

const EvoLoading = () => {
  return (
    <div className="absolute right-0 left-0 top-0 bottom-0 bg-primary/20 rounded-[14px] min-h-[120px] h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
      <div className="p-4 rounded-[20px] bg-white/40 backdrop-blur-sm  flex flex-col gap-2 justify-center items-center">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    </div>
  );
};

export default EvoLoading;
