const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "cum" ,
    credits:"1SOY DEV",
     usage:`cum`,
    usePrefix: true,
    description: "random anime cum images",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"NSFW",
  },
  run: async function({ api, event, args, commandModules,prefix }) {
 const cumimg = (await axios.get(
      `https://api.easy-api.online/api/nsfw/waifu`,
      { responseType: 'arraybuffer' }
    )).data;
fs.writeFileSync('cache/cum.jpg', Buffer.from(cumimg, 'binary'));
    const message = {
      body: 'Image',
      attachment: fs.createReadStream('cache/cum.jpg')
    
  }
  api.sendMessage(message,event.threadID,event.messageID);
  },////////////////
};
