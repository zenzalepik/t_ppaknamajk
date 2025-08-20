import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

const EvoButton = forwardRef(
  (
    {
      asChild = false,
      buttonText = '',
      className = '',
      type = 'submit',
      onClick,
      outlined = false,
      width = 'auto',
      icon = null,
      borderWidth = '1px',
      size = 'default',
      borderColor = '',
      fillColor = '',
      title = '',
      isReverse = false, // Tambahkan isReverse default false
    },
    ref
  ) => {
    const sizeClass = size === 'large' ? 'py-4 px-4' : 'py-2 px-2';

    const widthClass =
      {
        auto: 'w-auto',
        full: 'w-full',
        64: 'w-64',
        32: 'w-32',
      }[width] || (width && !isNaN(width) ? `w-[${width}]` : 'w-auto');

    const buttonStyle = {
      ...(outlined && {
        borderWidth: borderWidth,
        borderColor: borderColor || 'currentColor',
      }),
      ...(!outlined &&
        fillColor && {
          backgroundColor: fillColor,
        }),
    };

    const buttonClasses = outlined
      ? `${widthClass} ${sizeClass} flex justify-center items-center bg-transparent text-card border-primary text-primary rounded-[16px] ${className}`
      : `${widthClass} ${sizeClass} flex justify-center items-center bg-primary text-card text-white rounded-[16px] ${className}`;

    const iconMargin = buttonText
      ? 'flex gap-2 justify-center items-center'
      : 'flex gap-2 justify-center items-center';

    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        // type={type}
          {...(!asChild && { type })}
        className={buttonClasses}
        onClick={onClick}
        style={buttonStyle}
        title={title}
      >
        {isReverse ? (
          <div className={iconMargin}>
            {buttonText}
            {icon && <div>{icon}</div>}
          </div>
        ) : (
          <div className={iconMargin}>
            {icon && <div>{icon}</div>}
            {buttonText}
          </div>
        )}
      </Component>
    );
  }
);

// Tambahkan displayName untuk menghilangkan warning
EvoButton.displayName = "EvoButton";

export default EvoButton;
