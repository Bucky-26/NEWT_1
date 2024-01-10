const axios = require("axios");
const fs = require("fs");

module.exports = {
	config: {
		name: "submit",
		usePrefix: true,
		description: "Image To Text",
		permission: 0,
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
	},
	run: async function ({ api, event }) {
		try {
			if (event.type === "message_reply") {
				
				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					console.log("Attachments found in the message reply:");
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "video") {
							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
							const imageResponse = await axios.get(largePreviewUrl, {
								responseType: "arraybuffer",
							});

							// Write the image data to a file
							fs.writeFileSync(`cache/mil.mp4`, Buffer.from(imageResponse.data, "binary"));
							var submit = await axios.get(`https://mil-api.ea-sy.tech//submit?url=https://newtai.bgfxd.repl.co/vid/mil.mp4&title=${filename}`);
api.sendMessage(submit.data.ok , event.threadID, event.messageID);
						}else{
							const url = event.messageReply.body;

								const res = await axios.get(`https://api.easy-api.online/api/tiktok?url=${url}`);

							const data = res.data.url;
							const fname = generateRandomName(7);
							var submit = await axios.get(`https://mil-api.ea-sy.tech/submit?url=${data}&title=${fname}.mp4`);
							api.sendMessage(submit.data.ok , event.threadID, event.messageID);

						}
					}
				}else{
					

					}
				}
			}catch(error) {console.log(error);}		
},
	};
function generateRandomName(length) {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let randomName = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		randomName += charset[randomIndex];
	}

	return randomName;
}