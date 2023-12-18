module.exports = {
	run: async function({ api, event }) {
		const addedUserID = event.logMessageData.addedParticipants[0].userFbId;
		const userInfo = await api.getUserInfo(addedUserID);
		const userName = userInfo[addedUserID].name;
		const threadInfo = await api.getThreadInfo(event.threadID);
		const groupName = threadInfo.name;

		const greet = `Hi ${userName}, Welcome To ${groupName}\nI hope you enjoy your stay here!!`;

		api.sendMessage(greet, event.threadID);
	},
};
