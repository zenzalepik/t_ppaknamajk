// helpers/timeYear.js



export const currentYear = new Date().getFullYear();

export const years = [
  {
    label: currentYear.toString(),
    onClick: () => console.log(`${currentYear} clicked`),
  },
  {
    label: (currentYear - 1).toString(),
    onClick: () => console.log(`${currentYear - 1} clicked`),
  },
  // dst
];