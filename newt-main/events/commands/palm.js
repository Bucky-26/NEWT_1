const axios = require("axios");

module.exports = {
	config: {
		name: "palm",
		credits: "1SOY DEV",
		usage: `palm < question here >`,
		usePrefix: true,
		description: "use google ai PALM 2 Language Model.",
		permission: 0,
		commandCategory:"AI",

	},
	run: async function ({ api, event, args, commandModules, formatFont, prefix }) {
		const q = encodeURIComponent(args.join(" "));
		if (!q) {
			api.sendMessage("Please provide a question", event.threadID, event.messageID);
			return false;
		}

		api.sendMessage("Generating response... Please wait....", event.threadID).then((messageInfo) => {
			// Use the generated message ID for later
			const messageId = messageInfo.messageID;

			axios.get(`https://api.easy0.repl.co/api/palm?q=${q}`)
				.then((res) => {
					const data = res.data;
					const response = data.content;
					
					api.sendMessage(response, event.threadID, event.messageID);
					api.unsendMessage(messageId);

				})
				.catch((error) => {
					console.error(error);
					api.sendMessage("Error generating response.", event.threadID, messageId);
				});
		});
	},
};
