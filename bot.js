const { Client} = require('discord.js');
const client = new Client();
const token = "";
var fs = require("fs");
var https = require('https');
client.login(token);
let iterator = 0;
client.on('ready', () => {
    console.log('I am ready!');
  });
  client.on('message', message => {
    if (message.content === '!img') {
        message.channel.messages.fetch()
            .then(messages =>{
              messages.forEach(element =>{
                var attachment = element.attachments.array();
                  attachment.forEach(value =>{
                  let string = value.url.substring(value.url.lastIndexOf("/")+1, value.url.length);
                  let file = fs.createWriteStream("images/"+ iterator + string);
                  iterator+=1;
                  let request = https.get(value.url, function(response) {
                  response.pipe(file);
                  });
                  fs.appendFile('input.txt', value.url + "\n", function(err) {
                    if (err) {
                       return console.error(err);
                    }
                });
                })
              })
            }
              )
        .catch(console.error);
    }
  });
