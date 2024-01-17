const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "ban" ,
    usePrefix: true,
    description: "Ban The Mention user ",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"ADMIN",

  },
  run: async function({ api, event, args, commandModules,banuser }) {

try{
  if (Object.keys(event.mentions).length === 0) {
  api.sendMessage('Please Mention A User', event.threadID, event.messageID);
} else {
  for (var i = 0; i < Object.keys(event.mentions).length; i++) {
    const mentionedUID = Object.keys(event.mentions)[i];


		//////////////////////////////////////////
	if(!banuser.includes(mentionedUID)){
		banuser.push(mentionedUID);
		fs.writeFile('ban.json', JSON.stringify(ban, null, 2), (err) => {
									if (err) {
										console.error('Error writing to ban.json:', err);
									} else {
										api.sendMessage('The User Have been Successfuly added on ban user',event.threadID,event.messageID);
										console.log('Thread ID added to ban.json');
									}
								});
						}else{
	   api.sendMessage('The User Is Already in bot ban use',event.threadID,event.messageID);
						}
    };

 
}
}
catch(error){
  console.log(error);
}

    api.sendMessage('',event.threadID,event.messageID);
  },////////////////
};
