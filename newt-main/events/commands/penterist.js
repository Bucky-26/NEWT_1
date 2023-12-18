const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "penterist" ,
    usePrefix: true,
     credits:"1SOY DEV",
     usage:`penterist query`,
    description: "search and download image on penterist",
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
      commandCategory:"Image Search",

  },
  run: async function({ api, event, args, commandModules }) {


const query = args.join("");
 if(!query){
     api.sendMessage('Please Provide A query',event.threadID,event.messageID);
     return false;
   }
  api.sendMessage(`Searching Image🔍, Please Wait.....`,event.threadID,event.senderID);
  const res = await axios.get(`https://api.heckerman06.repl.co/api/search/pinterest?query=${query}&apikey=buynew`);
          
  const imgurls = res.data.result.slice(0, 6);
        const imgurc = res.data.result;
const imgcount = imgurc.length;
  const attachments = [];
           
  for (let i = 0; i < imgurls.length; i++) {
      const url = imgurls[i];
      const imagePath = `cache/penterist${i + 1}.png`;

      try {
        
          const imageResponse = await axios.get(url, {
              responseType: "arraybuffer",
          });
api.sendMessage(`Searching Image🔍, Please Wait.....`,event.threadID,event.senderID);
          fs.writeFileSync(imagePath, imageResponse.data);
          attachments.push(fs.createReadStream(imagePath));
      } catch (error) {
          api.sendMessage('Error While Saving Image', event.threadID, event.messageID);
      }
  }

  const mes = {
      body: `Total Image Result: ${imgcount}\n\nHere's You Image`,
      attachment: attachments
  };

  api.sendMessage(mes, event.threadID, event.messageID);
  },////////////////
};
