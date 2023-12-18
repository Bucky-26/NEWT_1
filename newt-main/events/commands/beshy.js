const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "beshy" ,
		usePrefix: true,
		description: "NULL",
		permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
	credits: "OPERATOR ISOY",
	description: "",
	commandCategory: "group",
	usages: "-beshy < TEXT HERE >",
	cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules }) {
const beshy = args.join("🤸‍♀️");
		if(!beshy){
			api.sendMessage('Please provide a text',event.threadID,event.messageID);

		}
try{
	api.sendMessage(beshy,event.threadID,event.messageID);

}
catch(error){
	console.log(error);
}

	},
};
