const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "fbvids" ,
     credits:"1SOY DEV",
     usage:`fbvids URL`,
    usePrefix: true,
    description: "Download Fb video using URL",
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
      commandCategory:"DOWNLOAD",

  },
  run: async function({ api, event, args, commandModules }) {
 const url = args.join(" ");
try{
      if (url) {
          if (!url.startsWith('https://')) {
              api.sendMessage("Please Provide a Valid Facebook Video URL", event.threadID, event.messageID);
              return false;
          }
          const res = await axios.get(`https://api.heckerman06.repl.co/api/download/facebook?url=${encodeURIComponent(url)}&fs=e&s=cl&flite=scwspnss&apikey=danielxd`);
       //   const title = res.data.data.title || "No Title";
          const vidurl = res.data.data.isHdAvailable ? res.data.data.urls[0].hd : res.data.data.urls[0].sd;

          const vid = (await axios.get(vidurl,
              { responseType: 'arraybuffer' }
          )).data;
          fs.writeFileSync('cache/fb1.mp4',Buffer.from(vid, 'binary'));

          const mes = {
              body: `TITLE : ${title}`,
              attachment: fs.createReadStream('cache/fb1.mp4')
          };
          api.sendMessage(mes, event.threadID, event.messageID);
      } else {
        api.sendMessage('Please Provide A Fb Video URL',event.threadID,event.messageID);
      }
}
catch(error){
  console.log(error);
}

    
  },////////////////
};
