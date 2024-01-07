const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "imgen" ,
		 credits:"1SOY DEV",
		 usage:`imgai image description`,
		usePrefix: true,
		description: "Ai Image Generator",
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"AI",

	},
	run: async function({ api, event, args, commandModules }) {
const text = args.join(" ");
		try {
			

			const imageResponse = await axios.get(`https://api.easy-api.online/api/imggen?q=${text}`, { responseType: 'arraybuffer' });
			const imageBuffer = Buffer.from(imageResponse.data);

			// Save the image locally
			const outputPath ='cache/out-0.png';
			fs.writeFileSync(outputPath, imageBuffer);

			// Send the image as an attachment
			const attachmentData = {
					body: `Prompt: ${text} \n This Is your Image`,
					attachment: fs.createReadStream(outputPath),
			};

			api.sendMessage(attachmentData, event.threadID, event.messageID);
	} catch (error) {
		api.sendMessage(`Having Error While Generating an Image`, event.threadID, event.messageID);
			console.error("Error generating image:", error);
	}
	},////////////////
};
