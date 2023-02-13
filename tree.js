/** @param {NS} ns */
export async function main(ns) {
	var master_server_list = ["home"];
	let depth = 0

	spider("home");

	function spider(target) {
		depth++;
		var server_list = ns.scan(target);
		for (var server of server_list) {
			if (master_server_list.indexOf(server) == -1) {
				master_server_list.push(server)

				let dash = ""
				for (let i = 1; i < depth; i++) {
					dash += "-"
				}
				if (server == ns.args[0]) {
					dash = "WARN " + dash
				} else if (ns.hasRootAccess(server)) {
					dash = "INFO " + dash
				} else {
					dash = "     " + dash
				}
				ns.tprint(dash + server)
				spider(server);
			}
		}
		depth--;
	}
}