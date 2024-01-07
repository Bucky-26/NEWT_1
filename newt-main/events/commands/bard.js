const axios = require("axios");
const fs = require("fs");
const { Leopard } = require("@picovoice/leopard-node");

module.exports = {
  config: {
    name: "bard",
    credits: "1SOY DEV",
    prefix: true,
    description: "use google bard ai",
    usage: `bard <question here>\n\nNote: To Send Image to bard ai just reply to the image you want to send`,
    permission: 0,
    commandCategory: "AI",
  },
  run: async function ({ api, event, args }) {
    const userId = event.senderID;
    const question = args.join(" ");

    try {
      if (!question) return api.sendMessage("ℹ️|Please Provide A question or query", event.threadID, event.messageID);

      api.sendMessage("Generating Response, Please Wait!", event.threadID, event.messageID);

      let res;

      if (event.type === "message_reply") {
        const { messageReply, attachments } = event;

        if (attachments && attachments.length > 0) {
          for (const attachment of attachments) {
            const { url, filename } = attachment;
            const data = await axios.get(url, { responseType: "arraybuffer" });

            fs.writeFileSync(`cache/${filename}.${attachment.type === "audio" ? "wav" : "jpg"}`, Buffer.from(data.data, "binary"));

            if (attachment.type === "audio") {
              const handle = new Leopard("0iFpdxmhvJKzPZ7M/gmGqXpLYm9WyHIZ4xVNUQAZvLKuN4YC/IeAiQ==");
              question += ` ${handle.processFile(`cache/${filename}.wav`).transcript}`;
            }
          }
        }
      }

      res = await axios.get(`https://bard.easy0.xyz/api/bard?message=${encodeURIComponent(question)}&id=${encodeURIComponent(userId)}&api=easy2023`);

      const { content: respond, images: imageUrls } = res.data;

      if (Array.isArray(imageUrls) && imageUrls.length > 0) {
        const attachments = await Promise.all(imageUrls.map(async (url, i) => {
          const imagePath = `cache/image${i + 1}.png`;

          try {
            const data = await axios.get(url, { responseType: "arraybuffer" });

            fs.writeFileSync(imagePath, Buffer.from(data.data));
            return fs.createReadStream(imagePath);
          } catch (error) {
            api.sendMessage("Error While Saving Image", event.threadID, event.messageID);
          }
        }));

        api.sendMessage({ body: `${respond}`, attachment: attachments }, event.threadID, event.messageID);
      } else {
        api.sendMessage(respond, event.threadID, event.messageID);
      }
    } catch (error) {
      api.sendMessage("An error occurred while processing your request", event.threadID, event.messageID);
      console.error(error);
    }
  },
};
