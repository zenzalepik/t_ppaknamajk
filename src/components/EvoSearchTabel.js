import React, { useState } from 'react';
import { RiSearchLine, RiEqualizerLine, RiCloseLargeLine } from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';

export default function EvoSearchTabel({ placeholder = 'Temukan loker impian kamu...', onSearch, isFilter = false, FilterComponent }) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({});

  const handleOpenFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilterData(updatedFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const inputValue = e.target.elements.searchInput.value; // Ambil input teks
    const searchCriteria = {
      searchText: inputValue,
      filters: filterData, // Data filter dari komponen filter
    };

    // Kirimkan pencarian ke fungsi induk
    onSearch?.(searchCriteria);
    console.log(e);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col mb-4 mx-[8%] gap-3">
      <div className="flex gap-3 w-full">
        {isFilter && (
          <EvoButton
            outlined={true}
            buttonText=""
            icon={isOpenFilter ? <RiCloseLargeLine /> : <RiEqualizerLine />}
            onClick={handleOpenFilter}
            className="!w-16 !h-14 !p-0 flex items-center justify-center selft-center"
          />
        )}
        
        <div className="w-full flex items-center px-4 py-1 bg-white border-2 border-red-500 rounded-[16px]">
          <RiSearchLine className="text-primary" />
          <input id="searchInput" name="searchInput" type="text" placeholder={placeholder} className="flex-1 p-2 w-full rounded-md focus:outline-none bg-transparent" />
        </div>
        
        <EvoButton width="116" buttonText="Pencarian" type="submit" />
      </div>

      {/* Gunakan komponen filter yang diberikan oleh user */}
      {isOpenFilter && FilterComponent && (
        <FilterComponent 
          isOpenFilter={isOpenFilter}
          onChangeFilter={handleFilterChange}
        />
      )}
    </form>
  );
}
