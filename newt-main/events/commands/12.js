const axios = require("axios");
const fs = require('fs')

module.exports = {
  config: {
    name: "newcommand", // Change the command name to "newcommand"
    usePrefix: true,
    description: "an example command",
    permission: 0,
    credits: "Adonis Jr San Juan",
    commandCategory: "example",
    usages: "",
    cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {
    try {
      const limit = 100;
      const tags = ["tags"];

      api.getThreadList(limit, null, tags, async (err, list) => {
        if (err) {
          console.error(err);
          return;
        }

        const groupThread = list.find(thread => thread.isGroup);

        if (groupThread) {
          const threadID = groupThread.threadID;

          await api.sendMessage(`Thread ID: ${threadID}`, event.threadID, event.messageID);
        } else {
          console.log("No group threads found.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
