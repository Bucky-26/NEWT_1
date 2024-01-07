const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "removebg",
    usePrefix: true,
    description: "Get the large preview URL of a replied photo",
    permission: 0,
  },
  run: async function ({ api, event }) {
    try {
      if (event.type === "message_reply") {
        const replyMessage = event.body;
        const originalMessage = event.messageReply.body;

        if (
          event.messageReply.attachments &&
          event.messageReply.attachments.length > 0
        ) {
          console.log("Attachments found in the message reply:");
          for (const attachment of event.messageReply.attachments) {
            if (attachment.type === "photo") {
              const largePreviewUrl = attachment.url;
              const filename = attachment.filename;

              const response = await axios.get(
                `https://api.easy-api.online/v1/removebg?image=${encodeURIComponent(
                  largePreviewUrl
                )}`,
                { responseType: 'arraybuffer' }
              );

              if (response.status === 200) {
                const cachePath = path.join(__dirname, 'cache', 'removebg.png');
                fs.writeFileSync(cachePath, Buffer.from(response.data, 'binary'));

                api.sendMessage(
                  {
                    body: 'Remove BG',
                    attachment: fs.createReadStream(cachePath),
                  },
                  event.threadID,
                  event.messageID
                );
              } else {
                console.error("Error:", response.status, response.statusText);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
