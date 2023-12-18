const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "blackai",
		credits: "1SOY DEV",
		usePrefix: true,
		description: "use blackbox ai ",
		usage: `blackai question|query`,
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"AI",

	},
	run: async function({ api, event, args, commandModules, prefix }) {
		const text = args.join(" ");
			if (!text) {
				return api.sendMessage(
					`ℹ️|Please Provide A Querry`,
					event.threadID,
					event.messageID,
				);
			}
			api.sendMessage("Generating Response... Please wat....",event.threadID).then((messageInfo) => {
				const messageID = messageInfo.messageID;
				axios.get(`https://api.easy0.repl.co/api/blackbox?query=${text}`).then((res) => {
					const respond = res.data.response;
					api.sendMessage(respond, event.threadID, event.messageID);
					api.unsendMessage(messageID);

				}).catch((error) => {
					console.log(error);
				});
				
				
			});
			
		
	},////////////////
};
