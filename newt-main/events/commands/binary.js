const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "binary" ,
    credits:"1SOY DEV",
    usePrefix: true,
    description: "binary to text",
    usage:`binary Text`,
    permission: 0,
    commandCategory:"GROUP",

  },
  run: async function({ api, event, args, commandModules,prefix }) {
 const text = args.join(" ");
try{
  if (!text) {
    api.sendMessage('Please Provide a TEXT', threadID, messageID); // Fixed typo: event.threadID -> threadID, event.messageID -> messageID
  } else {
    const res = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/text-binary?text=${text}`);
    const binary = res.data.binary;  // Fixed variable name: data -> binary
    const reply = `Binary: ${binary}`; // Fixed variable name: binary -> reply
    api.sendMessage(reply, event.threadID, event.messageID); // Fixed typo: event.threadID -> threadID, event.messageID -> messageID
  }
}
catch(error){
  console.log(error);
}

 
  },////////////////
};
