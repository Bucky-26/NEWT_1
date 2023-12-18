const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "yt" ,
    usePrefix: true,
     credits:"1SOY DEV",
     usage:`yt URL`,
    description: "download video on youtube using link",
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
  },
  run: async function({ api, event, args, commandModules }) {
  const url = args.join(" ");
    if(url){
    try{
      if(!url.startsWith("https://www.youtube.com/watch?")){
        api.sendMessage("Please provide A Valid Yt Video URL", event.threadID,event.messageID);
        return false;
      }
			const res =  await axios.get(`https://adonisapi.bgfxd.repl.co/api/ytdl?url=${url}`);
			const data = res.data.downloadUrl;
  const vid = (await axios.get(data,
      { responseType: 'arraybuffer' }
    )).data;
    fs.writeFileSync('cache/videoplayback.mp4', Buffer.from(vid, 'binary'));
          const mes = {
              body: ``,
              attachment: fs.createReadStream('cache/videoplayback.mp4')
          }
  api.sendMessage(mes, event.threadID, event.messageID);
    }catch(error){
      console.log(error);
    }
    }else{
    api.sendMessage('Please Provide A yt Video URL', event.threadID, event.messageID);
  }
  },////////////////
};
