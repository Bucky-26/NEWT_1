const axios = require("axios");

module.exports = {
  config: {
    name: "bing",
    usePrefix: false,
    description: "bing AI based on OPENAI chatgpt 4",
    permission: 0,
    usage:'bing <you question here>',
    credits: "Easy tech API",
    commandCategory: "AI",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    try {
      const text = args.join(" ");

      if (!text) {
        return api.sendMessage("Please provide a question or query", event.threadID, event.messageID);
      }

      api.sendMessage('Bing generating response, please wait...', event.threadID, event.messageID);

      const options = {
        method: 'GET',
        url: 'https://ai.easy-api.online/v1/completion',
        params: { model: 'gpt4', query: text },
        headers: { 'User-Agent': 'insomnia/8.5.1' },
      };

      const response = await axios.request(options);
      
      api.sendMessage(response.data.response, event.threadID, event.messageID);
      
      console.log(response.data);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while processing your request', event.threadID, event.messageID);
    }
  },
};
