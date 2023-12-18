const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "fbp" ,
		usePrefix: true,
		description: "An example command",
		permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "Utility",
		usages: "",
	cooldowns: 5,
	},
	run: async function({ api, event, args, commandModules }) {
		const { threadID, messageID, attachments, body } = event;
		const uuid = getGUID();
		const botID = api.getCurrentUserID();

		const formData = {
			"input": {
				"composer_entry_point": "inline_composer",
				"composer_source_surface": "timeline",
				"idempotence_token": uuid + "_FEED",
				"source": "WWW",
				"attachments": [],
				"audience": {
					"privacy": {
						"allow": [],
						"base_state": "FRIENDS", // SELF EVERYONE
						"deny": [],
						"tag_expansion_state": "UNSPECIFIED"
					}
				},
				"message": {
					"ranges": [],
					"text": ""
				},
				"with_tags_ids": [],
				"inline_activities": [],
				"explicit_place_id": "0",
				"text_format_preset_id": "0",
				"logging": {
					"composer_session_id": uuid
				},
				"tracking": [
					null
				],
				"actor_id": api.getCurrentUserID(),
				"client_mutation_id": Math.floor(Math.random() * 17)
			},
			"displayCommentsFeedbackContext": null,
			"displayCommentsContextEnableComment": null,
			"displayCommentsContextIsAdPreview": null,
			"displayCommentsContextIsAggregatedShare": null,
			"displayCommentsContextIsStorySet": null,
			"feedLocation": "TIMELINE",
			"feedbackSource": 0,
			"focusCommentID": null,
			"gridMediaWidth": 230,
			"groupID": null,
			"scale": 3,
			"privacySelectorRenderLocation": "COMET_STREAM",
			"renderLocation": "timeline",
			"useDefaultActor": false,
			"inviteShortLinkKey": null,
			"isFeed": false,
			"isFundraiser": false,
			"isFunFactPost": false,
			"isGroup": false,
			"isTimeline": true,
			"isSocialLearning": false,
			"isPageNewsFeed": false,
			"isProfileReviews": false,
			"isWorkSharedDraft": false,
			"UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
			"hashtag": null,
			"canUserManageOffers": false
		};
try{
 const  text = args.join(" ");
	const p = `-Automated Post(Using Command)\n\nContent:\n${text}\n\nPowered By: NEWT AI || EAZY TECH API(DEV ISOY)`;
	 const data = formData.input.message.text = p;
	const form = {
		av: botID,
		fb_api_req_friendly_name: "ComposerStoryCreateMutation",
		fb_api_caller_class: "RelayModern",
		doc_id: "7711610262190099",
		variables: JSON.stringify(formData)
	};
	////
	if (event.type === "message_reply") {
		const a = event.messageReply.attachments
		async function uploadAttachments(a) {
			let uploads = [];
			for (const attachment of attachments) {
				const form = {
					file: attachment			
				};
				uploads.push(api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form));
			}
			uploads = await Promise.all(uploads);
			return uploads;
		}
		
		const allStreamFile = [];
		if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {

		for (const attachment of event.messageReply.attachments) {
			
			if (attachment.type === "photo") {
				const getFile = (await axios.get(attach.url, { responseType: "arraybuffer" })).data;
				fs.writeFileSync(__dirname + `/cache/imagePost.png`, Buffer.from(getFile));
				allStreamFile.push(fs.createReadStream(__dirname + `/cache/imagePost.png`));
			} else if (attachment.type === "video") {
				const videoFile = await axios.get(attach.url, { responseType: "stream" });
				const videoPath = __dirname + `/cache/videoPost.mp4`;
				videoFile.data.pipe(fs.createWriteStream(videoPath));
				allStreamFile.push(fs.createReadStream(videoPath));
			}
		}
		const uploadFiles = await uploadAttachments(allStreamFile);
		for (let result of uploadFiles) {
			if (typeof result == "string") result = JSON.parse(result.replace("for (;;);", ""));

			if (result.payload && result.payload.fbid) {
				formData.input.attachments.push({
					"photo": {
						"id": result.payload.fbid.toString(),
					}
				});
				console.log(result.payload.fbid.toString());
			} 
		}
		}
	}
	//
	api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
		try {
			if (e) throw e;
			if (typeof info == "string") info = JSON.parse(info.replace("for (;;);", ""));
			const postID = info.data.story_create.story.legacy_story_hideable_id;
			const urlPost = info.data.story_create.story.url;
			if (!postID) throw info.errors;
			try {
				fs.unlinkSync(__dirname + "/cache/imagePost.png");
				fs.unlinkSync(__dirname + "/cache/videoPost.mp4");
			} catch (e) {}
			return api.sendMessage(`» Post created successfully\n» postID: ${postID}\n» urlPost: ${urlPost}`, threadID, messageID);
		} catch (e) {

			return api.sendMessage(e, threadID, messageID);
		}

		
	});
}
catch(error){
	console.log(error);
}

	},
};
function getGUID() {
	var sectionLength = Date.now();
	var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = Math.floor((sectionLength + Math.random() * 16) % 16);
		sectionLength = Math.floor(sectionLength / 16);
		var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
		return _guid;
	});
	return id;
}
