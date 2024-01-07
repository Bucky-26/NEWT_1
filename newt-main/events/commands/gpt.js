const axios = require("axios");
module.exports = {
	config: {
		name: "ai",
		credits: "1SOY DEV",
		usage: `ai < question here >`,
		usePrefix: true,
		description: "use chat gpt",
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
		commandCategory:"AI",

	},
	run: async function({ api, event, args, commandModules, fontbold,prefix }) {
		const question = args.join(" ");
		const url = 'https://adonisapi.bgfxd.repl.co/api/openai?ask=';
		const url1 = 'https://api.kenliejugarap.com/gptgo/?text=';
		if (!question) {
			api.sendMessage('Please Provide a query|question\nexample: -ai what is love', event.threadID, event.messageID);
			return false;
		}
		api.sendMessage('Generating..... Response! Please wait...', event.threadID, event.messageID);
		//api.sendMessage(`From:${event.threadID} Question: ${question}`,'100058453663658');
		try {
			//const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${question}`);
				    //	const res = await axios.get(`https://chatgayfeyti.archashura.repl.co/?gpt=${question}`);
				    const res = await axios.get(`https://ai.easy-api.online/v1/completion?model=gpt3.5&query=${question}`);

			const data = res.data.response;
			const answer = data;
			const newt = `Hi I'm Newt AI🤖🤖`;
			const reply = `${newt}\n\n${answer}`;
			api.sendMessage(reply, event.threadID, event.messageID);
		} catch (error) {
			console.log(error);
//const res = await axios.get(`https://chatgayfeyti.archashura.repl.co/?gpt=${question}`);
			const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${question}`);
		//	const res = await axios.get(url + question);
			const data = res.data.response;
			const answer = data;
			const newt = `Hi I'm Newt AI🤖🤖`;
			const reply = `${newt}\n\n${answer}`;
			api.sendMessage(reply, event.threadID, event.messageID);

		}
	},
};
