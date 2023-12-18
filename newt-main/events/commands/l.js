const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "clean1",
		usePrefix: true,
		description: "Clears all files in the cache folder",
		permission: 0, // 0|1|2 - 0 for all users, 1 for admin, 3 for dev
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
		commandCategory:"Utility",
	},
	run: async function ({ api, event, args, commandModules }) {
		try {
			const cacheFolderPath = path.join('./cache');

			const files = fs.readdirSync(cacheFolderPath);

			files.forEach((file) => {
				const filePath = path.join(cacheFolderPath, file);
				fs.unlinkSync(filePath);
			});

			api.sendMessage('All files in the cache folder deleted successfully.', event.threadID);
		} catch (error) {
			console.log(error);
			api.sendMessage('An error occurred while deleting files in the cache folder.', event.threadID);
		}
	},
};
