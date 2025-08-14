const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded company list
const companies = [
  { name: 'Apple Inc.', symbol: 'AAPL' },
  { name: 'Microsoft Corp.', symbol: 'MSFT' },
  { name: 'Alphabet Inc.', symbol: 'GOOGL' },
  { name: 'Amazon.com Inc.', symbol: 'AMZN' },
  { name: 'Tesla Inc.', symbol: 'TSLA' },
  { name: 'Meta Platforms Inc.', symbol: 'META' },
  { name: 'NVIDIA Corp.', symbol: 'NVDA' },
  { name: 'Netflix Inc.', symbol: 'NFLX' },
  { name: 'Adobe Inc.', symbol: 'ADBE' },
  { name: 'Intel Corp.', symbol: 'INTC' }
];

// Route: get companies
app.get('/companies', (req, res) => {
  res.json(companies);
});

// Route: get stock data for a symbol
app.get('/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const queryOptions = { period1: '2024-07-01', interval: '1d' }; // adjust dates if needed
    const result = await yahooFinance.historical(symbol, queryOptions);

    const formatted = result.map(item => ({
      date: item.date.toISOString().split('T')[0],
      close: item.close
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
