const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	register() {
		return new SlashCommandBuilder()
			.setName("ban")
			.setDescription("Ban a user from the server.")
			// user
			.addMentionableOption((option) =>
				option.setName("user")
					.setDescription("User to ban.")
					.setRequired(true))
			// reason
			.addStringOption((option) =>
				option.setName("ban_reason")
					.setDescription("Ban reason.")
					.setRequired(true))
			// clear messages
			.addIntegerOption((option) =>
				option.setName("delete_messages")
					.setDescription("Messages to delete in the past 0-7 days.")
					.setMinValue(0)
					.setMaxValue(7));
	},

	/**
	 * 
	 * @param {import("discord.js").Interaction<CacheType>} interaction 
	 */
	async command(interaction) {
		if (
			interaction.commandName !== "ban" ||
			!interaction.isChatInputCommand()
		) return;

		const user = interaction.options.get("user");
		const rawReason = interaction.options.getString("ban_reason");
		const reason = `${interaction.user.username}#${interaction.user.discriminator}: ${rawReason}`;
		const deleteMessageDays = interaction.options.getInteger("delete_messages");

		interaction.guild.members.ban(user.value, { reason, deleteMessageDays })
			.then((banInfo) => {
				console.log(`Banned ${banInfo.user?.tag ?? banInfo.tag ?? banInfo} from ${interaction.guild.name}`);
				interaction.reply({
					embeds: [
						(new EmbedBuilder()
							.setColor(0x56e316)
							.setAuthor({ name: "Snarl-bot", url: "https://octanuary.tk/snarl-bot/" })
							.setThumbnail("https://cdn.discordapp.com/attachments/1001372506579533904/1001372749316489366/banned.png")
							.setTitle(":white_check_mark: Success!")
							.setDescription(`Banned ${user.user.toString()} from the server.`)
							.setTimestamp())
					]
				});
			})
			.catch((e) => {
				console.error("Error banning member:", e);

				let msg;
				switch (e.rawError.message) {
					case "Missing Permissions": 
						msg = 'Missing permissions... Do I have the "Ban Members" permission?';
						break;
					default:
						msg = "no";
				}

				interaction.reply({
					embeds: [
						(new EmbedBuilder()
							.setColor(0xff0000)
							.setAuthor({ name: "Snarl-bot", url: "https://octanuary.tk/snarl-bot/" })
							.setThumbnail("https://cdn.discordapp.com/attachments/1001372506579533904/1001372749316489366/banned.png")
							.setTitle(":no_entry_sign: Ban failed.")
							.setDescription(msg)
							.setTimestamp())
					]
				});
			});
		return true;
	},
};
