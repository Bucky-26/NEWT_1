const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "setbio" ,
    usePrefix: true,
    description: "Change The bot BIO",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"Utility",

  },
  run: async function({ api, event, args, commandModules }) {
const bio = args.join(" ");
try{
  if(!bio){
		api.sendMessage("Please Add A BIO",event.threadID,event.messageID);
		return false;
	}
	api.changeBio(bio);
	
}
catch(error){
  console.log(error);
	api.sendMessage("Error Occur Please Try Again",event.threadID,event.messageID);
}

  },////////////////
};
