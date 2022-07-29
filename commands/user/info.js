const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	register() {
		return new SlashCommandBuilder()
			.setName("user_info")
			.setDescription("Gets info about a user.")
			// user
			.addMentionableOption((option) =>
				option.setName("user")
					.setDescription("User to ban.")
					.setRequired(true));
	},

	/**
	 * 
	 * @param {import("discord.js").Interaction<CacheType>} interaction 
	 */
	async command(interaction) {
		if (
			interaction.commandName !== "user_info" ||
			!interaction.isChatInputCommand()
		) return;

		const userId = interaction.options.get("user").value;
		const user = await interaction.guild.members.fetch({ user: userId })
		const avatar = `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.${user.user.flags.bitfield > 1 ? "gif" : "png"}?size=4096`;
		const username = `${user.user.username}#${user.user.discriminator}`;

		console.log("Getting user info...", username);

		const embed = new EmbedBuilder()
			.setAuthor({
				name: "Snarl-bot",
				iconURL: interaction.client.user.avatarURL(),
				url: "https://octanuary.tk/snarl-bot/"
			})
			.setThumbnail(avatar)
			.setTitle(username)
			.addFields(
				{ name: ":hash: ID:", value: user.user.id },
				{ name: ":robot: Is a bot:", value: user.user.bot ? "Yes" : "No" },
				{ name: ":clock1: Joined:", value: new Date(user.joinedTimestamp).toISOString() },
			)
			.setTimestamp()
			.setFooter({ text: username, iconURL: avatar });
		if (user.user.banner) embed.setImage(`https://cdn.discordapp.com/banners/${user.user.id}/${user.user.banner}.png?size=4096`)

		interaction.reply({
			embeds: [ embed ]
		});
	},
};
