/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		let stamina = ns.bladeburner.getStamina()[0] / ns.bladeburner.getStamina()[1] * 100;
		let chaos = ns.bladeburner.getCityChaos(ns.bladeburner.getCity());
		let rank = ns.bladeburner.getRank();

		// Figure out what BlackOp is next up
		let nextblackop = ""
		for (const blackop of ns.bladeburner.getBlackOpNames()) {
			if (ns.bladeburner.getBlackOpRank(blackop) <= rank && ns.bladeburner.getActionCountRemaining("BlackOps", blackop) > 0) {
				nextblackop = blackop;
				break;
			}
		}

		// Buy the cheapest skills until we can't afford any more
		let skillnames = ns.bladeburner.getSkillNames();
		while (true) {
			let skillpoints = ns.bladeburner.getSkillPoints();
			let nextskill = { name: skillnames[0], cost: ns.bladeburner.getSkillUpgradeCost(skillnames[0]) };
			for (const skill of skillnames) {
				let cost = ns.bladeburner.getSkillUpgradeCost(skill);
				if (cost < nextskill.cost) {
					nextskill = { name: skill, cost: cost };
				}
			}
			// If we can afford the skill, buy it
			if (skillpoints >= nextskill.cost) {
				ns.bladeburner.upgradeSkill(nextskill.name)
			} else {
				break;
			}
			await ns.sleep(1);
		}

		// Let's actually do an action now
		if (stamina < 75) {
			await doAction("General", "Hyperbolic Regeneration Chamber")
		} else if (chaos > 50) {
			await doAction("General", "Diplomacy")
		} else if (nextblackop != "" && ns.bladeburner.getActionEstimatedSuccessChance("BlackOps", nextblackop)[0] * 100 > 30) {
			await doAction("BlackOps", nextblackop)
		} else {
			await doAction("Operations", "Assassination")
		}

		await ns.sleep(100);
	}
	async function doAction(actionType, actionName) {
		ns.bladeburner.startAction(actionType, actionName);
		await ns.sleep(ns.bladeburner.getActionTime(actionType, actionName));
	}
}
