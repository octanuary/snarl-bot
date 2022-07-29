const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	register() {
		return new SlashCommandBuilder()
			.setName("coinflip")
			.setDescription("Flips a coin.");
	},

	/**
	 * 
	 * @param {import("discord.js").Interaction<CacheType>} interaction 
	 */
	async command(interaction) {
		if (
			interaction.commandName !== "coinflip" ||
			!interaction.isChatInputCommand()
		) return;

		await interaction.reply("Did you know I'm flipping a coin in real life?");

		const side = !!Math.floor(Math.random() * 2);
		interaction.followUp(side ? "Heads." : "Tails.");
	},
};
