const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
    config: {
        name: "file",
        usePrefix: true,
        description: "Get the large preview URL of a replied photo",
        permission: 0,
    },
    run: async function ({ api, event }) {
        if (event.type === "message_reply") {
            const replyMessage = event.body;
            const originalMessage = event.messageReply.body;

            if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {
                console.log("Attachments found in the message reply:");
                for (const attachment of event.messageReply.attachments) {
                    const largePreviewUrl = attachment.url;
                    const filename = attachment.filename;
                    api.sendMessage(largePreviewUrl, event.threadID);

                    try {
                        const response = await axios.get(largePreviewUrl, { responseType: 'arraybuffer' });
                        await fs.ensureDir('cache'); // Ensure the directory exists
                        await fs.writeFile('cache/test.pdf', response.data, 'binary');
                        console.log(`File saved: cache/test.pdf`);
                    } catch (error) {
                        console.error(`Error saving file: ${error.message}`);
                    }
                }
            } else {
                console.log("No attachments found in the message reply");
            }
        }
    }
};
