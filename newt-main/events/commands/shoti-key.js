const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "shoti-key" ,
    usePrefix: true,
    description: "SHOTI API KEY GENERATOR",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
    credits: "OPERATOR ISOY",
    description: "",
    commandCategory: "API KEY",
    usages: "",
	cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {
  const user = args.join(" ");
  if(!user){
        api.sendMessage('please provide username',event.threadID,event.messageID);
return false
  }
try{
    var options = {
  method: 'POST',
  url: 'https://your-shoti-api.vercel.app/api/createkey',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/8.5.1',
    Referer: 'https://your-shoti.vercel.app/'
  },
  data: {username: user}
};

axios.request(options).then(function (response) {
  console.log(response.data);
    api.sendMessage(`Your Shoti API KEY is '${response.data.apikey}'`,event.threadID,event.messageID);

}).catch(function (error) {
  console.error(error);
});

}
catch(error){
  console.log(error);
}

  },
};
