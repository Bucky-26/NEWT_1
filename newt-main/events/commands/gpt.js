const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    credits: "1SOY DEV",
    usage: `ai <question here>`,
    usePrefix: false,
    description: "use chat gpt",
    permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory: "AI",
  },
  run: async function ({ api, event, args, commandModules, fontbold, prefix }) {
    const question = args.join(" ");

    if (!question) {
      api.sendMessage('Please Provide a query|question\nexample: -ai what is love', event.threadID, event.messageID);
      return false;
    }

    api.sendMessage('Generating..... Response! Please wait...', event.threadID, event.messageID);

    try {
      const options = {
        method: 'POST',
        url: 'https://ai--v2.easy0.xyz/api/v3/completion',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
        data: { message: question }
      };

      const response = await axios.request(options);
      const data = response.data.content;
      const answer = data;
      const newt = `Hi I'm Newt AI🤖🤖`;
      const reply = `${newt}\n\n${answer}`;
      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);

      // Handle the error here if needed
      api.sendMessage('Error generating response. Please try again later.', event.threadID, event.messageID);
    }
  },
};
