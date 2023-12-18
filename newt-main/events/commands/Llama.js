const axios = require("axios");
const fs = require('fs');

module.exports = {
	config: {
		name: "llama",
		credits: "1SOY DEV",
		usePrefix: true,
		description: "Use Llama AI",
		usage: `-llama question|query`,
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"AI",
	},
	run: async function ({ api, event, args, commandModules, prefix }) {
		const text = args.join(" ");

		try {
			if (!text) {
				return api.sendMessage(
					"Please Provide A Query",
					event.threadID,
					event.messageID
				);
			}
			api.sendMessage('Generating Response.. \n Please Wait..',event.threadID,event.messageID);

			if (event.type === "message_reply") {

				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					console.log("Attachments found in the message reply:");
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "photo") {

							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
						

								var ress = await axios.get(`https://api.easy0.repl.co/api/llama?p=${encodeURIComponent(text)}&img=${encodeURIComponent(largePreviewUrl)}`);
								var data = ress.data.content;
										api.sendMessage(data,event.threadID,event.messageID);
						return false

						}
					}
				}
			}
		

		

				var res = await axios.get(`https://api.easy0.repl.co/api/llama?p=${encodeURIComponent(text)}`);
				var data = res.data.content;
						api.sendMessage(data,event.threadID,event.messageID);
			
			 
			
		} catch (error) {
			console.error("An error occurred:", error);
			api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
		}
	},
};
