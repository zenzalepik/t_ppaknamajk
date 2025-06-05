'use client';

import React, { useState } from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiEyeLine, RiEyeOffLine, RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';

export default function EvoTableMulti({
  id = '',
  tableData,
  rows = tableData.rows,
  textRight='',
  textLeft='',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isTallRow = false,
  orangeEndIndex = 8,
  blackStartIndex = 9,
}) {
  const [showOrangeColumns, setShowOrangeColumns] = useState(true);
  const [showBlackColumns, setShowBlackColumns] = useState(true);

  const isVisible = (index) => {
    if (index === 0) return true;
    if (index <= orangeEndIndex && !showOrangeColumns) return false;
    if (index >= blackStartIndex && !showBlackColumns) return false;
    return true;
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <>
      {/* Tombol Show/Hide */}
      <div className="flex gap-2 justify-between">
        <EvoButton
          outlined={!showOrangeColumns}
          className='!transform scale-[0.75] -ml-5 -mb-6 px-2 py-2 !bg-primary/10 !text-primary !border-none '
          icon={
            showOrangeColumns
              ? <RiEyeLine /> 
              : <RiEyeOffLine />}
          buttonText={
            showOrangeColumns
              ? `Tabel ${textLeft}`
              : `Tabel ${textLeft}`
          }
          onClick={() => setShowOrangeColumns(!showOrangeColumns)}
        />
        <EvoButton
          outlined={!showBlackColumns}
          className='!transform scale-[0.75] -mr-5 -mb-6 px-2 py-2 !bg-black/10 !text-black !border-none '
          icon={showBlackColumns
            ? <RiEyeLine />
            : <RiEyeOffLine />}
          buttonText={
            showBlackColumns
              ? `Tabel ${textRight}`
              : `Tabel ${textRight}`
          }
          onClick={() => setShowBlackColumns(!showBlackColumns)}
        />
      </div>

      <div
        className={`border border-primaryTransparent rounded-[16px] w-full max-w-full overflow-x-auto`}
      >
        <table id={id} className="min-w-max w-full table-auto text-left">
          <thead>
            <tr className="bg-primaryTransparent">
              {tableData.columns.map((column, index) =>
                isVisible(index) ? (
                  <th
                    key={index}
                    className={`p-2 text-white ${
                      index <= orangeEndIndex
                        ? 'bg-primary'
                        : index >= blackStartIndex
                        ? 'bg-black'
                        : ''
                    }`}
                  >
                    {column.label}
                  </th>
                ) : null
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b text-content_reguler text-black/[0.72] ${
                  isTallRow ? '!align-top' : ''
                }`}
              >
                {tableData.columns.map((col, colIndex) => {
                  if (!isVisible(colIndex)) return null;

                  const key = col.label.toLowerCase().replace(/\s/g, '');
                  const value = row[key] ?? Object.values(row)[colIndex];

                  return (
                    <td
                      key={colIndex}
                      className={`p-2 
                        `}
                      // ${
                      // colIndex <= orangeEndIndex
                      //   ? 'text-orange-600'
                      //   : colIndex >= blackStartIndex
                      //   ? 'text-black'
                      //   : ''
                      //   }
                    >
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
          {Array.from({ length: totalPages }, (_, i) => (
            <EvoButton
              key={i}
              outlined={currentPage !== i + 1}
              buttonText={`${i + 1}`}
              onClick={() => handlePageClick(i + 1)}
            />
          ))}
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
