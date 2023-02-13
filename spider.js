/** @param {NS} ns */
export async function main(ns) {
	var master_server_list = [];

	spider("home");

	function spider(target) {
		var server_list = ns.scan(target);
		for (var server of server_list) {
			if (master_server_list.indexOf(server) == -1) {
				master_server_list.push(server)
				spider(server);
			}
		}
	}

	while (true) {
		for (const server of master_server_list) {
			if (!ns.hasRootAccess(server) && ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
				let open_ports = 0;
				/*
				const vulnerabilities = [
					{ filename: "BruteSSH.exe", port: 'sshPortOpen', method: ns.brutessh },
					{ filename: "FTPCrack.exe", port: 'ftpPortOpen', method: ns.ftpcrack },
					{ filename: "relaySMTP.exe", port: 'smtpPortOpen', method: ns.relaysmtp },
					{ filename: "HTTPWorm.exe", port: 'httpPortOpen', method: ns.httpworm },
					{ filename: "SQLInject.exe", port: 'sqlPortOpen', method: ns.sqlinject },
				];

				for (const { filename, port, method } of vulnerabilities) {
					if (ns.fileExists(filename, "home") && !server[port]) { method(server); }
				}
				*/
				
				if (ns.fileExists("BruteSSH.exe", "home")) ns.brutessh(server) && open_ports++;
				if (ns.fileExists("FTPCrack.exe", "home")) ns.ftpcrack(server) && open_ports++;
				if (ns.fileExists("relaySMTP.exe", "home")) ns.relaysmtp(server) && open_ports++;
				if (ns.fileExists("HTTPWorm.exe", "home")) ns.httpworm(server) && open_ports++;
				if (ns.fileExists("SQLInject.exe", "home")) ns.sqlinject(server) && open_ports++;

				if (ns.getServerNumPortsRequired(server) <= open_ports) {
					ns.nuke(server);
					ns.toast("Pwned " + server);
					ns.tprint("INFO Pwned " + server + " - " + ns.nFormat(ns.getServerMaxMoney(server), '($ 0.00 a)'));
					if (ns.getServerMaxRam(server) > 0) {
						//const files = ns.ls("home", ".js")
						// for (const file of files) {
						// 	ns.scp(file, server, "home");
						//}
						ns.scp("extract.js", server, "home")

						let threads = Math.floor(ns.getServerMaxRam(server) / ns.getScriptRam("extract.js"));
						if (threads >= 1) {
							ns.exec("extract.js", server, threads, server);
						}
					}
				}
			}
		}
		await ns.sleep(10000)
	}
}