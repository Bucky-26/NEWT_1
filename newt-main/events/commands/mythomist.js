const axios = require("axios");

module.exports = {
	config: {
		name: "mytho",
		usePrefix: true,
		description: "AI powered by Mistral Language model",
		permission: 0, // 0 for all users, 1 for admin, 2 for dev
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		cooldowns: 5,
		commandCategory:"AI",
	},
	run: async function ({ api, event, args, commandModules }) {
		const question = args.join(' ');

		if (!question) {
			api.sendMessage('Please provide a query', event.threadID, event.messageID);
			return;
		}

		api.sendMessage('Generating response. Please wait...', event.threadID).then((messageInfo) => {
			const messageID = messageInfo.messageID;

			axios.get(`https://ai.ea-sy.tech/api/mythomist?query=${encodeURIComponent(question)}&api=https://newtai.bgfxd.repl.co`)
				.then((response) => {
					const data = response.data;
					const claude = data.content;

					api.sendMessage(claude, event.threadID, event.messageID); // Assuming 'claude' was a typo and you meant to send 'data'
					api.unsendMessage(messageID);
				})
				.catch((error) => {
					api.sendMessage("Something went wrong.\nPlease try again.", event.threadID, messageID);
					api.unsendMessage(messageID);
					console.error(error);
				});
		});
	},
};
