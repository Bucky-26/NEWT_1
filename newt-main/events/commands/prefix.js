const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Assuming config.json is in the root directory of your project
const configPath = path.resolve(__dirname, "../../../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const prefix = config.prefix;

module.exports = {
  config: {
    name: "prefix",
    usePrefix: false,
    description: "An template command",
    permission: 0,
    credits: "OPERATOR ISOY",
    commandCategory: "group",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules, prefix }) {
    try {
      const message = `
 Hi I'm Newt this is my Prefix [ - ]
	  	[	 AI Commands ]
 -ai [chatgpt 3.5 || LLMs] 
 -bard [Bard AI || LLMs] 
 -blackai [Blackbox AI || LLMs] 
 -capy [Capybara AI || LLMs] 
 -gpt note:globagpt 
 -palm [Palm 2 AI || LLMs] 
 -mistral [Mistral AI || LLMs]
 -openchat [GPT 4 AI || LLMs]
 -llama [Llama 70b AI || LLMs]
 -toppy  [Toppy AI || LLMs]
 -zephyr [Zephyr AI || LLMs]

 `;
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
    }
  },
};
