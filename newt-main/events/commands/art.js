const axios = require("axios");
const fs = require('fs');
module.exports = {
  config: {
    name: "art" ,
    credits:"1SOY DEV",
    usePrefix: true,
    description: "AI Image  generator",
    usage:`art (description)`,
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    commandCategory:"AI",
  },
  run: async function({ api, event, args, commandModules,prefix }) {
const text = args.join(" ");
    if(!text){
      return api.sendMessage(`Please Provide A query`,event.threadID,event.messageID);
    }
    try {
      const response = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/genimg?prompt=${text}=sd`);
      const imageUrl = response.data.result; 

      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data);

      const outputPath = 'cache/out-0.png';
fs.writeFileSync(outputPath, imageBuffer);
      const attachmentData = {
          body: `Prompt: ${text} \n This Is your Image`,
          attachment: fs.createReadStream(outputPath),
      };

      api.sendMessage(attachmentData, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`Having Error While Generating an Image`, event.threadID, event.messageID);
      console.error("Error generating image:", error);
  }
  },////////////////
};
