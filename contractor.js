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

	master_server_list.sort();

	for (const server of master_server_list) {
		for (const contract of ns.ls(server, ".cct")) {
			const contract_type = ns.codingcontract.getContractType(contract, server)
			const data = ns.codingcontract.getData(contract, server);

			ns.tprint(server)
			ns.tprint(contract);
			ns.tprint(contract_type);
			ns.tprint(ns.codingcontract.getDescription(contract, server));
			ns.tprint(data);

			switch (ns.codingcontract.getContractType(contract, server)) {
				case "Algorithmic Stock Trader I":
					let max_profit = 0;
					let best_buy = 0;
					let best_sell = 0;

					for (let i = 0; i < data.length; i++) {
						for (let j = i + 1; j < data.length; j++) {
							let profit = data[j] - data[i];

							if (profit > max_profit) {
								max_profit = profit;
								best_buy = i;
								best_sell = j;
							}
						}
					}
					ns.tprint("INFO " + ns.codingcontract.attempt(max_profit, contract, server));
					break;
				case "Encryption I: Caesar Cipher":
					const caeser_data = data[0]
					const caeser_key = data[1]
					let caeser_answer = ""

					for (let i = 0; i < caeser_data.length; i++) {
						let letter = caeser_data[i]
						if (letter == " ") {
							caeser_answer += " "
						} else {
							let ascii_value = letter.charCodeAt(0) - caeser_key;
							if (ascii_value < "A".charCodeAt(0)) ascii_value += 26
							caeser_answer += String.fromCharCode(ascii_value)
						}
					}

					ns.tprint("INFO " + ns.codingcontract.attempt(caeser_answer, contract, server));
					break;
				//case "Find Largest Prime Factor"
				//case "Subarray with Maximum Sum"
				//case "Total Ways to Sum"
				//case "Total Ways to Sum II"
				//case "Spiralize Matrix"
				//case "Array Jumping Game"
				//case "Array Jumping Game II"
				//case "Merge Overlapping Intervals"
				//case "Generate IP Addresses"
				//case "Algorithmic Stock Trader II"
				//case "Algorithmic Stock Trader III"
				//case "Algorithmic Stock Trader IV"
				//case "Minimum Path Sum in a Triangle"
				//case "Unique Paths in a Grid I"
				//case "Unique Paths in a Grid II"
				//case "Shortest Path in a Grid"
				//case "Sanitize Parentheses in Expression"
				//case "Find All Valid Math Expressions"
				//case "HammingCodes: Integer to Encoded Binary"
				//case "HammingCodes: Encoded Binary to Integer"
				//case "Proper 2-Coloring of a Graph"
				case "Compression I: RLE Compression":
					let answer = ""
					let current_letter = ""
					let current_run = 0

					for (let i = 0; i < data.length; i++) {
						if (data[i] == current_letter) {
							current_run++
						} else {
							if (current_run > 0) answer += current_run + current_letter
							current_letter = data[i]
							current_run = 1
						}
						if (current_run == 9) {
							answer += current_run + current_letter
							current_run = 0
						}
					}
					answer += current_run + current_letter
					ns.tprint(answer);
					ns.tprint(ns.codingcontract.attempt(answer, contract, server))
					break;
				//case "Compression II: LZ Decompression"
				//case "Compression III: LZ Compression"
				//case "Encryption II: Vigenère Cipher"]
			}
		}
	}
}
