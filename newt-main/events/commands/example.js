const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "template" ,
    usePrefix: true,
    description: "An template command",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
    credits: "OPERATOR ISOY",
    description: "",
    commandCategory: "template",
    usages: "",
	cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {

try{
  api.sendMessage('',event.threadID,event.messageID);

}
catch(error){
  console.log(error);
}

  },
};
