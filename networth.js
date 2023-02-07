/** @param {NS} ns */
export async function main(ns) {
	ns.tail(ns.getScriptName());
	ns.disableLog("ALL")

	while (true) {

		var total_stock_value = 0
		var total_stock_purchase = 0

		for (const stock of ns.stock.getSymbols()) {
			if (ns.stock.getPosition(stock)[0] != 0) {
				total_stock_value += ns.stock.getPosition(stock)[0] * ns.stock.getAskPrice(stock);
				total_stock_purchase += ns.stock.getPosition(stock)[0] * ns.stock.getPosition(stock)[1];
			}
		}

		ns.print("Total stock value: " + ns.nFormat(total_stock_value, '($ 0.00 a)'));
		ns.print("Total stock profit: " + ns.nFormat(total_stock_value - total_stock_purchase, '($ 0.00 a)'));
		ns.print("INFO Net worth: " + ns.nFormat(total_stock_value + ns.getServerMoneyAvailable("home"), '($ 0.00 a)'));

		await(ns.sleep(1000));
	}
}
