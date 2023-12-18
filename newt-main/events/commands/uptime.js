const axios = require("axios");
const fs = require('fs');

let projectStartTime = Date.now();

module.exports = {
  config: {
    name: "uptime",
    usePrefix: true,
    description: "Get the uptime of the running project",
    permission: 0, // 0 for all users
    credits: "OPERATOR ISOY",
    commandCategory: "group",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    try {
      const uptime = formatUptime(Date.now() - projectStartTime);
      api.sendMessage(`Project Uptime: ${uptime}`, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  },
};

function formatUptime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
}
