import React from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';

const EvoForm = ({
  children,
  onCancel,
  onSubmit,
  cancelText = '',
  submitText = 'Submit',
  className = 'flex flex-col w-full gap-6',
  noform = false,
}) => {
  return noform == false ? (
    <form onSubmit={onSubmit} className={className}>
      <hr className="border-t border-border/40" />
      {children}
      <hr className="border-t border-border/40" />
      <div className="flex justify-end gap-3">
        {/* Tampilkan tombol cancel hanya jika cancelText disediakan */}
        {cancelText && (
          <EvoButton
            buttonText={cancelText}
            outlined
            type="button"
            className="w-3/12"
            onClick={onCancel}
          />
        )}
        <EvoButton
          buttonText={submitText}
          // outlined
          type="submit"
          size="large"
          className="w-1/3"
          // icon={<RiArrowLeftLine size={18} />}
          // onClick={() => handlePageClick(currentPage - 1)}
        />
      </div>
    </form>
  ) : (
    <div className={className}>
      <hr className="border-t border-border/40" />
      {children}
      <hr className="border-t border-border/40" />
      <div className="flex justify-end gap-3">
        {/* Tampilkan tombol cancel hanya jika cancelText disediakan */}
        {cancelText && (
          <EvoButton
            buttonText={cancelText}
            outlined
            type="button"
            className="w-3/12"
            onClick={onCancel}
          />
        )}
        <EvoButton
          buttonText={submitText}
          // outlined
          onClick={onSubmit}
          type="submit"
          size="large"
          className="w-1/3"
          // icon={<RiArrowLeftLine size={18} />}
          // onClick={() => handlePageClick(currentPage - 1)}
        />
      </div>
    </div>
  );
};

export default EvoForm;
