/** @param {NS} ns */
export async function main(ns) {
	for (const contracttype of ns.codingcontract.getContractTypes()) ns.codingcontract.createDummyContract(contracttype)
	
	for (const file of ns.ls("home", ".cct")) {
		ns.tprint(ns.codingcontract.getContractType(file));
		ns.tprint(ns.codingcontract.getDescription(file));
		ns.tprint(ns.codingcontract.getData(file));
		ns.tprint("* * * * * * * * * *");

    ////////////////////////////////////////////////////////////////////
    // WARNING!!!! This will delete all the dummy contracts on home!! //
    ////////////////////////////////////////////////////////////////////
		ns.rm(file, "home") 
	}
}
