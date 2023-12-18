const axios = require("axios");
const fs = require("fs");

module.exports = {
	config: {
		name: "yt-search",
		usePrefix: false,
		description: "Search Youtube video",
		permission: 0, // 0|1|2 - 0 all user - 1 for admin and 3 for dev
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "Media",
		usages: "yt-search < Search Query >",
		cooldowns: 5,
	},
	run: async function ({ api, event, args, commandModules }) {
		try {
			let q = args.join(" ");
			if (!q) {
				api.sendMessage(
					"Please provide a search query",
					event.threadID,
					event.messageID
				);
				return false;
			}

			const options = {
				method: "GET",
				url: "https://api.easy0.repl.co/api/yt",
				params: { s: q },
				headers: { "User-Agent": "insomnia/8.4.5" },
			};

			const response = await axios(options);
			const videos = response.data;

			if (videos.length === 0) {
				api.sendMessage("No videos found for the given query", event.threadID);
				return false;
			}

			let replyMessage = "Choose a video by responding with the corresponding number:\n\n";
			videos.forEach((video, index) => {
				replyMessage += `${index + 1}. ${video.title}\n`;
			});

			await api.sendMessage(replyMessage, event.threadID);

			// Set a flag to track whether the listener should continue processing events
			let continueListening = true;

			// Set up a message event listener to handle user response
			api.listenMqtt(async (message) => {
				if (continueListening && message && event && message.threadID === event.threadID && message.senderID === event.senderID) {
					const selectedNumber = parseInt(message.body);
					if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= videos.length) {
						// User responded with a valid number
						const selectedVideo = videos[selectedNumber - 1];
						await api.sendMessage(`You selected: ${selectedVideo.title}\nURL: ${selectedVideo.url}`, event.threadID);

						// Set the flag to false to stop further processing of events
						continueListening = false;
					} else {
						await api.sendMessage("Invalid selection. Please respond with a valid number.", event.threadID);
					}

					// Stop listening by returning false
					return false;
				}

				// Continue listening for further messages
				return true;
			});
		} catch (error) {
			console.error(error);
			api.sendMessage("An error occurred. Please try again later.", event.threadID);
		}
	},
};
