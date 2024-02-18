const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "kick" ,
    usePrefix: true,
    description: " Kick The Mention User",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"ADMIN",
  },
  run: async function({ api, event, args, commandModules,config }) {

try{
if (Object.keys(event.mentions).length === 0) {
  api.sendMessage('Please Mention A User', event.threadID, event.messageID);
} else {
  for (var i = 0; i < Object.keys(event.mentions).length; i++) {
    const mentionedUID = Object.keys(event.mentions)[i];
		if(config.botAdmin.includes(mentionedUID)){
			api.sendMessage(`You Can't kick this user`,event.threadID,event.messageID);
			return false;
		}
    const userInfo = await api.getUserInfoMain(mentionedUID);
    const fname = userInfo[mentionedUID].name;
const acculr = userInfo[mentionedUID].profileUrl;
    const gendernum = userInfo[mentionedUID].gender;
    let gender = "";
    

    

      api.removeUserFromGroup(mentionedUID, event.threadID);

    };

 
}
          }catch(error){
            console.log(error);
          }

    api.sendMessage('',event.threadID,event.messageID);
  },////////////////
};
