const yahooFinance = require('yahoo-finance2').default;

/**
 * Fetch historical daily data for the last `rangeDays` (business days) for a symbol.
 * Returns array of { date, open, high, low, close, volume } sorted ascending by date.
 */
async function getHistorical(symbol, rangeDays = 30) {
  // Compute date range: from (rangeDays + buffer) days ago to today
  const to = new Date();
  // Add 1 day to include today if available
  const from = new Date();
  from.setDate(from.getDate() - Math.max(rangeDays + 5, 40)); // buffer to ensure we get at least rangeDays trading days

  const queryOptions = {
    period1: from.toISOString().split('T')[0],
    period2: to.toISOString().split('T')[0],
    interval: '1d'
  };

  // yahoo-finance2 historical returns array of objects
  const raw = await yahooFinance.historical(symbol, queryOptions);

  if (!raw || raw.length === 0) {
    throw new Error('No historical data returned');
  }

  // Keep only the last `rangeDays` entries (trading days)
  const slice = raw.slice(-rangeDays);

  // Map to simple structure
  const result = slice.map(item => ({
    date: item.date.toISOString().split('T')[0],
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    volume: item.volume
  }));

  return {
    symbol,
    lastUpdated: new Date().toISOString(),
    data: result
  };
}

module.exports = {
  getHistorical
};
