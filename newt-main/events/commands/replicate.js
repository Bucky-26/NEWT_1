const axios = require('axios');
const fs = require('fs').promises; // Use fs.promises for async file operations
const { createReadStream } = require('fs'); // Import createReadStream from fs

module.exports = {
	config: {
		name: 'replicate',
		credits: '1SOY DEV',
		usePrefix: true,
		description: 'replicate ai',
		usage: 'replicate <text here>',
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"AI",

	},
	run: async function ({ api, event, args, commandModules, prefix }) {
		const text = args.join(' ');

		try {
			if(!text){
				api.sendMessage("Please provide a query ", event.threadID,event.messageID);
				return false;
			}
			api.sendMessage("Replicate AI Generating Image\n please wait....", event.threadID,event.messageID);

			const res = await axios.get(`https://api.easy0.repl.co/api/replicate?q=${text}`);
			const data = res.data.output;
			const ass = (await axios.get(data, { responseType: 'arraybuffer' })).data;

			// Save the file asynchronously
			await fs.writeFile('cache/out-0.png', Buffer.from(ass, 'binary'));

			api.sendMessage(
				{
					body: 'Replicate AI',
					attachment: createReadStream('cache/out-0.png'), // Use createReadStream from fs
				},
				event.threadID,
				event.messageID
			);
		} catch (error) {
			console.log(error);
		}
	},
};
