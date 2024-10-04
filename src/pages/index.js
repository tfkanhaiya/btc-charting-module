// pages/index.js
import Head from 'next/head';
import CandlestickChart from '../../components/CandlestickChart';
import OrderForm from '../../components/OrderForm';
import ChartComponent from '../../components/ChartComponent';


export default function Home() {
    return (
        <div>
            <Head>
                <title>BTC-USD Charting Module</title>
            </Head>
            <main>
                <h1>BTC-USD Candlestick Charting</h1>
                <CandlestickChart/>
                <OrderForm/>
                <ChartComponent/>
            </main>
        </div>
    );
}
