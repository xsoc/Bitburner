/** @param {NS} ns */
export async function main(ns) {
	var master_list = [];

	iterate("home");
	master_list.sort();

	function iterate(target) {
		var list = ns.scan(target)
		for (const server of list) {
			if (master_list.indexOf(server) == -1) {
				master_list.push(server);
				iterate(server);
			}
		}
	}

	// Table formatting adapted from work by u/guy_that_says_hey
	// https://www.reddit.com/r/Bitburner/comments/s4sf7l/comment/hstb9ba/
	const row = '%-20s | %8s | %12s | %12s | %8s | %8s';
	ns.tprintf(row, 'HOSTNAME', 'HACK LVL', 'MAX $$', 'CASH $$', 'RAM', 'ROOT');
	ns.tprintf(row, '---------', '-------', '------', '-------', '-------', '-------');

	for (const server of master_list) {
		ns.tprintf(row, server,
			ns.nFormat(ns.getServerRequiredHackingLevel(server), '0,0'),
			ns.nFormat(ns.getServerMaxMoney(server), '($ 0.00 a)'),
			ns.nFormat(ns.getServerMoneyAvailable(server), '($ 0.00 a)'),
			ns.nFormat(ns.getServerMaxRam(server), '0,0'),
			ns.hasRootAccess(server) ? "Yes" : "No"
		);
	}
}
