import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
//   Title,
  Tooltip,
  Legend
);

const EvoChartLine = ({ data, options }) => {
    // Cek apakah semua dataset tidak memiliki label
  const hasLegend = data?.datasets?.some(ds => !!ds.label?.trim());

    const defaultOptions = {
        responsive: true,
        // layout: {
        //     padding: {
        //       top: 20, // Ini menambah jarak dari atas (legend) ke grafik
        //     },
        //   },
        plugins: {
          legend: hasLegend? {
            position: 'top',
            align: 'start',
            labels: {
              usePointStyle: false,
              boxWidth: 8,
              boxHeight: 8,
              pointStyle: 'rect',
              padding: 30,
            },
          }:false,
        },
      };

      const finalOptions = options || defaultOptions;

  return <Line data={data} options={finalOptions} />;
};

export default EvoChartLine;