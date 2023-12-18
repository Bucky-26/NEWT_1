const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "advice" ,
		usePrefix: true,
		description: "Advice",
		permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
	credits: "OPERATOR ISOY",
	description: "",
	commandCategory: "group",
	usages: "",
	cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules }) {

try{
const res = await axios.get('https://adonisapi.bgfxd.repl.co/api/advice');
 data = res.data.advice;	
	api.sendMessage(`Advice from Newt AI\n\n${data}`,event.threadID,event.messageID);

}
catch(error){
	console.log(error);
}

	},
};
