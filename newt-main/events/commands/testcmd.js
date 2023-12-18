const { spawn } = require('child_process');

module.exports = {
	config: {
		name: "restart",
		usePrefix: true,
		description: "Restart the script using nodemon",
			permission: 1, // 3 for dev
		credits: "OPERATOR ISOY",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
	},
	run: function({ event,api }) {
		const script = spawn('npm', ['restart'], { detached: true, stdio: 'ignore' });

		script.unref();

		// Send a message indicating the script is restarting.
		api.sendMessage('Restarting the script...', event.threadID, event.messageID);

		// Exit the current instance of the script.
		process.exit(0);
	},
};
