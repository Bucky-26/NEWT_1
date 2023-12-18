const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "quote" ,
    usePrefix: true,
     credits:"1SOY DEV",
     usage:`quote`,
    description: "random quote",
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"group",

  },
  run: async function({ api, event, args, commandModules }) {

try{
	const res =  await axios.get(`https://api.easy0.repl.co/api/quote`);
 ///  const res = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/fun/quote`);
          const quote = res.data.quote;
          const author = res.data.author;
      let message = `Quote: ${quote} 
      \n -Author: ${author}`;
  api.sendMessage(message, event.threadID, event.messageID);
}
catch(error){
  console.log(error);
}

 
  },////////////////
};
