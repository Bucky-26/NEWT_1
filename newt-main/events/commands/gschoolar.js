const axios = require("axios");

module.exports = {
	config: {
		name: "gschoolar",
		usePrefix: true,
		description: "Search Google Scholar",
		permission: 0, // 0 for all users
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "<query>",
		cooldowns: 5,
		commandCategory:"Education",

	},
	run: async function({ api, event, args, commandModules }) {
		try {
			const query = args.join(' ');
			if (!query) {
				api.sendMessage("Please provide a search query.", event.threadID);
				return;
			}

			const apiEndpoint = `https://gschoolar.bucky-26.repl.co/api/gschoolar?s=${query}`;
			const response = await axios.get(apiEndpoint);

			if (response.status === 200) {
				const data = response.data;

				if (data.length === 0) {
					api.sendMessage("No results found.", event.threadID);
				} else {
					const resultMessage = data.map((item, index) => {
						return `${index + 1}. Title: ${item.title}\nLink:https://scholar.google.com${item.link}`;
					}).join('\n\n');
					api.sendMessage(resultMessage, event.threadID);
				}
			} else {
				api.sendMessage("Unable to fetch data from Google Scholar.", event.threadID);
			}
		} catch (error) {
			console.error("An error occurred:", error);
			api.sendMessage("An error occurred while processing your request.", event.threadID);
		}
	},
};
