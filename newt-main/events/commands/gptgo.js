const axios = require("axios");

module.exports = {
  config: {
    name: "gpt4",
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
    var options = {
  method: 'POST',
  url: 'https://zie-ai--v1.ea-sy.tech/v1/chat',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/8.6.0',
    authorization: 'zie-ai--v1--2a32d66f-f060-4741-a3b4-644596ae459a'
  },
  data: {model: 'gpt-4', message: question}
};



      const response = await axios.request(options);
      const data = response.data.content;
      const answer = data;
      const newt = fontbold("CHATGPT 4");
      const reply = `${answer}\n\n${newt}`;
      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);

      // Handle the error here if needed
  var options = {
        method: 'POST',
        url: 'https://ai--v2.easy0.xyz/api/v3/completion',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.5.1' },
        data: { message: question }
      };

      const response = await axios.request(options);
      const data = response.data.content;
      const answer = data;
      const newt = `Hi I'm Newt AI🤖🤖`;
      const reply = `${answer}${newt}\n\n`;
      api.sendMessage(reply, event.threadID, event.messageID);    
        
    }
  },
};
