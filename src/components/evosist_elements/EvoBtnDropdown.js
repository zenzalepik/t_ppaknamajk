import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RiArrowDownSLine } from '@remixicon/react';

const EvoBtnDropdown = ({
  label,
  icon: Icon,
  items = [],
  defaultOpen = false,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [selectedLabel, setSelectedLabel] = useState(label);

  const toggleDropdown = () => {
    const newState = !open;
    setOpen(newState);
    onOpenChange?.(newState);
  };

  const handleSelect = (item) => {
    setSelectedLabel(item.label);
    item.onClick?.(); // jalankan aksi item
    setOpen(false); // tutup dropdown
  };

  return (
    <div
      className="relative flex items-center gap-0.5 border border-primary rounded-[12px] px-3 py-2 cursor-pointer select-none"
      onClick={toggleDropdown}
    >
      <span className="mr-2 text-label_medium_semibold text-primary">
        {selectedLabel}
      </span>
      <RiArrowDownSLine
        size={14}
        className={`text-primary transition-transform ${open ? 'rotate-180' : ''}`}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute right-0 top-12 w-40 bg-white text-black rounded-md shadow-item_dropdown transition-shadow duration-300 ease-in-out overflow-hidden z-10"
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                </button>
                {index !== items.length - 1 && <div className="mx-4 h-px bg-gray-200" />}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvoBtnDropdown;
