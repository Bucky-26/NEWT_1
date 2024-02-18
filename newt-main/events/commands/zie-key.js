const axios = require("axios");
const fs = require('fs')

module.exports = {
  config: {
    name: "zie-key",
    usePrefix: false,
    description: "generate api key for zie ai",
    permission: 0, //// 0|1|2 -0 all user - 1 for admin and 3 for dev
    credits: "OPERATOR ISOY",
    description: "",
    commandCategory: "template",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    try {
      if (!args.join(" ")) {
        return api.sendMessage('Please Provide a Username', event.threadID);
      }

      var options = {
        method: 'POST',
        url: 'https://zie-ai--v1.ea-sy.tech/v1/generate-key',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0' },
        data: { userID: event.senderID, username: args.join(" ") }
      };

      axios.request(options).then(function (response) {
        console.log(response.data.apiKey);

        // Send message about API key to the thread
        api.sendMessage('The API key has been sent to your inbox.', event.threadID);
        
        // Send the actual API key to the user
        api.sendMessage('Your Zie AI API KEY is \n' + `' ${response.data.apiKey} '`, event.senderID);

      }).catch(function (error) {
        console.error(error);
      });

    }
    catch (error) {
      console.log(error);
    }
  },
};
