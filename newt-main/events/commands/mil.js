const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "military-vids",
    usePrefix: true,
    description: "Image To Text",
    permission: 0,
    credits: "OPERATOR ISOY",
    commandCategory: "group",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event }) {
    try {
     
     
         const download = await axios.get('https://mil-api.ea-sy.tech/api/military');
    const vidurl = download.data.video;
  const vid = (await axios.get(vidurl,
              { responseType: 'arraybuffer' }
          )).data;
          fs.writeFileSync('cache/dl.mp4',Buffer.from(vid, 'binary'));

          const mes = {
              body: `Video`,
              attachment: fs.createReadStream('cache/dl.mp4')
          };
          api.sendMessage(mes, event.threadID, event.messageID);

     
    } catch (error) {
      console.log(error);
    }
  },
};
