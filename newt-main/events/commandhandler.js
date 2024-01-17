const fs = require("fs");
const path = require("path");
const commands = {};

function initializeCommands() {
  fs.readdirSync(__dirname + "/commands").forEach((file) => {
    if (file.endsWith(".js")) {
      try {
        const command = require(path.join(__dirname + `/commands/${file}`));
        commands[command.config.name] = command;
        console.log(
          `[ ADONIS DEV ] `.red,
          `>`.blue,
          `${command.config.name} command initialized successfully.`.green
        );
      } catch (error) {
        console.error(
          `[ ADONIS DEV ]`.red,
          `>`.blue,
          `Error initializing command '${file}': ${error.message}`.red
        );
      }
    }
  });
}
function fontbold(text) {
  const fontMapping = {
    a: "𝗮",
    b: "𝗯",
    c: "𝗰",
    d: "𝗱",
    e: "𝗲",
    f: "𝗳",
    g: "𝗴",
    h: "𝗵",
    i: "𝗶",
    j: "𝗷",
    k: "𝗸",
    l: "𝗹",
    m: "𝗺",
    n: "𝗻",
    o: "𝗼",
    p: "𝗽",
    q: "𝗾",
    r: "𝗿",
    s: "𝘀",
    t: "𝘁",
    u: "𝘂",
    v: "𝘃",
    w: "𝘄",
    x: "𝘅",
    y: "𝘆",
    z: "𝘇",
    A: "𝗔",
    B: "𝗕",
    C: "𝗖",
    D: "𝗗",
    E: "𝗘",
    F: "𝗙",
    G: "𝗚",
    H: "𝗛",
    I: "𝗜",
    J: "𝗝",
    K: "𝗞",
    L: "𝗟",
    M: "𝗠",
    N: "𝗡",
    O: "𝗢",
    P: "𝗣",
    Q: "𝗤",
    R: "𝗥",
    S: "𝗦",
    T: "𝗧",
    U: "𝗨",
    V: "𝗩",
    W: "𝗪",
    X: "𝗫",
    Y: "𝗬",
    Z: "𝗭",
  };

  let formattedText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    formattedText += fontMapping[char] || char;
  }
  return formattedText;
}
module.exports = { fontbold };
initializeCommands(fontbold);
module.exports = {
  run: async function ({sendmessage,args,event,api,prefix,config,approvedID,banuser}) {
    const input = event.body.trim();
if(!approvedID.includes(event.threadID) && !config.botAdmin.includes(event.senderID)){
  return false
}
    handleCommandWithPrefix(fontbold);

    handleCommandWithoutPrefix(fontbold);

    function handleCommandWithPrefix(fontbold) {
      const parts = input.slice(prefix.length).split(" ");
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);
      const user = event.senderID;

      const command = commands[commandName];
      if (event.body.startsWith(prefix)) {
        if (command) {
            if(banuser.includes(event.senderID)){ 
                api.sendMessage('You Are Not Allowed to you use the BOT',event.threadID,event.messageID);
                return false;
            }
          if (config.maintenance.enable && !config.botAdmin.includes(event.senderID)) {
            api.sendMessage(
              "The BOT is Under Maintenance.\nTo Serve You Better\n Sorry for the inconvenience.",
              event.threadID
            );
            return false;
          }
          const userPermission = config.botAdmin.includes(user) ? 1 : 0;
          if (!command.config.usePrefix && event.body.startsWith(prefix)) {
            
            api.sendMessage("This Command didn't need a prefix",event.threadID,event.messageID);
            
            return false;
          }
          if (userPermission >= command.config.permission) {
            command.run({sendmessage,api,event,args,commandModules: commands,config,approvedID,fontbold,prefix,banuser});
          } else {
            api.sendMessage(
              "You do not have permission to use this command.",
              event.threadID
            );
          }
        } else {
          api.sendMessage("Invalid command.", event.threadID);
        }
      }
    }

    function handleCommandWithoutPrefix(fontbold) {
      const input = event.body.trim();

      const parts = input.split(" ");
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);
      const user = event.senderID;

      const command = commands[commandName];

      if (command) {
        const userPermission = config.botAdmin.includes(user) ? 1 : 0;
        if (command.config.usePrefix) {
          api.sendMessage(
            "This Command need a prefix",
            event.threadID,
            event.messageID
          );
          return false;
        }
        if (userPermission >= command.config.permission) {
          if (
            config.maintenance.enable &&
            !config.botAdmin.includes(event.senderID)
          ) {
            api.sendMessage(
              "The BOT is Under Maintenance.\nTo Serve You Better\n Sorry for the inconvenience.",
              event.threadID
            );
            return;
          }
          command.run({ api, event, args, config, approvedID, fontbold });
        } else {
          api.sendMessage(
            "You do not have permission to use this command.",
            event.threadID
          );
        }
      }
    }
  },
};
