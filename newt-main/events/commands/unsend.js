const axios = require("axios");
const fs = require('fs');

module.exports = {
  config: {
    name: "un",
    usePrefix: false,
    description: "A template command",
    permission: 1, // 0 for all users, 1 for admin, 3 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "template",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    try {
      if (event.type === "message_reply") {
        // If the message is a reply, unsend the original message
        const originalMessageID = event.messageReply.messageID;
        api.unsendMessage(originalMessageID);
      }

      // Send an empty message to avoid triggering "You can't send an empty message" error
      api.sendMessage('', event.threadID, event.messageID);
    } catch (error) {
      console.error(error);

      // Handle the error here if needed
      api.sendMessage('Error processing the command. Please try again later.', event.threadID, event.messageID);
    }
  },
};
