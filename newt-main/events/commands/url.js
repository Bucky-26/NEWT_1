module.exports = {
    config: {
        name: "getphotourl",
        usePrefix: true,
        description: "Get the large preview URL of a replied photo",
        permission: 0,
    },
    run: async function({ api, event }) {
        if (event.type === "message_reply") {
            const repliedMessage = event.messageReply;
            if (repliedMessage.attachments && repliedMessage.attachments.length > 0) {
                const repliedAttachment = repliedMessage.attachments[0];
                if (repliedAttachment.type === "photo" && repliedAttachment.url) {
                    api.sendMessage(`Large Preview URL: ${repliedAttachment.largePreviewUrl}`, event.threadID);
                } else {
                    api.sendMessage("The replied message is not a photo or does not have a large preview URL.", event.threadID);
                }
            } else {
                api.sendMessage("The replied message does not have any attachments.", event.threadID);
            }
        } else {
            api.sendMessage("Please reply to a message with a photo attachment.", event.threadID);
        }
    }
};
