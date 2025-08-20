// helpers/dateRangeHelper.js

export const getDefaultDateAwal = () => {
  const now = new Date();
  now.setDate(now.getDate() - 7); // default ke 7 hari lalu
  return now;
};

export const getDefaultDateAkhir = () => new Date();
