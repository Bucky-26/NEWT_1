const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    Prefix: true,
    description: "List all available commands or get detailed information about a specific command",
    permission: 0,
    credits: "OPERATOR ISOY",
    commandCategory: "Help",
    usages: ["", "<command name>", "<page no.>", "all"],
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules, prefix, fontbold }) {
    try {
      const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));
      const commands = commandFiles.map((file) => {
        const command = require(path.join(__dirname, "../commands", file));
        return command.config;
      });

      if (args.length === 0) {
        const pageSize = 10;
        const page = 1;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const visibleCommands = commands.slice(startIndex, endIndex);

        const totalPages = Math.ceil(commands.length / pageSize);

        const commandList = visibleCommands.map((cmd) => `• ${cmd.name} - ${cmd.description}`).join("\n");

        const message = `${fontbold('⌈All Commands by Category⌋')}\n\n${commandList}\n\nUse \`help <command name>\` for details on a specific command or \`${prefix}help <page no.>\` to navigate.`;

        api.sendMessage(message, event.threadID);
      } else {
        const arg = args[0].toLowerCase();

        if (arg === "all") {
          const commandsByCategory = commands.reduce((result, cmd) => {
            const category = cmd.commandCategory || "Uncategorized";
            result[category] = result[category] || [];
            result[category].push(`• ${fontbold(cmd.name)} - ${cmd.description}`);
            return result;
          }, {});

          const categories = Object.keys(commandsByCategory);
          const categoryList = categories.map((category) => {
            const commandsList = commandsByCategory[category].join("\n");
            return `${fontbold(`⌈${category} Commands⌋`)}\n${commandsList}\n\n`;
          }).join("");

          const message = `${fontbold('⌈All Commands by Category⌋')}\n\n${categoryList}\nUse \`help <command name>\` for details on a specific command.`;

          api.sendMessage(message, event.threadID);
        } else if (!isNaN(arg)) {
          const pageSize = 10;
          const page = parseInt(arg);
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const visibleCommands = commands.slice(startIndex, endIndex);

          const totalPages = Math.ceil(commands.length / pageSize);

          const commandList = visibleCommands.map((cmd) => `• ${fontbold(cmd.name)} - ${cmd.description}`).join("\n");

          const message = `${fontbold('⌈Available Commands⌋')} ${page}/${totalPages}):\n\n${commandList}\n\nUse \`help <command name>\` for details on a specific command or \`help <page no.>\` to navigate.`;

          api.sendMessage(message, event.threadID);
        } else {
          const commandName = arg;
          const command = commands.find((cmd) => cmd.name === commandName);

          if (command) {
            const permissionText = command.permission === 1 ? "Admin" : "User";
            const usage = command.usages ? command.usages.join(" | ") : "No usage information";

            const message = `【﻿𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙄𝙣𝙛𝙤𝙢𝙖𝙩𝙞𝙤𝙣】

- ${fontbold('Name')}: ${command.name}
- ${fontbold('Description')}: ${command.description}
- ${fontbold('Usage')}: ${command.usage}
- ${fontbold('Permission')}: ${permissionText}
- ${fontbold('Developer')}: ${command.credits}`;

            api.sendMessage(message, event.threadID);
          } else {
            api.sendMessage("Invalid command name, page number, or category.", event.threadID);
          }
        }
      }
    } catch (error) {
      console.log(error);
      api.sendMessage("An error occurred while listing commands.", event.threadID);
    }
  },
};
