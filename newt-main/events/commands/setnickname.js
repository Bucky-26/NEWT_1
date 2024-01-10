const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "botname" ,
    usePrefix: true,
    description: "Change The bot Name To all THe group",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"Utility",

  },
  run: async function({ api, event, args, commandModules, approvedID}) {
 const nickname = args.join(" ");
		
try{
	if(!nickname){
		api.sendMessage("Please Give The Nickname");
		return false;
	}
      approvedID.forEach(approvedID => {
	const my_id = api.getCurrentUserID();
 api.changeNickname(nickname, approvedID, my_id)
			 .then(() => {
              successfulThreadCount++;
          })
          .catch(error => {
              console.error(`Error sending message to thread ${approvedID}: ${error}`);
          });
      });
 
}
catch(error){
  console.log(error);
}

  },////////////////
};
