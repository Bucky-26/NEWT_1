const axios = require("axios");
const fs = require("fs");
const { Leopard } = require("@picovoice/leopard-node");

module.exports = {
  config: {
    name: "bard",
    credits: "1SOY DEV",
    prefix: true,
    description: "use google bard ai",
    usage: `bard <question here> \n\nNote: To Send Image to bard ai just reply to the image you want to send`,
    permission: 0,
    commandCategory: "AI",
  },
  run: async function ({ api, event, args }) {
   
    try {
			const userId = event.senderID;
			let question = args.join(" ");

			
      var options = {
        method: "GET",
        url: "https://api-bard.easy0.repl.co/api/bard",
        params: { message:question , url: "", userID: userId, api: "ISOYXD" },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        },
      };
      switch (event.type) {
        case "message_reply":
					
					
					if (event.messageReply.attachments && event.messageReply.attachments.length > 0) {

						for (const attachment of event.messageReply.attachments) { //1
       switch(attachment.type){
				 case "photo":
  					let imagelink = attachment.url;
					 options.params.url = imagelink ;
					 break;
			 
							
						}//1 
						}			
						
						}else{ }//1
					
					break;
					
      }
      
        
       
          

      axios.request(options).then(function (response) {

			
			
			
			})
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {}
  },
};
