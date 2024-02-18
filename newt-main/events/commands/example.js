const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "example" ,
    usePrefix: true,
    description: "an example command",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
    credits: "Adonis Jr San Juan",
    commandCategory: "example",
    usages: "",
	cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {

try{
  api.sendMessage('An example command',event.threadID,event.messageID);

}
catch(error){
  console.log(error);
}

  },
};
