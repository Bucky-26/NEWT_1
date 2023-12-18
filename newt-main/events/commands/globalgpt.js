const axios = require("axios");
const fs = require('fs');

module.exports = {
	config: {
		name: "gpt",
		usePrefix: true,
		description: "Global GPT",
		permission: 0,  // 0|1|2 - 0 for all users, 1 for admin, and 3 for dev
		credits: "OPERATOR ISOY",
		commandCategory: "AI",
		usages: "gpt <question here>",
		cooldowns: 5,
	},
	run: async function ({ api, event, args, fontbold }) {
		const query = encodeURIComponent(args.join(""));

		api.sendMessage("Generating Response.. Please Wait...", event.threadID).then((messageInfo) => {
			const messageID = messageInfo.messageID;
			axios.get(`https://api.easy0.repl.co/v1/globalgpt?q=${query}`).then((res) => {
				const content = res.data.content;
				console.log(content);
				api.sendMessage(`${fontbold("GlobalGPT📝📝")}\n\n${content}`, event.threadID, event.messageID);
				api.unsendMessage(messageID);
			}).catch((error) => {
				console.error(error);
				api.sendMessage("Error generating response.", event.threadID);
			});
		});
	},
};
