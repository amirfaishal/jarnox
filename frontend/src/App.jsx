import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChartView from './components/ChartView';
import axios from 'axios';
import './styles.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [stockData, setStockData] = useState(null);

  // Fetch company list
  useEffect(() => {
    axios.get('http://localhost:5000/companies')
      .then(res => setCompanies(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch stock data when symbol changes
  useEffect(() => {
    if (selectedSymbol) {
      axios.get(`http://localhost:5000/stock/${selectedSymbol}`)
        .then(res => setStockData(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedSymbol]);

  return (
    <div className="app">
      <Sidebar companies={companies} onSelect={setSelectedSymbol} />
      <div className="main-panel">
        {stockData ? (
          <ChartView stockData={stockData} symbol={selectedSymbol} />
        ) : (
          <div className="placeholder">Select a company to view stock data</div>
        )}
      </div>
    </div>
  );
}

export default App;

