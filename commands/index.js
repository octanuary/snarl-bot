const emojiSteal = require("./emoji/steal");
const funCoinFlip = require("./fun/coinflip");
const userBan = require("./user/ban");
const userInfo = require("./user/info");
const userUnban = require("./user/unban");
const utilsPing = require("./utils/ping");

module.exports = [
	emojiSteal,
	funCoinFlip,
	userBan,
	userInfo,
	userUnban,
	utilsPing,
];
