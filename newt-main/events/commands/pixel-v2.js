const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "pixelv2",
    usePrefix: true,
    credits: "1SOY DEV",
    usage: "imgsearch query",
    description: "Search for an image on Google",
    permission: 0,
    // Other configuration properties
    commandCategory: "Image Search",
  },
  run: async function ({ api, event, args, commandModules }) {
    const query = args.join(" ");

    async function performImageSearch() {
      try {
        if (!query) {
          throw new Error("Please provide a query.");
        }

        api.sendMessage(
          "Searching Image🔍, Please Wait.....",
          event.threadID,
          event.senderID
        );

        const res = await axios.get(
          `https://api.easy0.repl.co/v2/pixel?q=${query}`
        );
        const imgData = res.data.data;

        if (imgData.length === 0) {
          throw new Error(`No image results found for "${query}"`);
        }

        const randomIndices = getRandomIndices(
          imgData.length,
          Math.min(10, imgData.length)
        );
        const attachments = [];

        for (let i = 0; i < randomIndices.length; i++) {
          const index = randomIndices[i];
          const imgInfo = imgData[index];

          try {
            // Choose the size you want (e.g., "original", "large", "medium", etc.)
            const imageUrl = imgInfo.original;

            const imageResponse = await axios.get(imageUrl, {
              responseType: "arraybuffer",
            });

            // Generate a unique filename for each image
            const imagePath = path.join(
              __dirname,
              `cache`,
              `imgsearch_${i}.png`
            );
            fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
            attachments.push(fs.createReadStream(imagePath));
          } catch (error) {
            console.log(error);
            api.sendMessage(
              error.message || "Error loading image",
              event.threadID,
              event.messageID
            );
          }
        }

        api.sendMessage(
          {
            body: `This is the 10 random Image Result \nTotal Result of ${imgData.length}`,
            attachment: attachments,
          },
          event.threadID,
          event.messageID
        );
      } catch (error) {
        api.sendMessage(
          error.message || "Error during image search",
          event.threadID,
          event.messageID
        );
      }
    }

    performImageSearch();
  },
};

function getRandomIndices(max, count) {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = max - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}
