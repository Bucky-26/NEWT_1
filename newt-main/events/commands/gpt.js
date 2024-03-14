const axios = require("axios");

module.exports = {
  config: {
    name: "ai2",
    credits: "1SOY DEV",
    usage: `ai2 <question here>`,
    usePrefix: false,
    description: "CHATGPT 4 AI",
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
      var options = {
        method: 'GET',
        url: 'https://api.easy-api.online/v1/gpt4',
        data: { query: question }, // Sending query in the request body
        headers: { 'User-Agent': 'insomnia/8.6.1' }
      };

      const response = await axios.request(options);
      const data = response.data.content;
      const answer = data;
      const newt = `Hi I'm Newt AI🤖🤖`;
      const reply = `${newt}\n\n${answer}`;
      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);

      let errorMessage = 'An error occurred while processing your request. Please try again later.';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from the server';
      }

      api.sendMessage(errorMessage  + "\nPlease Try Again", event.threadID, event.messageID);
    }
  },
};
