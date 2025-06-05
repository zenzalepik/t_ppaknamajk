import React from 'react';
import clsx from 'clsx';

// const Spinner = ({ size = 24, color = 'border-blue-500' }) => {
//   return (
//     <div
//       className={clsx(
//         'inline-block animate-spin rounded-full border-4 border-solid border-primary',
//         color,
//         'border-t-transparent'
//       )}
//       style={{ width: size, height: size }}
//     />
//   );
// };

const Spinner = ({ size = 24, color = 'border-primary' }) => {
  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-4 border-solid',
        color,
        'border-t-transparent'
      )}
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;
