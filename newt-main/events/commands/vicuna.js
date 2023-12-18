const axios = require("axios");

module.exports = {
  config: {
    name: "vicuna",
    usePrefix: true,
    description: "AI powered by Mistral Language model",
    permission: 0, // 0 for all users, 1 for admin, 2 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "AI",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    const question = args.join(" ");

    if (!question) {
      api.sendMessage(
        "ℹ️|Please provide a query",
        event.threadID,
        event.messageID,
      );
      return;
    }

    api
      .sendMessage("Generating response. Please wait...", event.threadID)
      .then((messageInfo) => {
        const messageID = messageInfo.messageID;

        axios
          .get(
            `https://api.easy0.repl.co/api/vicuna?q=${encodeURIComponent(
              question,
            )}&api=https://newtai.bgfxd.repl.co`,
          )
          .then((response) => {
            const data = response.data;
            const claude = data.content;

            api.sendMessage(claude, event.threadID, event.messageID);
            api.unsendMessage(messageID);
          })
          .catch((error) => {
            api.sendMessage(
              "Something went wrong.\nPlease try again.",
              event.threadID,
              messageID,
            );
            api.unsendMessage(messageID);
            console.error(error);
          });
      });
  },
};
