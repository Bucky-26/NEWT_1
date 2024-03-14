

module.exports = {
	config: {
		name: "noti",
		usePrefix: true,
		credits: "1SOY DEV",
		usage: `noti message`,
		description: "Broadcast an Announcement For Admin only",
		permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"Utility",

	},
	run: async function({ api, event, args, commandModules, config, approvedID }) {
		const fs = require("fs");
		const userVIPs = config.userVIPs;
		const senderID = event.senderID;
		const axios = require('axios');
		const path = require('path');
		const admininfo = await api.getUserInfo(senderID);
		const adminame = admininfo[senderID].name;
		const message = args.join(" ");
		try {


			if (!message) {
				api.sendMessage(`Please provide a message to send.`, event.threadID, event.messageID);
				return false;
			}
			const announcement = `==============\n Announcement \n==============\n\n\nMessage:\n ${message}`;
			if (event.type === "message_reply") {
				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					console.log("Attachments found in the message reply:");
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "photo") {
							const largePreviewUrl = attachment.url;
							const imageResponse = await axios.get(largePreviewUrl, {
								responseType: "arraybuffer",
							});

							fs.writeFileSync("cache/ocr.jpg", Buffer.from(imageResponse.data, "binary"));

									approvedID.forEach(approved => {
								api.sendMessage({ body: `${announcement}\n\nFROM: @${adminame}`, attachment: fs.createReadStream("cache/ocr.jpg"), mentions: [{ tag: `${adminame}`, id: event.senderID, fromIndex: 9 }] }, approved)
									.then(() => {
										successfulThreadCount++;
									})
									.catch(error => {
										console.error(`Error sending message to thread${error}`);
									});
							});
						}
					}
				}
			} else {
				const imageResponse = await axios.get(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(message)}&tl=fil&client=tw-ob`, { responseType: 'arraybuffer' });
				const imageBuffer = Buffer.from(imageResponse.data);

				// Save the image locally
				const outputPath = path.join('cache', 'anoun.mp3');
				fs.writeFileSync(outputPath, imageBuffer);


				let successfulThreadCount = 0; // To keep track of the threads that received the message

							approvedID.forEach(approved => {
					api.sendMessage({ body: `${announcement}\n\nFROM: @${adminame}`, attachment: fs.createReadStream(outputPath), mentions: [{ tag: `${adminame}`, id: event.senderID, fromIndex: 9 }] }, approved)
						.then(() => {
							successfulThreadCount++;
						})
						.catch(error => {
							console.error(`Error sending message to thread : ${error}`);
						});
				});

				api.sendMessage(`Message sent to ${successfulThreadCount} threads.`, event.threadID, event.messageID);
			}
		} catch (error) {
			api.sendMessage(`An error occurred while sending messages: ${error}`, event.threadID, event.messageID);
		}
	},
};
