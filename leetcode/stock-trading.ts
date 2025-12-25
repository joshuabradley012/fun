/*
- Implemented greedy accumulation of all positive day-to-day gains in maxProfit, including basic guard clause for empty input and early return of 0.
- Result now sums every upward delta to capture unlimited transactions under the single-share constraint.
Whenever you’re allowed unlimited trades but can hold only one share, treat each price uptick as its own mini trade. Instead of searching for global peaks/valleys, just add every positive day-to-day difference; this greedily captures the full gain of any upward movement and is optimal because overlapping trades don’t conflict under the single-share constraint.
*/

function maxProfit(prices: number[]): number {
  if (prices.length === 0) {
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
}

const prices = [7, 1, 5, 3, 6, 4];
const profit = maxProfit(prices);
console.log(profit);