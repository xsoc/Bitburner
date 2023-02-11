/** @param {NS} ns */
export async function main(ns) {
  const thresholdLongBuy = 0.55;  // Minimum forecast to buy
  const thresholdLongSell = 0.51; // Forecast sell threshold
  const wealth_percentage_target = 0.7 // The % of available money to spend on each stock
  const minimum_balance = 1000000 // Won't buy if balance below this
  const minimum_purchase = 1000000 // Won't buy if the purchase is less than this
  let symbols = ns.stock.getSymbols();

  while (true) {
    symbols.sort(function (a, b) { return ns.stock.getForecast(b) - ns.stock.getForecast(a) }) // Sort the stocks from best to worse forecast

    for (const stock of symbols) {
      const forecast = ns.stock.getForecast(stock);
      const position = ns.stock.getPosition(stock)[0];
      const unitprice = ns.stock.getPosition(stock)[1];
      const purchaseCost = ns.stock.getPurchaseCost(stock, 1, "Long");
      let purchase_value = (ns.getServerMoneyAvailable("home") * wealth_percentage_target) - position * unitprice

      let purchaseCount = purchase_value / purchaseCost;
      const availableFunds = ns.getServerMoneyAvailable("home");

      if (purchaseCount + position + 1 > ns.stock.getMaxShares(stock)) {
        purchaseCount = ns.stock.getMaxShares(stock) - position
      }

      if (forecast > thresholdLongBuy
        && position * unitprice < ns.getServerMoneyAvailable("home") * wealth_percentage_target
        && ns.getServerMoneyAvailable("home") > minimum_balance
        && purchase_value > minimum_purchase) {

        if (ns.stock.buyStock(stock, purchaseCount) > 0) {
          ns.print(`Buying ${stock} for ${ns.nFormat(purchase_value, '$0.00a')}`);
        }
      } else if (forecast < thresholdLongSell && position) {
        const profits = position * ns.stock.getBidPrice(stock) - position * unitprice;
        ns.stock.sellStock(stock, position)
        ns.print(`Selling ${stock} and made a ${profits > 0 ? "profit" : "loss"} of ${ns.nFormat(profits, '$0.00a')}`);
      }
    }
    await ns.sleep(6000);
  }
}
