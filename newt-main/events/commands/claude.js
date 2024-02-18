const axios = require("axios");

module.exports = {
  config: {
    name: "mistral",
    usePrefix: true,
    description: "AI powered by Mistral Language model",
    permission: 0, // 0 for all users, 1 for admin, 2 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "AI",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    const question = args.join(" ");

    if (!question) {
      api.sendMessage("ℹ️ | Please provide a query", event.threadID, event.messageID);
      return;
    }

    api.sendMessage("Generating response. Please wait...", event.threadID).then(async (messageInfo) => {
      const messageID = messageInfo.messageID;

      const options = {
        method: 'POST',
        url: 'https://ai.ea-sy.tech/v1/chat/completion',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Your-User-Agent', // Add a proper User-Agent header
        },
        data: {
          message: question,
          model: 'mistral',
          apikey: 'zie-ai-v1-cde4fc58-0fae-47d2-9b6a-c0374c980067',
        },
      };

      try {
        const response = await axios.request(options);
        api.sendMessage(response.data.content, event.threadID, event.messageID);
        api.unsendMessage(messageID);
      } catch (error) {
        console.error(error);
        api.sendMessage("Something went wrong. Please try again.", event.threadID, messageID);
        api.unsendMessage(messageID);
      }
    });
  },
};
