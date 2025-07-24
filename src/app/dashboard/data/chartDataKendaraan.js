'use client';

export const chartDataKendaraan = {
  labels: [
    'April 21',
    'April 22',
    'April 23',
    'April 24',
    'April 25',
    'April 26',
    'April 27',
    'April 28',
    'April 29',
    'April 30',
  ],
  datasets: [
    {
      label: 'Mobil',
      data: [25, 30, 20, 25, 35, 30, 40, 45, 38, 42],
      borderColor: '#2A6DFF',
      backgroundColor: '#2A6DFF',
      pointBackgroundColor: 'black',
    },
    {
      label: 'Motor',
      data: [20, 25, 15, 20, 22, 18, 28, 32, 30, 35],
      borderColor: '#FF5B2A',
      backgroundColor: '#FF5B2A',
      pointBackgroundColor: 'black',
    },
    {
      label: 'Truk/Box',
      data: [5, 8, 10, 15, 20, 18, 16, 22, 25, 28],
      borderColor: '#53E172',
      backgroundColor: '#53E172',
      pointBackgroundColor: 'black',
    },
    {
      label: 'Taxi',
      data: [10, 15, 12, 18, 22, 25, 28, 30, 27, 32],
      borderColor: '#FF2AEA',
      backgroundColor: '#FF2AEA',
      pointBackgroundColor: 'black',
    },
  ],
};
