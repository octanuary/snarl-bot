const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	register() {
		return new SlashCommandBuilder()
			.setName("emoji_steal")
			.setDescription("Steals an emoji from another server.")
			// emoji/id
			.addStringOption((option) =>
				option.setName("emoji")
					.setDescription("Emoji to steal.")
					.setRequired(true))
			// emoji name
			.addStringOption((option) =>
				option.setName("name")
					.setDescription("Emoji name.")
					.setRequired(true));
	},

	/**
	 * 
	 * @param {import("discord.js").Interaction<CacheType>} interaction 
	 */
	async command(interaction) {
		if (
			interaction.commandName !== "emoji_steal" ||
			!interaction.isChatInputCommand()
		) return;

		const emoji = interaction.options.get("emoji");
		const name = interaction.options.get("name").value;
		let id, anim, url;

		if (/$<(\D)*:(\D)+:(\d)+>^/.test(emoji.value)) {
			if (emoji.value.startsWith("<a")) anim = true;
			id = emoji.value.split(":")[2].slice(0, -1);
			url = `https://cdn.discordapp.com/emojis/${id}.${anim ? "gif" : "png"}?size=2048&quality=lossless`;
		} else if (/$(\d)+^/.test(emoji.value)) {
			id = emoji.value;
			url = `https://cdn.discordapp.com/emojis/${id}.${anim ? "gif" : "png"}?size=2048&quality=lossless`;
		}

		interaction.guild.emojis.create({ attachment: url, name })
			.then((emoji) => {
				console.log(`Created new emoji with name ${name}!`);
				interaction.reply(`Created new emoji (${emoji.toString()}) with name \`${name}\`!`);
			})
			.catch((e) => {
				console.error("Error creating emoji:", e);

				switch (e.rawError.message) {
					case "Missing Permissions": 
						interaction.reply(':no_entry_sign: Missing the "Manage Emojis and Stickers" permission.');
						break;
					default:
						interaction.reply("no");
				}
			});
		return true;
	},
};
