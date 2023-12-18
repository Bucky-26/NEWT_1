const axios = require('axios');
const fs = require('fs');
const path = require('path');
module.exports = {
	config: {
		name: 'randomimg',
		credits: '1SOY DEV',
		usePrefix: true,
		description: 'Random Ass Image',
		usage: 'randomimg',
		permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
	},
	run: async function ({ api, event }) {
		try {
			const response = await axios.get('https://api.easy0.repl.co/api/random?cat=technology');
			const imageUrl = response.data.image;

			const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });

			// Save the image to a file
			const imagePath = path.join(__dirname, 'cache', 'random.jpg');
			imageResponse.data.pipe(fs.createWriteStream(imagePath));

			// Send the image as an attachment
			api.sendMessage({
				body: 'RND IMAGE CATEGORY: TECH',
					attachment: fs.createReadStream(imagePath)
			}, event.threadID, event.messageID);
		} catch (error) {
			console.log(error);
		}
	},
};
