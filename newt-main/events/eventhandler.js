module.exports = {
  run: async function ({ api, config, prefix, approvedID, banuser }) {
    const autogreet = config.autogreet;

    async function sendmessage(m) {
      const message = await api.sendMessage(m, event.threadID, event.messageID);
      return message;
    }

    async function userInfo(UserID) {
      const UserInfo = await api.getUserInfo(UserID);
      return UserInfo;
    }

    const dailygreet = require(__dirname + "/scheduledevent/dailygreet.js");

    if (autogreet) {
      await dailygreet.run({ api, userInfo, approvedID, config });
    }

    const path = require("path");
    const fs = require("fs");
    const greetjoin = require(__dirname + "/scheduledevent/greet.js");
    const commandhandler = require(__dirname + "/commandhandler.js");
    const events = require(__dirname + '/events.js');

    api.listenMqtt(async (err, event) => {
      if (err) return console.error(err);
      events.run({ event, api, prefix, config, userInfo, approvedID, banuser });

      switch (event.type) {
        case "message":
              if (!event.isGroup) {
           //// api.sendMessage("DMs", event.senderID);
          }
        case "message_reply":
          const parts = event.body.trim().split(" ");
          const args = parts.slice(1);





          await commandhandler.run({ sendmessage, args, event, api, prefix, config, userInfo, approvedID, banuser });

          break;
        case "event":
          if (event.logMessageType == "log:subscribe" || event.logMessageType == "log:unsubscribe") {
            await greetjoin.run({ event, api });
          }

          break;
      }
    });
  },
};
