const { Client} = require('discord.js');
const client = new Client();
const token = "";
var fs = require("fs");
var https = require('https');
client.login(token);

client.on('ready', () => {
    console.log('I am ready!');
  });
  
  client.on('message', message => {
    // If the message is '!rip'
    if (message.content === '!img') {
        message.channel.messages.fetch({ limit: 20 })
            .then(messages =>{
              messages.forEach(element =>{
                var attachment = element.attachments.array();
                  attachment.forEach(value =>{
                  let string = value.url.substring(value.url.lastIndexOf("/")+1, value.url.length);
                  console.log(string);
                  let file = fs.createWriteStream("images/"+ string);
                  const request = https.get(value.url, function(response) {
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
