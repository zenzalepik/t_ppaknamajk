import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLargeLine } from '@remixicon/react';

const EvoModal = ({
  isOpen,
  onClose,
  title = 'Form',
  children,
  maxWidthModal = 'max-w-[648px]',
  titleTextColor = '',
  titleBgColor = '',
  titleIcon,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center py-16 bg-dark/80 backdrop-blur-lg overflow-auto evo_non_scrollbar"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-[56px] shadow-lg w-full ${maxWidthModal} p-8 relative`}
          >
            <div
              className={`flex justify-between items-center gap-2 mb-8 ${
                titleBgColor === '' ? '' : 'p-4 rounded-[20px] ' + titleBgColor
              }`}
            >
              <div className={`flex flex-col gap-2 `}>
                {titleIcon && <div className={titleTextColor}>{titleIcon}</div>}
                <h2
                  className={`text-title_large text-primary ${titleTextColor}`}
                >
                  {title}
                </h2>
              </div>

              <button
                onClick={onClose}
                className={
                  titleBgColor === '!bg-black'
                    ? 'p-3 rounded-[16px] bg-white/40 hover:bg-primaryTransparent text-white hover:text-danger'
                    : 
                  titleBgColor === '!bg-primary'?
                  'p-3 rounded-[16px] bg-black/40 hover:bg-black text-white hover:text-danger'
                  :'p-3 rounded-[16px] bg-tag hover:bg-primaryTransparent text-black/40 hover:text-danger'
                }
              >
                <RiCloseLargeLine size={24} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EvoModal;
