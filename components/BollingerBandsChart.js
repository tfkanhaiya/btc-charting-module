import { useEffect, useState } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import styles from './BollingerBandsChart.module.css'; // Import the CSS module

Chart.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, Filler);

const FibonacciBandsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fibLevels, setFibLevels] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

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

  const calculateFibonacciLevels = (low, high) => {
    const difference = high - low;
    const levels = [
      high,
      high - difference * 0.236,
      high - difference * 0.382,
      high - difference * 0.618,
      low,
    ];
    return levels;
  };

  const handleChartClick = (event) => {
    const chart = event.chart;
    const points = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, false);
    if (points.length) {
      const pointIndex = points[0].index;
      const closingPrice = data[pointIndex][4]; // Closing price
      if (!startPoint) {
        setStartPoint(closingPrice);
      } else if (!endPoint) {
        setEndPoint(closingPrice);
        const levels = calculateFibonacciLevels(startPoint, closingPrice);
        setFibLevels(levels);
        setStartPoint(null);
        setEndPoint(null);
      }
    }
  };

  const prepareChartData = () => {
    const closingPrices = data.map(item => item[4]);
    return {
      labels: data.map(item => new Date(item[0]).toLocaleTimeString()),
      datasets: [
        {
          label: 'BTC Price',
          data: closingPrices,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>BTC-USD Chart with Fibonacci Retracement</h2>
      <div className={styles.chart-container}>
        <Line
          data={prepareChartData()}
          onClick={handleChartClick}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'hour',
                },
              },
              y: {
                beginAtZero: false,
              },
            },
          }}
        />
      </div>
      {fibLevels.length > 0 && (
        <div>
          <h3>Fibonacci Levels</h3>
          <ul>
            {fibLevels.map((level, index) => (
              <li key={index}>Level {index + 1}: {level.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FibonacciBandsChart;
