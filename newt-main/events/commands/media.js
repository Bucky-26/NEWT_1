const axios = require("axios");
const fs = require('fs');

module.exports = {
  config: {
    name: "dl",
    usePrefix: true,
    description: "Facebook, TikTok, and YouTube Downloader",
    permission: 0,  //// 0|1|2   - 0 all user  - 1 for admin and 3 for dev
    credits: "OPERATOR ISOY",
    commandCategory: "Download",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    const _url_tiktok = "https://api.easy-api.online/api/tiktok?url=";
    const _url_fb = "https://api.easy-api.online/v2/fbdl";
    const _url_yt = "https://api.easy-api.online/api/ytdl?url=";
    const _url = args.join(" ");

    try {
      const generateApiUrl = (url) => {
        const tiktokPattern = /^https:\/\/vt\.tiktok\.com\//;
        const facebookPattern = /^https:\/\/www\.facebook\.com\//;
        const fbWatchPattern = /^https:\/\/fb\.watch\//;
        const fbweb = /^https:\/\/web\.facebook\.com\//;
        const youtubePattern = /^https:\/\/youtu\.be\//;

        if (tiktokPattern.test(url)) {
          return `${_url_tiktok}${encodeURIComponent(url)}`;
        } else if (facebookPattern.test(url) || fbWatchPattern.test(url) ||fbweb.test(url)) {
          return _url_fb;
        } else if (youtubePattern.test(url)) {
          return `${_url_yt}${encodeURIComponent(url)}`;
        } else {
          return null;
        }
      };

      const apiUrl = generateApiUrl(_url);

      if (!apiUrl) {
        console.log("Invalid URL");
        return;
      }

      let download;

      if (apiUrl === _url_fb) {
        // Use POST request for fbdl
        download = await axios.post(apiUrl, { url: _url });
      } else {
        // Use GET request for other APIs
        download = await axios.get(apiUrl);
      }

      const vidurl = download.data.url;
      const vid = (await axios.get(vidurl, { responseType: 'arraybuffer' })).data;

      fs.writeFileSync('cache/dl.mp4', Buffer.from(vid, 'binary'));

      const mes = {
        body: `Video`,
        attachment: fs.createReadStream('cache/dl.mp4')
      };

      api.sendMessage(mes, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
    }
  },
};
