const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "movie",
		usePrefix: true,
		description: "Search Movie",
		permission: 0, // 0|1|2 - 0 for all users, 1 for admin, and 2 for dev
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "/movie [search term]",
		cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules }) {

		function generateRandomName(length) {
			const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			let randomName = '';

			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * charset.length);
				randomName += charset[randomIndex];
			}

			return randomName;
		}

		const searchTerm = args.join(" "); // User input for movie search

		if (!searchTerm) {
			api.sendMessage('Please provide a search term for movies', event.threadID, event.messageID);
			return;
		}

		try {
			api.sendMessage('Searching for movies, Please Wait!!!!', event.threadID, event.messageID);
			const response = await axios.get(`https://ww2.123moviesfree.net/searching?q=${searchTerm}&limit=40&offset=0`);
			const data = response.data.data;

			if (data.length > 0) {
				const downloadDirectory = path.join(__dirname, 'cache');

				if (!fs.existsSync(downloadDirectory)) {
					fs.mkdirSync(downloadDirectory, { recursive: true });
				}
				const rndname = generateRandomName(7);

				const downloadPromises = data.map(async (item, index) => {
					const imageUrl = `https://img.icdn.my.id/thumb/w_200/h_300/${item.s}.jpg`;
					const imageFileName = path.join(downloadDirectory, `movie_image_${index}.jpg`);

					try {
						const imageResponse = await axios.get(imageUrl, {
							responseType: 'stream'
						});

						const writeStream = fs.createWriteStream(imageFileName);
						imageResponse.data.pipe(writeStream);

						return new Promise((resolve, reject) => {
							writeStream.on('finish', resolve);
							writeStream.on('error', reject);
						});
					} catch (error) {
						console.error("Error while downloading movie image:", error);
					}
				});

				await Promise.all(downloadPromises);

				const attachments = data.map((item, index) => {
					const imageFileName = path.join(downloadDirectory, `movie_image_${index}.jpg`);
					return fs.createReadStream(imageFileName);
				});
			
				const messages = data.map((item, index) => {
					return `Title: ${item.t}\n Link: https://api.easy0.repl.co/movie/${rndname}?q=${item.s}&t=${item.d}`;
				});

				api.sendMessage(
					{
						body: messages.join("\n"),
						attachment: attachments,
					},
					event.threadID
				);
			} else {
				api.sendMessage("No movies found.", event.threadID, event.messageID);
			}
		} catch (error) {
			console.error("An error occurred while searching for movies:", error);
			api.sendMessage("An error occurred while searching for movies.", event.threadID, event.messageID);
		}
	},
};
