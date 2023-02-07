/** @param {NS} ns */
export async function main(ns) {
  const stocks = ns.stock.getSymbols();
  
  var total = 0;

  for (const stock of stocks) {
        const position = ns.stock.getPosition(stock)[0];
        const profits = position * ns.stock.getBidPrice(stock) - position * ns.stock.getPosition(stock)[1];
        total += profits;
        ns.stock.sellStock(stock, position)
        ns.tprint(`Selling ${stock} and made a ${profits > 0 ? "profit" : "loss"} of ${ns.nFormat(profits, '$0.00a')}`); // AI generated blackmagic
  }

  ns.tprint(`INFO Total profits: ${ns.nFormat(total, '$0.00a')}`);
}
