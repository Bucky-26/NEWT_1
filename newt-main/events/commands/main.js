const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "mm" ,
    usePrefix: true,
    description: "Enable or Disable Mainenance Mode",
    permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
    // Other configuration properties
    commandCategory:"Utility",
  },
  run: async function({ api, event, args, commandModules,config,threadlist,approvedID,fontbold }) {
		const message=`System Notif\n🚧Maintenance mode is\n-enabled🚧\nTo make some improvement. To serve you better!!\nThe ${fontbold("Developer")} can only use the command.\n${fontbold("Sorry For Incovineince..")}`;
   
try{
  switch(args.join(" ")){
    case "on":
   config.maintenance.enable = true;
   fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error writing to config.json:', err);
      }
    });
					 approvedID.forEach(approved => {
api.sendMessage(message,approved)
          .then(() => {
              successfulThreadCount++;
          })
          .catch(error => {
              console.error(`Error sending message to thread ${approved}: ${error}`);
          });
      });
    
break;
    case "off":
 config.maintenance.enable = false;
       fs.writeFile('config.json', JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error writing to config.json:', err);
      }
    });
				 approvedID.forEach(approved => {
			api.sendMessage('The Maintenance is over You Can Use The Bot Again',approved)
								.then(() => {
										successfulThreadCount++;
								})
								.catch(error => {
										console.error(`Error sending message to thread ${approved}: ${error}`);
								});
						});
      break;
      
  }
}
catch(error){
  console.log(error);
}

    
  },////////////////
};
