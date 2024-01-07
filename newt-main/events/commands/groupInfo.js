const axios = require("axios");
const fs = require('fs');

module.exports = {
  config: {
    name: "ginfo",
    usePrefix: false,
    description: "An template command",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
    credits: "OPERATOR ISOY",
    commandCategory: "template",
    usages: "",
    cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {
    try {
      const { threadID } = event;
      const { getThreadInfo } = api;
      const threadInfo = await getThreadInfo(threadID);

      const info = `
        Ｇｒｏｕｐ Ｉｎｆｏ

Name: ${threadInfo.threadName}
No. Admin: ${threadInfo.adminIDs.length}
Approval Mode: ${threadInfo.approvalMode}
Members: ${threadInfo.participantIDs.length}
Message Sent: ${threadInfo.messageCount}
      `;

      api.sendMessage(info, threadID);
    } catch (error) {
      console.error(error);
    }
  },
};
