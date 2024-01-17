const axios = require("axios");
const fs = require('fs');

module.exports = {
	config: {
		name: "remini",
		usePrefix: true,
		description: "Remini uses innovative, state-of-the-art AI technology to transform your old photos into HD masterpieces.",
		permission: 1, // 0: all users, 1: admin, 3: dev
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "remini  note:reply to the image you want to enhance",
		cooldowns: 5,
		commandCategory:"Edting",

	},
	run: async function ({ api, event, args, commandModules }) {
		try {
			if (event.type === "message_reply") {
				const repliedMessage = event.messageReply;
				if (repliedMessage.attachments && repliedMessage.attachments.length > 0) {
					const repliedAttachment = repliedMessage.attachments[0];
					if (repliedAttachment.type === "photo" && repliedAttachment.url) {
						const res = await axios.get(`https://api.easy-api.online/api/remini?imgurl=${encodeURIComponent(repliedAttachment.largePreviewUrl)}`);
						const outputUrl = res.data.outputUrl;

						const imageResponse = await axios.get(outputUrl, { responseType: 'arraybuffer' });
						const imageBuffer = Buffer.from(imageResponse.data);

						// Save the image locally
						const outputPath = 'cache/remini.jpg';
						fs.writeFileSync(outputPath, imageBuffer);

						// Send the image as an attachment
						const attachmentData = {
							body: `Enhanced Image`,
							attachment: fs.createReadStream(outputPath),
						};

						api.sendMessage(attachmentData, event.threadID, event.messageID);
					} else {
						api.sendMessage("The replied message is not a photo ", event.threadID);
					}
				} else {
					api.sendMessage("The replied message does not have any attachments.", event.threadID);
				}
			} else {
				api.sendMessage("Please reply to a message with a photo attachment.", event.threadID);
			}
		} catch (error) {
			console.error(error);
			api.sendMessage(`An error occurred: ${error.message}`, event.threadID);
		}
	},
};
