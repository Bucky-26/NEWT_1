const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "grammarly" ,
     credits:"1SOY DEV",
     usage:`grammary sentence`,
    usePrefix: true,
    description: "Use grammarly On facebook",
    permission: 0,  /// 0 and 1
    commandCategory:"Education",

  },
  run: async function({ api, event, args, commandModules }) {
 const sentence = args.join(" ");
try{
   if (!sentence) {
      api.sendMessage('Please Provide A Sentence', event.threadID, event.messageID); 
  } else {
      const res = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/grammar?text=${sentence}`);
      const corrections = res.data.corrections;
      
      if (corrections && corrections.length > 0) {
          const correctionMessage = corrections[1].message;
          const replacements = corrections[0].replacements.map(rep => rep.value).join(', ');
          const correctedText = res.data.correctedText;
          
          const responseMessage = `𝙈𝙚𝙨𝙨𝙖𝙜𝙚: ${correctionMessage}\n\n𝘾𝙤𝙧𝙧𝙚𝙘𝙩𝙚𝙙 𝙏𝙚𝙭𝙩: ${correctedText}`;
          
          api.sendMessage(responseMessage, event.threadID, event.messageID);
      } else {
          api.sendMessage('No grammar corrections found.', event.threadID, event.messageID);
}
   }
}
catch(error){
  console.log(error);
}

 
  },////////////////
};
