// components/CandlestickChart.js
import { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';

// Register the required components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const CandlestickChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=30'
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const prepareChartData = () => {
    return {
      labels: data.map(item => new Date(item[0]).toLocaleTimeString()),
      datasets: [
        {
          label: 'BTC Price',
          data: data.map(item => item[4]), // Closing prices
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
        {
          label: 'Volume',
          data: data.map(item => item[5]), // Volume
          type: 'bar',
          backgroundColor: 'rgba(75,192,192,0.2)',
        },
      ],
    };
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>BTC-USD Candlestick Chart</h2>
      <Line data={prepareChartData()} />
    </div>
  );
};

export default CandlestickChart;
