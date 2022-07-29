const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	register() {
		return new SlashCommandBuilder()
			.setName("ping")
			.setDescription("Ping.");
	},

	/**
	 * 
	 * @param {import("discord.js").Interaction<CacheType>} interaction 
	 */
	async command(interaction) {
		if (
			interaction.commandName !== "ping" ||
			!interaction.isChatInputCommand()
		) return;
		
		await interaction.reply(`<@!${interaction.user.id}> is a bitch!`);

		const times = Math.floor(Math.random() * 13);
		for (let x = 0; x < times; x++) {
			const suf = x > 8 ? "is a bitch!" : "IS A FUCKING BITCH.";
			await interaction.channel.send(`<@!${interaction.user.id}> ${suf}`);
		}

		return true;
	},
};
