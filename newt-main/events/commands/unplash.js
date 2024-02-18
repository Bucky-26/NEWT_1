const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "unsplash",
		usePrefix: true,
		credits: "1SOY DEV",
		usage: "unsplash query",
		description: "Search for an image on Unsplash",
		permission: 0,
		// Other configuration properties
	},
	run: async function ({ api, event, args, commandModules }) {
		const query = args.join(" ");

		if (!query) {
			api.sendMessage("Please Provide A Query...", event.threadID, event.messageID);
			return;
		}

		api.sendMessage("Searching Image🔍, Please Wait.....", event.threadID).then(async (messageInfo) => {
			try {
				const res = await axios.get(`https://api.easy-api.online/v1/unsplash?s=${query}`);
				const imgResults = res.data;

				if (imgResults.length === 0) {
					api.sendMessage(`No image results found for "${query}"`, event.threadID, event.messageID);
					return;
				}

				const randomIndices = getRandomIndices(imgResults.length, Math.min(10, imgResults.length));
				const attachments = [];

				for (let i = 0; i < randomIndices.length; i++) {
					const index = randomIndices[i];
					const imageData = imgResults[index];
					const imageUrl = imageData.urls.regular;
					const altDescription = imageData.alt_description || "No description available";

					const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
					const imagePath = path.join(__dirname, 'cache', `unsplash_${i}.jpg`);
					const dis = `${i} ${altDescription} \n\n`;
					fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
					attachments.push(fs.createReadStream(imagePath));
			}

				api.sendMessage({
					body: `This is the 10 random Image Result \nTotal Result of ${imgResults.length}\n`,
					attachment: attachments,
				}, event.threadID, (err, msgInfo) => {
					if (!err) {
						api.unsendMessage(messageInfo.messageID);
					} else {
						console.error(err);
					}
				});
				
			} catch (error) {
				console.error(error);
			}
		});
	},
};

function getRandomIndices(max, count) {
	const indices = Array.from({ length: max }, (_, i) => i);
	for (let i = max - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[indices[i], indices[j]] = [indices[j], indices[i]];
	}
	return indices.slice(0, count);
}
