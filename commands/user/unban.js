const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	register() {
		return new SlashCommandBuilder()
			.setName("unban")
			.setDescription("Unban a user from the server.")
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
			interaction.commandName !== "unban" ||
			!interaction.isChatInputCommand()
		) return;

		const user = interaction.options.get("user");

		interaction.guild.members.unban(user.value)
			.then((user) => {
				console.log(`Unbanned ${user.toString()} from ${interaction.guild.name}`);
				interaction.reply({
					embeds: [
						(new EmbedBuilder()
							.setColor(0x56e316)
							.setAuthor({ name: "Snarl-bot", url: "https://octanuary.tk/snarl-bot/" })
							.setThumbnail("https://cdn.discordapp.com/attachments/1001372506579533904/1002434963578302464/unban.png")
							.setTitle(":white_check_mark: Success!")
							.setDescription(`Unbanned ${user.toString()} from the server.`)
							.setTimestamp())
					]
				});
			})
			.catch((e) => {
				console.error("Error unbanning member:", e);

				let msg;
				switch (e.rawError.message) {
					case "Missing Permissions": 
						msg = 'Missing permissions... Do I have the "Ban Members" permission?';
						break;
					case "Unknown Ban":
						msg = "I don't think this user is banned..."
						break;
					default:
						msg = "no";
				}

				interaction.reply({
					embeds: [
						(new EmbedBuilder()
							.setColor(0xff0000)
							.setAuthor({ name: "Snarl-bot", url: "https://octanuary.tk/snarl-bot/" })
							.setThumbnail("https://cdn.discordapp.com/attachments/1001372506579533904/1002434963578302464/unban.png")
							.setTitle(":no_entry_sign: Unban failed.")
							.setDescription(msg)
							.setTimestamp())
					]
				});
			});
		return true;
	},
};
