const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "text" ,
    usePrefix: true,
    description: "An example command",
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
  },
  run: async function({ api, event, args, commandModules }) {
const binary = args.join(" ");
		
try{
  if(!binary){
		    api.sendMessage('Please Provide A Binary',event.threadID,event.messageID);
		return false;
	}
	const res =  await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/binary-text?binary=${binary}`);
	const data = res.data.text;
	api.sendMessage(data,event.threadID,event.messageID);
}
catch(error){
  console.log(error);
}

    api.sendMessage('',event.threadID,event.messageID);
  },////////////////
};
