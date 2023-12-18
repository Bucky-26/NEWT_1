const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "ahegao" ,
    credits:"1SOY DEV",
    usePrefix: true,  //true or false
    description: "Random ahegao Image",
    usage:`ahegao`,
    permission: 0,  /// 0 and 1 
    commandCategory:"NSFW",
  },
  run: async function({ api, event, args, commandModules,prefix }) {
try{

   const img = (await axios.get(
      `https://api.heckerman06.repl.co/api/nsfw/ahegao?apikey=danielxd`,
      { responseType: 'arraybuffer' }
    )).data;
    fs.writeFileSync('cache/ahegao.jpg', Buffer.from(img, 'binary'));
    const mes = {
      body : `This Is Your Image`,
      attachment: fs.createReadStream('cache/ahegao.jpg')
    }
  api.sendMessage(mes, event.threadID, event.messageID);
}
catch(error){
  console.log(error);
  api.sendMessage('Error Occur Please Try Again \nOr Contact The Developer',event.threadID,event.messageID);
}


   
  },////////////////
};
