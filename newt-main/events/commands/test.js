const axios = require('axios');
module.exports.config = {
	name: "aii",
	version: "1.0.0",
			hasPermssion: 0,
	credits: "ADONIS DEV (ISOY DEV)",
	description: "",
	commandCategory: "AI",
	usages: "",
	cooldowns: 5,
	dependencies: {},
	envConfig: {}
};

module.exports.languages = {
	"en": {
		//
	}
};

module.exports.run = async function({ api, event, args }) {

	const question = args.join(' ');
	if (!question) {
		api.sendMessage('Please Provide A Query', event.threadID, event.messageID);
		return;
	}
	api.sendMessage('Generating Response Please Wait', event.threadID, event.messageID);
const url = "https://claude-1.easyapi0.repl.co/api/claude?query=" + question + "&api=" + `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
	try {
		const response = await axios.get(url);
		const data = response.data;
		const claude = data.content;
		api.sendMessage(url, event.threadID);

		api.sendMessage(claude, event.threadID);
	} catch (error) {
		console.log(error);
		api.sendMessage('An error occurred while generating the response.', event.threadID);
	}

};

