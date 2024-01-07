module.exports = {
    config: {
        name: "getphotourl",
        usePrefix: true,
        description: "Get the large preview URL of a replied photo",
        permission: 0,
    },
    run: async function({ api, event }) {
        
        
        
        			if (event.type === "message_reply") {
				
				const replyMessage = event.body;
				const originalMessage = event.messageReply.body;

				if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
					console.log("Attachments found in the message reply:");
					for (const attachment of event.messageReply.attachments) {
						if (attachment.type === "file") {
							const largePreviewUrl = attachment.url;
							const filename = attachment.filename;
						api.sendMessage(largePreviewUrl,event.threadID);

						
						}else{
						
						}
					}
				}else{
					

					}
				}
    }
};
