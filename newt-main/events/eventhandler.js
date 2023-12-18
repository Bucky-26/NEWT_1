module.exports = {
	run: async function ({ api, config ,prefix,approvedID}) {
	const autogreet = config.autogreet;
////////font handler 	
		

	async function sendmessage(m){
		const message = api.sendMessage(m,event.threadID,event.messageID);
		return message;
	}

async function userInfo(UserID){
	const UserInfo = await api.getUserInfo(UserID);
	return UserInfo;
}
		
		const  dailygreet  = require(__dirname + "/scheduledevent/dailygreet.js");


		if(autogreet){
				 dailygreet.run({api,userInfo,approvedID,config});
		}
				const path = require("path");
const fs = require("fs");
const  greetjoin  = require(__dirname + "/scheduledevent/greet.js");
// const greetwelcome = require(__dirname + "/scheduledevent/greet.js");
		const commandhandler = require(__dirname + "/commandhandler.js");
 const events = require(__dirname + '/events.js');

		api.listenMqtt(async (err, event) => {
			if (err) return console.error(err);
			 events.run({ event, api,prefix,config ,userInfo,approvedID});

			if (event.type === 'message' || event.type === 'message_reply') {
				const parts = event.body.trim().split(" ");
				const args = parts.slice(1);
				if(event.body.startsWith("owner") ||event.body.startsWith(prefix+ "owner")){
					api.sendMessage("OWNER INFO\n\n\nName:Adonis Jr. S. Sanchez\n\nStudy: WEB DEVELOPMENT AND DOTNET PROGRAMMING\n\nREL STATS: SINGLE\n\n\n CRUSH: NULL\n\n\n Dont Forget TO Follow MY DEV \n\nhttps://www.facebook.com/Buckyy26",event.threadID);
				}

											 commandhandler.run({sendmessage, args, event, api,prefix,config ,userInfo,approvedID});

			} else if (event.type === 'event') {
				switch (event.logMessageType) {
					case 'log:subscribe':
											 greetjoin.run({event, api });
												break;
					case 'log:unsubscribe':
						break;
					default:
						break;
				}
			}
		});
	},
};
