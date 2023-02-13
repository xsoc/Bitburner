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
			let answer = undefined

			ns.tprint(server)
			ns.tprint(contract);
			ns.tprint(contract_type);
			ns.tprint(ns.codingcontract.getDescription(contract, server));
			ns.tprint(data);

			switch (ns.codingcontract.getContractType(contract, server)) {
				case "Find Largest Prime Factor":
					break;

				case "Subarray with Maximum Sum":
					break;

				case "Total Ways to Sum":
					break;

				case "Total Ways to Sum II":
					break;

				case "Spiralize Matrix":
					answer = [];
					const vectors = [[1, 0], [0, 1], [-1, 0], [0, -1]];
					let limit_left = 0;
					let limit_right = data[0].length - 1;
					let limit_top = 0;
					let limit_bottom = data.length - 1;
					let direction = 0;
					let x = 0;
					let y = 0;

					while (answer.length < data.length * data[0].length) {
						if (x > limit_right) {
							limit_top++;
							over_limit();
						} else if (x < limit_left) {
							limit_bottom--;
							over_limit();
						} else if (y < limit_top) {
							limit_left++;
							over_limit();
						} else if (y > limit_bottom) {
							limit_right--;
							over_limit();
						}
						answer.push(data[y][x]);

						x += vectors[direction][0];
						y += vectors[direction][1];

					}
					function over_limit() {
						x -= vectors[direction][0];
						y -= vectors[direction][1];
						direction = (direction + 1) % 4
						x += vectors[direction][0];
						y += vectors[direction][1];
					}

					ns.tprint("INFO " + ns.codingcontract.attempt(answer, contract, server))

					break;

				case "Array Jumping Game":
					break;

				case "Array Jumping Game II":
					break;

				case "Merge Overlapping Intervals":
					break;

				case "Generate IP Addresses":
					break;

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

				case "Algorithmic Stock Trader II":
					break;

				case "Algorithmic Stock Trader III":
					break;

				case "Algorithmic Stock Trader IV":
					break;

				case "Minimum Path Sum in a Triangle":
					break;

				case "Unique Paths in a Grid I":
					break;

				case "Unique Paths in a Grid II":
					break;

				case "Shortest Path in a Grid":
					break;

				case "Sanitize Parentheses in Expression":
					break;

				case "Find All Valid Math Expressions":
					break;

				case "HammingCodes: Integer to Encoded Binary":
					break;

				case "HammingCodes: Encoded Binary to Integer":
					break;

				case "Proper 2-Coloring of a Graph":
					break;

				case "Compression I: RLE Compression":
					answer = ""
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
				case "Compression II: LZ Decompression":
					break;

				case "Compression III: LZ Compression":
					break;

				case "Encryption I: Caesar Cipher":
					const caeser_data = data[0]
					const caeser_key = data[1]
					answer = ""

					for (let i = 0; i < caeser_data.length; i++) {
						let letter = caeser_data[i]
						if (letter == " ") {
							answer += " "
						} else {
							let ascii_value = letter.charCodeAt(0) - caeser_key;
							if (ascii_value < "A".charCodeAt(0)) ascii_value += 26
							answer += String.fromCharCode(ascii_value)
						}
					}

					ns.tprint("INFO " + ns.codingcontract.attempt(answer, contract, server));
					break;

				case "Encryption II: Vigenère Cipher":
					let message = data[0];
					let key = data[1]
					answer = ""
					let alphabet = "";
					let vigenereSquare = [];

					for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) alphabet += String.fromCharCode(i)

					for (let i = 0; i < alphabet.length; i++) {
						let row = [];
						for (let j = 0; j < alphabet.length; j++) {
							row.push(alphabet[(i + j) % alphabet.length]);
						}
						vigenereSquare.push(row);
					}

					for (let i = 0; i < message.length; i++) {
						let letter = message[i];
						let value = letter.charCodeAt(0) - "A".charCodeAt(0)
						let key_index = answer.length % key.length
						let key_value = alphabet.indexOf(key.charAt(key_index));
						answer += vigenereSquare[value][key_value]
					}

					ns.tprint("INFO " + ns.codingcontract.attempt(answer, contract, server));

					break;
			}
		}
	}
}
