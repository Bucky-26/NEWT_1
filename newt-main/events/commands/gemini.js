const axios = require("axios");

module.exports = {
  config: {
    name: "gemini",
    usePrefix: false,
    description: "Get the URLs of the first two images when the user replies to an image.",
    permission: 0,  // 0 for all users, 1 for admin, 2 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "template",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    const geminiApiUrl = "https://gemini.easy0.xyz/v1/completion"; // Replace with your actual Gemini API URL

    try {
      const text = args.join(" ");
      if (!text) {
        return api.sendMessage("Please provide a question or query", event.threadID, event.messageID);
      }

      let imageBase64Array = [];

      if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
        const attachments = event.messageReply.attachments;

        imageBase64Array = attachments.map(async (attachment) => {
          if (attachment.type === "photo" || attachment.type === "animated_image" || attachment.type === "video") {
            // Convert the image to base64 (you might need to use a library like fs.promises to read the file)
            const imageData = await someFunctionToConvertImageToBase64(attachment.url);
            return imageData;
          }
        }).filter(Boolean);
      }

      // Send the base64-encoded images to the Gemini API
      const response = await axios.post(geminiApiUrl, {
        prompt: text,
        imageBase64Array: await Promise.all(imageBase64Array),
      });

      const data = response.data.content;

      api.sendMessage(data, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing the command.", event.threadID);
    }
  },
};

// Example function to convert an image URL to base64 (you may need to use a library like fs.promises)
async function someFunctionToConvertImageToBase64(imageUrl) {
  // Implement logic to convert image to base64
  // Example using axios and Node.js Buffer:
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageData = Buffer.from(response.data).toString('base64');
  return imageData;
}
