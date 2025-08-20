import React from 'react';

const EvoNotifCard = ({
  message,
  type = 'error', // tipe pesan: 'error', 'success', 'info'
  onClose,
  autoClose = false,
  autoCloseDelay = 3000, // waktu tutup otomatis dalam milidetik
}) => {
  const notificationClasses = {
    error: 'bg-danger text-white',
    success: 'bg-success text-white',
    info: 'bg-info text-white',
  };

  React.useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, autoCloseDelay, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 pt-2 pb-1 px-3 rounded-[16px] ${
        notificationClasses[type]
      } flex flex-col gap-2 items-start justify-between mb-4 z-[70] shadow-notif transition-all duration-300 transform w-80`}
      role="alert"
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
          <span className="mr-2 flex justify-center items-center h-8 w-8 bg-white/80 p-1 rounded-[12px] text-card">{type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}</span>
          <span className="text-card">{message}</span>
        </div>
        {/* {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-xl font-bold text-white focus:outline-none"
          >
            &times;
          </button>
        )} */}
      </div>

      {/* Progress Bar */}
      {autoClose && (
        <div className="w-full h-0.5 bg-white/20 rounded overflow-hidden">
          <div
            className="h-full bg-white/40 animate-notif-progress"
            style={{
              animationDuration: `${autoCloseDelay}ms`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EvoNotifCard;
