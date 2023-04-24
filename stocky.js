/** @param {NS} ns */
export async function main(ns) {
	const threshold = 0.03
	const wealth_percentage_target = 0.7
	const sleepTime = 1000 * 60 // * 5
	const minimumPurchaseValue = 2000000
	const minimumProfit = 100000

	function getPrices() {
		let prices = {}
		for (let symbol of ns.stock.getSymbols()) {
			prices[symbol] = ns.stock.getPrice(symbol)
		}

		return (prices)
	}

	while (true) {
		const prices_previous = getPrices();
		await ns.sleep(sleepTime)

		const prices_current = getPrices();

		for (let symbol of ns.stock.getSymbols()) {
			let difference = prices_current[symbol] / prices_previous[symbol]

			const position = ns.stock.getPosition(symbol)[0];
			const unitprice = ns.stock.getPurchaseCost(symbol, 1, "Long");
			const availableFunds = ns.getServerMoneyAvailable("home");
			let purchase_value = (availableFunds * wealth_percentage_target) - position * unitprice
			let purchaseCount = purchase_value / unitprice;

			const totalshares = ns.stock.getPosition(symbol)[0] + ns.stock.getPosition(symbol)[2]

			if (purchaseCount + totalshares + 1 > ns.stock.getMaxShares(symbol)) {
				purchaseCount = ns.stock.getMaxShares(symbol) - totalshares
			}

			if (ns.stock.getPurchaseCost(symbol, purchaseCount, "Long") < minimumPurchaseValue) purchaseCount = 0

			if (difference >= 1 + threshold) {
				ns.stock.buyStock(symbol, purchaseCount)
			} else if (difference <= 1 - threshold) {
				ns.stock.buyShort(symbol, purchaseCount)
			}

			if (ns.stock.getPosition(symbol)[0]
				&& difference <= 1 + threshold / 2
				&& ns.stock.getSaleGain(symbol, ns.stock.getPosition(symbol)[0], "Long") - ns.stock.getPosition(symbol)[0] * ns.stock.getPosition[1] > minimumProfit) {
				ns.stock.sellStock(symbol, position)
			} else if (ns.stock.getPosition(symbol)[2]
				&& difference >= 1 - threshold / 2
				&& ns.stock.getSaleGain(symbol, ns.stock.getPosition(symbol)[2], "Short") - ns.stock.getPosition(symbol)[2] * ns.stock.getPosition[3] > minimumProfit) {
				ns.stock.sellShort(symbol, position)
			}
		}
	}
}
