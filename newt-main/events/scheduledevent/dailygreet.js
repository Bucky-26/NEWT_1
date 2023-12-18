const schedule = require('node-schedule'); 
const path = require(`path`)
const moment = require('moment-timezone');
module.exports = {
	run: async function ({ api, event,approvedID,config }) {
		const count = approvedID.length;
		console.log(count);
		const greetings = {
			morning: 'Good morning, everyone!',
			noon: "It's noon now!",
			afternoon: 'Good afternoon, folks!',
			evening: 'Good evening to all!',
			midnight: "It's midnight, time to rest!"
		};

		const manilaTimeZone = 'Asia/Manila';

		const morningRule = new schedule.RecurrenceRule();
		morningRule.hour = 4; 
		morningRule.minute = 0;

		const noonRule = new schedule.RecurrenceRule();
		noonRule.hour = 12; 
		noonRule.minute = 0;

		const afternoonRule = new schedule.RecurrenceRule();
		afternoonRule.second = 1;

		const eveningRule = new schedule.RecurrenceRule();
		eveningRule.hour = 20; 
		eveningRule.minute = 0;

		const midnightRule = new schedule.RecurrenceRule();
		midnightRule.hour = 24;

		try {
			const groupThreadIDs = await getGroupThreadIDs(api);

			if (groupThreadIDs.length > 0) {
				schedule.scheduleJob(morningRule, () => sendGreetings(api, groupThreadIDs, greetings.morning));
				schedule.scheduleJob(noonRule, () => sendGreetings(api, groupThreadIDs, greetings.noon));
				schedule.scheduleJob(eveningRule, () => sendGreetings(api, groupThreadIDs, greetings.evening));
				schedule.scheduleJob(midnightRule, () => sendGreetings(api, groupThreadIDs, greetings.midnight));

			}
		} catch (error) {
			console.error('Error during processing:', error);
		}


async function getGroupThreadIDs(api) {
	return new Promise((resolve, reject) => {
		api.getThreadList(count, null, ['INBOX'], (err, threadList) => {
			if (err) {
				reject(err);
			} else {
				const groupThreads = threadList.filter(thread => thread.isGroup);
				const groupThreadIDs = groupThreads.map(thread => thread.threadID);
				resolve(groupThreadIDs);
			}
		});
	});
}

function sendGreetings(api, threadIDs, message) {
	threadIDs.forEach(threadID => {
		api.sendMessage(message, threadID, (err, messageInfo) => {
			if (err) {
				console.error(`Error sending message to thread ${threadID}:`, err);
			} else {
				console.log(`Sent greeting to thread ${threadID}: ${message}`);
			}
		});
	});
}
			},
		};

