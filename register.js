const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const commands = require("./commands");
const config = require("./config.json");

const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

(async () => {
	try {
		console.log("Started refreshing slash commands.");
		const body = commands.map((f) => f.register());
		await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body });
		console.log("Successfully reloaded slash commands.");
	} catch (e) {
		console.error("Error refreshing slash commands:", e);
	}
})();
