const schedule = require('node-schedule');
const moment = require('moment-timezone');

module.exports = {
	run: async function ({ api, event }) {
		// Define your greetings
		const greetings = {
			morning: 'Good morning, everyone!',
			noon: "It's noon now!",
			afternoon: 'Good afternoon, folks!',
			evening: 'Good evening to all!',
			midnight: "It's midnight, time to rest!"
		};

		// Define the Manila time zone
		const manilaTimeZone = 'Asia/Manila';

		// Create schedule rules for each time of day
		const morningRule = new schedule.RecurrenceRule();
		morningRule.hour = 4; // 4 AM
		morningRule.minute = 0;

		const noonRule = new schedule.RecurrenceRule();
		noonRule.hour = 12; // 12 PM
		noonRule.minute = 0;

		const afternoonRule = new schedule.RecurrenceRule();
		afternoonRule.hour = 17; // 5 PM
		afternoonRule.minute = 0;

		const eveningRule = new schedule.RecurrenceRule();
		eveningRule.hour = 20; // 8 PM
		eveningRule.minute = 0;

		const midnightRule = new schedule.RecurrenceRule();
		midnightRule.hour = 0; // 12 AM (midnight)
		midnightRule.minute = 0;

		// Schedule the greetings
		schedule.scheduleJob(morningRule, () => sendGreeting(api, event.threadID, greetings.morning));
		schedule.scheduleJob(noonRule, () => sendGreeting(api, event.threadID, greetings.noon));
		schedule.scheduleJob(afternoonRule, () => sendGreeting(api, event.threadID, greetings.afternoon));
		schedule.scheduleJob(eveningRule, () => sendGreeting(api, event.threadID, greetings.evening));
		schedule.scheduleJob(midnightRule, () => sendGreeting(api, event.threadID, greetings.midnight));
	},
};

function sendGreeting(api, threadID, message) {
	api.sendMessage(message, threadID, (err, messageInfo) => {
		if (err) {
			console.error(`Error sending message:`, err);
		} else {
			console.log(`Sent greeting: ${message}`);
		}
	});
}
