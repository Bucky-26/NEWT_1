const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
    config: {
        name: "g2",
        usePrefix: true,
        description: "Get the large preview URL of a replied photo",
        permission: 0,
    },
    run: async function ({ api, event, args }) {
        try {
            const message = args.join(' ');

            if (event.type === 'message' && event.attachments) {
                for (const attachment of event.attachments) {
                    if (attachment.type === 'file') {
                        const filePath = await downloadAndSaveFile(attachment.url, attachment.filename);
                        if (filePath) {
                            await api.sendMessage(`File saved successfully: ${path.basename(filePath)}`, event.threadID);
                        } else {
                            console.error(`Error saving file.`);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(`Error receiving message: ${error.message}`);
        }
    },
};

// Example function to download and save a file
const downloadAndSaveFile = async (url, filename) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
        });

        const fileExtension = path.extname(filename).toLowerCase();
        const cacheFolder = path.join(__dirname, 'cache');
        await fs.mkdir(cacheFolder, { recursive: true });

        const uniqueFilename = `${Date.now()}${Math.floor(Math.random() * 1000)}${fileExtension}`;
        const filePath = path.join(cacheFolder, uniqueFilename);

        await fs.writeFile(filePath, Buffer.from(response.data));

        console.log(`File saved to: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error(`Error downloading file: ${error.message}`);
        return null;
    }
};
