const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "ass" ,
    credits:"1SOY DEV",
    usePrefix: true,
    description: "Random Ass[ hentai ] Image",
    usage:`ass`,
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"NSFW",

  },
  run: async function({ api, event, args, commandModules,prefix }) {

try{
    const axios = require('axios');
  const ass = (await axios.get(
      `https://api.easy0.repl.co/api/nsfw/waifu`,
      { responseType: 'arraybuffer' }
    )).data;
fs.writeFileSync(__dirname + '/cache/ass.jpg', Buffer.from(ass, 'binary'));
 
   
    api.sendMessage( {
      body:'Ass',
      attachment: fs.createReadStream(__dirname + '/cache/ass.jpg') 
    },event.threadID,event.messageID);
}
catch(error){
    console.log(error);
}


   
  },////////////////
};
