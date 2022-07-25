/*^
 * Snarl-bot
 * License: MIT
 */
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = require("./commands");
const config = require("./config.json");

client.on("ready", () => {
	console.log(`snarl-bot v${config.SNARL_VER}`);
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
	try {
		commands.find(async (f) => await f.command(interaction));
	} catch (e) {
		console.log(e);
	}
});

client.login(config.DISCORD_TOKEN);
