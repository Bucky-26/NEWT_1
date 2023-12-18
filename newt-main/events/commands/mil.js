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
      const imageResponse = await axios.get(
        "https://cdn.easy0.repl.co/military.mp4",
        {
          responseType: "arraybuffer",
        },
      );

      fs.writeFileSync(
        "cache/random-military.mp4",
        Buffer.from(imageResponse.data, "binary"),
      );
      const startTime = performance.now();

      const endTime = performance.now();
      const executionTime = endTime - startTime;
      api.sendMessage(
        {
          body: `Random Military Video\n\nProcess Speed: ${executionTime}`,
          attachment: fs.createReadStream("cache/random-military.mp4"),
        },
        event.threadID,
        event.messageID,
      );
    } catch (error) {
      console.log(error);
    }
  },
};
