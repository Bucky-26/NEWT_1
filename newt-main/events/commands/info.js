const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "info",
    usePrefix: true,
    description: "Get the bot Info",
    permission: 0, // 0|1|2 - 0 all user, 1 for admin, 3 for dev
    credits: "OPERATOR ISOY",
    description: "",
    commandCategory: "template",
    usages: "info",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    try {
      const commandsDir = path.join(__dirname); // Assuming the current file is in the "commands" folder

      // Read the files in the "commands" folder
      const files = fs.readdirSync(commandsDir);

      // Filter only JavaScript files
      const jsFiles = files.filter((file) => file.endsWith(".js"));

      // Get the total number of JavaScript files
      const totalCommands = jsFiles.length;

      const botinfo = ` ℹ️ | System Info\bName: Newt AI\vVersion: 1.0.0.2(beta)\vDeveloper: EASY TECH AI\vCommands: ${totalCommands}`;

      api.sendMessage(botinfo, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
    }
  },
};
