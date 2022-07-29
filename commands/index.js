const steal = require("./emoji/steal");
const ban = require("./user/ban");
const unban = require("./user/unban");
const ping = require("./utils/ping");

module.exports = [
	steal,
	ban,
	unban,
	ping,
];
