const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "fact",
		usePrefix: true,
		description: "no description",
		permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "fun",
		usages: "",
		cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules }) {

		try {
			const res = await axios.get("https://api.easy0.repl.co/api/funfact");
			const data = res.data.fact;
			const fact = data;
			console.log(fact);
			api.sendMessage(fact, event.threadID, event.messageID);
		}
		catch (error) {
			console.log(error);
		}
	},
};
