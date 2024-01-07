const axios = require("axios");
const fs = require('fs');
const { exec } = require('child_process');

module.exports = {
  config: {
    name: "cmd",
    usePrefix: true,
    description: "execute terminal command",
    permission: 1,  // 0|1|2 - 0 all user - 1 for admin and 3 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "admin",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    // Join the arguments to form the command
    const command = args.join(' ');

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${stderr}`);
        api.sendMessage(`Error executing command: ${stderr}`, event.threadID, event.messageID);
        return;
      }

      console.log(`Command executed successfully: ${stdout}`);
      api.sendMessage(`Command executed successfully:\n${stdout}`, event.threadID, event.messageID);
    });

    // This block of code will send an empty message to the thread
    try {
      api.sendMessage('', event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
    }
  },
};
