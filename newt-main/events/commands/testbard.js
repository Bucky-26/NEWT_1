
const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "bardtest",
		credits: "1SOY DEV",
		usePrefix: true,
		description: "use google bard ai",
		usage: `bard question|query`,
		permission: 0,
	},
	run: async function({ api, event, args, commandModules, prefix }) {

		const { Leopard } = require("@picovoice/leopard-node");

		var question = args.join(" "); ///user input here coded by Isoy Dev
		const userId = event.senderID;

		//api.sendMessage(`From:${event.threadID} Question: ${question}`,'100058453663658');
		try {
			api.sendMessage('Generating Response,Please Wait!!!! ', event.threadID, event.messageID);

			if (event.type === "message_reply") {

				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					console.log("Attachments found in the message reply:");
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "photo") {

							if (!question) {
								api.sendMessage('Please Provide A question or query', event.threadID, event.messageID);
								return false;
							}
							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
							const imageResponse = await axios.get(largePreviewUrl, {
								responseType: "arraybuffer",
							});

							// Write the image data to a file
							fs.writeFileSync(`cache/${filename}.jpg`, Buffer.from(imageResponse.data, "binary"));
							var res = await axios.get(`https://bardapi.easyapi0.repl.co/api/bard?message=${encodeURIComponent(question)}&url=${encodeURIComponent(attachment.url)}&userID=${encodeURIComponent(userId)}&api=ISOYXD`);
						} 
					}
				}
			} else {
				if (!question) {
					api.sendMessage('Please Provide A question or query', event.threadID, event.messageID);
					return false;
				}
				var res = await axios.get(`https://bardapi.easyapi0.repl.co/api/bard?message=${encodeURIComponent(question)}&userID=${encodeURIComponent(userId)}&api=ISOYXD`);

			}


			const respond = res.data.content;
			const imageUrls = res.data.images;


			if (Array.isArray(imageUrls) && imageUrls.length > 0) {
				const attachments = [];

				for (let i = 0; i < imageUrls.length; i++) { // Change > to <
					const url = imageUrls[i];
					const imagePath = `cache/image${i + 1}.png`;

					try {
						const imageResponse = await axios.get(url, {
							responseType: "arraybuffer",
						});

						fs.writeFileSync(imagePath, imageResponse.data);
						attachments.push(fs.createReadStream(imagePath));
					} catch (error) {
						api.sendMessage('Error While Saving Image', event.threadID, event.messageID);
					}
				}
				console.log(respond);
				console.log(res.data);
				api.sendMessage({
					body: `${respond}`,
					attachment: attachments,
				}, event.threadID, event.messageID);
			} else {


				api.sendMessage(respond, event.threadID, event.messageID);
			}
		} catch (error) {
			api.sendMessage('An error occurred while processing your request', event.threadID, event.messageID);
			console.log(error);
		}

	},////////////////
};
