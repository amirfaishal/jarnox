const express = require('express');
const path = require('path');
const router = express.Router();
const stockService = require('../services/stockService');
const companies = require('../data/companies.json');

// GET /api/companies
router.get('/companies', (req, res) => {
  res.json(companies);
});

// GET /api/stock/:symbol?range=30
// range is days (optional, default 30)
router.get('/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const rangeDays = parseInt(req.query.range || '30', 10);

  try {
    const data = await stockService.getHistorical(symbol, rangeDays);
    res.json(data);
  } catch (err) {
    console.error('Error fetching stock data', err);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

module.exports = router;
