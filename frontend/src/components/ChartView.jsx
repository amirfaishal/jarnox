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
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartView({ stockData, symbol }) {
  const data = {
    labels: stockData.map(item => item.date),
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: stockData.map(item => item.close),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${symbol} Stock Price History` },
    },
  };

  return <Line data={data} options={options} />;
}

export default ChartView;
