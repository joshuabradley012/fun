/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (!Array.isArray(prices) || prices.length === 0) {
    return 0;
  }

  let profit = 0;

  for (let i = 1; i < prices.length; i += 1) {
    const delta = prices[i] - prices[i - 1];
    if (delta > 0) {
      profit += delta;
    }
  }

  return profit;
};