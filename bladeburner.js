/** @param {NS} ns */
export async function main(ns) {
	var blackops = [];
	var blackopNames = ns.bladeburner.getBlackOpNames();
	for (const name of blackopNames) {
		const rank = ns.bladeburner.getBlackOpRank(name);
		blackops[name] = {rank: rank};
	}

	blackops.sort(function(a, b){
		return b.rank - a.rank;
	})

	while(true) {
		let stamina = ns.bladeburner.getStamina()[1] / ns.bladeburner.getStamina()[0] * 100;
		let chaos = ns.bladeburner.getCityChaos(ns.bladeburner.getCity());
		let rank = ns.bladeburner.getRank();
		let nextblackop = ""

		for (const name of blackops) {
			if (blackops[name].rank <= rank && ns.bladeburner.getActionSuccesses("Black Ops", name) > 0) {
				nextblackop = name;
				break;
			}
		}

		let skillpoints = ns.bladeburner.getSkillPoints();
		let skillnames = ns.bladeburner.getSkillNames();
		let nextskill = {name: skillnames[0], cost: ns.bladeburner.getSkillUpgradeCost(skillnames[0])};
		for (const skill of skillnames) {
			let cost = ns.bladeburner.getSkillUpgradeCost(skill);
			if (cost < nextskill.cost) {
				nextskill = {name: skill, cost: cost};
			}
		}

		if (skillpoints >= nextskill.cost) {
			ns.bladeburner.upgradeSkill(nextskill.name)
		} else if (stamina < 75) {
			ns.bladeburner.startAction("General", "Hyperbolic Regeneration Chamber");
		} else if (chaos > 100) {
			ns.bladeburner.startAction("General", "Diplomacy");
		} else if (nextblackop != "") {
			ns.bladeburner.startAction("Black Ops", nextblackop);
			await ns.sleep(ns.bladeburner.getActionTime("Black Ops", nextblackop) + 2000)
		} else {
			ns.bladeburner.startAction("Contracts", "Retirement")
		}

		await ns.sleep(100)
	}

}
