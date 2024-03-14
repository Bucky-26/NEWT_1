const axios = require("axios");
module.exports = {
	config: {
		name: "aiv3",
		credits: "1SOY DEV",
		usage: `ai < question here >`,
		usePrefix: false ,
		description: "use chat gpt",
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"AI",

	},
	run: async function({ api, event, args, commandModules, fontbold,prefix }) {
		const question = args.join(" ");
		
		if (!question) {
			api.sendMessage('Please Provide a query|question\nexample: -ai what is love', event.threadID, event.messageID);
			return false;
		}
		api.sendMessage('Generating..... Response! Please wait...', event.threadID, event.messageID);
		try {
		    console.log(event.senderID);
		var options = {
  method: 'POST',
  url: 'https://gemini.ea-sy.tech/v2/chat/completion',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1'},
  data: {message: question, userId: event.senderID
  }
};

axios.request(options).then(function (response) {
  		api.sendMessage(response.data.content, event.threadID, event.messageID);

}).catch(function (error) {
  console.error(error);
});
		} catch (error) {
			console.log(error);
//const res = await axios.get(`https://chatgayfeyti.archashura.repl.co/?gpt=${question}`);
		
		}
	},
};
