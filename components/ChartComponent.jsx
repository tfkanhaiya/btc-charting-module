// components/ChartComponent.jsx
import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import OrderForm from './OrderForm';

// Register Chart.js components
Chart.register(...registerables);

const ChartComponent = () => {
  // State for holding the chart data
  const [chartData, setChartData] = useState({
    labels: [], // x-axis labels (e.g., time)
    datasets: [
      {
        label: 'BTC-USD Price',
        data: [], // y-axis data (e.g., price)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  // State to hold orders placed by users
  const [orders, setOrders] = useState([]);

  // Function to handle placing orders
  const handlePlaceOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
    console.log('Placed Order:', order);
  };

  // Function to fetch historical candlestick data
  const fetchChartData = async () => {
    try {
      // Replace this URL with the actual API you will use to fetch BTC-USD data
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7');
      const data = await response.json();

      // Process the data to fit the chart format
      const prices = data.prices.map((price) => price[1]);
      const timestamps = data.prices.map((price) => new Date(price[0]).toLocaleDateString());

      // Update the chart data state
      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: 'BTC-USD Price',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // Fetch chart data when the component mounts
  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="chart-container">
      <h2>BTC-USD Candlestick Chart</h2>
      <Line data={chartData} />
      
      {/* Order Form Section */}
      <OrderForm onPlaceOrder={handlePlaceOrder} />

      {/* Displaying Placed Orders */}
      <div>
        <h4>Placed Orders:</h4>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order.quantity} BTC at ${order.price} each</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartComponent;
