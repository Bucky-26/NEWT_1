const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "neko" ,
		credits:"1SOY DEV",
		usePrefix: true,
		description: "Random [Hentai] Image",
		usage:`ass`,
		permission: 1, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"SFW",

	},
	run: async function({ api, event, args, commandModules,prefix }) {

try{
 const res = await axios.get(`https://api.easy-api.online/api/sfw/neko`);
	const data = res.data.image;
	const ass = (await axios.get(data,{ responseType: 'arraybuffer'})).data;
fs.writeFileSync('cache/neko.jpg', Buffer.from(ass, 'binary'));


		api.sendMessage( {
			body:'neko',
			attachment: fs.createReadStream('cache/neko.jpg') 
		},event.threadID,event.messageID);
}
catch(error){
		console.log(error);
}



	},////////////////
};
