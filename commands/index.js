const steal = require("./emoji/steal");
const coinflip = require("./fun/coinflip");
const ban = require("./user/ban");
const unban = require("./user/unban");
const ping = require("./utils/ping");

module.exports = [
	steal,
	coinflip,
	ban,
	unban,
	ping,
];
