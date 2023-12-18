const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "bot",
    usePrefix: true,
    description: "to test the bot processing speed",
    permission: 0, // 0|1|2 - 0 for all users, 1 for admin, 3 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "UTILITY ",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    try {
      const startTime = performance.now();

      const endTime = performance.now();
      const executionTime = endTime - startTime;
      api.sendMessage(
        `Command execution time: ${executionTime} milliseconds`,
        event.threadID,
        event.messageID,
      );
      console.log(`Command execution time: ${executionTime} milliseconds`);
    } catch (error) {
      console.log(error);
    }
  },
};
