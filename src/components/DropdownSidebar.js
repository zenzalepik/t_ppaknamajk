'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DropdownSidebar({ items = [], isOpen = false }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="evo_sidebar_dropdown_content overflow-hidden mt-1 p-2 flex flex-col bg-white/10 rounded-md shadow-md"
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {/* <button
                key={index}
                className="evo_sidebar_menu_button max-full break-words rounded-md text-left px-1.5 py-3 text-content_semilarge text-white hover:text-primary bg-white/0 hover:bg-white w-full transition-colors duration-300 ease-in-out"
                onClick={item.onClick}
              >
                <div>{item.label}</div>
              </button> */}

              <button
                key={index}
                className={`evo_sidebar_menu_button max-full break-words rounded-md text-left px-1.5 py-3 text-content_semilarge w-full transition-colors duration-300 ease-in-out ${
                  item.active
                    ? 'bg-primary text-white'
                    : 'text-white hover:text-primary hover:bg-white/10'
                }`}
                onClick={item.onClick}
              >
                <div>{item.label}</div>
              </button>

              {index !== items.length - 1 && (
                <div className="max-w-full mx-1.5 h-px bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
