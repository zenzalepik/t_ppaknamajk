'use client';

import React from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';

export default function EvoTable({
  id = '',
  tableData,
  rows = tableData.rows, // fallback ke rows dari tableData jika tidak diberikan
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isTallRow = false,
}) {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <>
      <div
        className={`border border-primaryTransparent rounded-[16px] w-full max-w-full overflow-x-auto`}
      >
        <table id={id} className="min-w-max w-full table-auto text-left">
          <thead>
            <tr className="bg-primaryTransparent !text-content_medium">
              {tableData.columns.map((column, index) => (
                <th key={index} className="p-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b !text-content_reguler text-black/[0.72]  ${
                  isTallRow ? '!align-top' : ''
                }`}
              >
                {tableData.columns.map((col, colIndex) => {
                  const key = col.label.toLowerCase().replace(/\s/g, '');
                  let value = row[key] ?? Object.values(row)[colIndex];

                  return (
                    <td key={colIndex} className="p-2">
                      {typeof value === 'function' ? value() : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && currentPage ? (
        <div className="-my-6 flex items-center justify-end gap-3 py-6">
          <EvoButton
            outlined
            icon={<RiArrowLeftLine size={18} />}
            onClick={() => handlePageClick(currentPage - 1)}
          />
          {/* {Array.from({ length: totalPages }, (_, i) => (
          <EvoButton
            key={i}
            outlined={currentPage !== i + 1}
            buttonText={`${i + 1}`}
            onClick={() => handlePageClick(i + 1)}
          />
        ))} */}
          {(() => {
            const getPageNumbers = () => {
              const pages = new Set();
              pages.add(1);
              pages.add(totalPages);
              for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 1 && i < totalPages) pages.add(i);
              }
              return Array.from(pages).sort((a, b) => a - b);
            };

            const pages = getPageNumbers();
            const buttons = [];

            for (let i = 0; i < pages.length; i++) {
              const page = pages[i];
              const prevPage = pages[i - 1];

              if (prevPage && page - prevPage > 1) {
                buttons.push(
                  <span
                    key={`ellipsis-${i}`}
                    className="text-content_reguler text-sm px-2"
                  >
                    ...
                  </span>
                );
              }

              buttons.push(
                <EvoButton
                  key={page}
                  outlined={currentPage !== page}
                  buttonText={`${page}`}
                  onClick={() => handlePageClick(page)}
                />
              );
            }

            return buttons;
          })()}

          <EvoButton
            outlined
            icon={<RiArrowRightLine size={18} />}
            onClick={() => handlePageClick(currentPage + 1)}
          />
        </div>
      ) : null}
    </>
  );
}
