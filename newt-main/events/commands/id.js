const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "id",
    usePrefix: true,
    description: "A template command",
    permission: 0, // 0|1|2   - 0 all users, 1 for admin, and 2 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "template",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const adminIDs = threadInfo.adminIDs;

      // Extract user IDs from adminIDs
      const adminUserIDs = adminIDs.map((admin) => admin.id);

      api.sendMessage(
        `Admin IDs in the thread: ${adminUserIDs.join(", ")}`,
        event.threadID,
      );
    } catch (error) {
      console.error(error);
      // Handle the error, you can log it or send a specific error message.
      // For example: api.sendMessage({ body: 'An error occurred' });
    }
  },
};
