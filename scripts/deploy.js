const hre = require("hardhat");

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
	// Setup accounts & variables
	const [deployer] = await ethers.getSigners();
	const NAME = "Dappcord";
	const SYMBOL = "DC";

	// Deploy contract
	const Dappcord = await ethers.getContractFactory("Dappcord");
	const dappcord = await Dappcord.deploy(NAME, SYMBOL);
	await dappcord.deployed();

	console.log(`Deployed Dappcord Contract at: ${dappcord.address}\n`);

	// Create 3 Channels
	const CHANNEL_NAMES = [
		"💬 general",
		"👋 introduction",
		"🤖 ai-news",
		"📈 crypto-news",
		"📚 learning-resources",
		"📊 market-analysis",
		"📈 technical-analysis",
		"📈 trading-strategies",
		"🧠 AI-Learning",
		"💡 Tech-Innovation",
		"🚗 Crypto-Mobility",
		"🎨 AI-Art",
	];
	const COSTS = [
		tokens(0.23),
		tokens(0.89),
		tokens(0.45),
		tokens(0.16),
		tokens(0.74),
		tokens(0.31),
		tokens(0.52),
		tokens(0.28),
		tokens(0.64),
		tokens(0.19),
		tokens(0.86),
		tokens(0.42),
	];

	for (var i = 0; i < 12; i++) {
		const transaction = await dappcord
			.connect(deployer)
			.createChannel(CHANNEL_NAMES[i], COSTS[i]);
		await transaction.wait();

		console.log(`Created text channel #${CHANNEL_NAMES[i]}`);
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
