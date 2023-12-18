const axios = require("axios");

module.exports = {
	config: {
		name: "email",
		usePrefix: true,
		description: "Send an email using the Easy API",
		permission: 0,  // 0: all users, 1: admin, 2: dev
		credits: "OPERATOR ISOY",
		commandCategory: "template",
		usages: "<receiver_email> <email_text>",
		cooldowns: 5,
	},
	run: async function ({ api, event, args, commandModules }) {
		if (args.length < 2) {
			api.sendMessage("Usage: -sendemail <receiver_email> <email_text>", event.threadID, event.messageID);
			return;
		}

		const receiverEmail = args[0];
		const emailText = args.slice(1).join(" ");

		try {
			const response = await axios.post('https://api.easy0.repl.co/v1/email-send', {
				receiver: receiverEmail,
				text: emailText,
			});

			console.log('Email sent:', response.data);
			api.sendMessage('Email sent successfully!', event.threadID, event.messageID);
		} catch (error) {
			console.error('Error sending email:', error.message);
			api.sendMessage('Error sending email. Please try again later.', event.threadID, event.messageID);
		}
	},
};
