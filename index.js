const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('ping:'+`${client.ws.ping}ms`);
}).listen(3000);

const { Client, Intents } = require('discord.js');
require("dotenv").config();
const Chat = require("clever-chat");

const options = {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
};
const client = new Client(options);

client.once("ready", async () =>{

    let stats = 0; 
    setInterval(() => {
        if (stats == 0){
           client.user.setActivity('Created by Taka005#6668', {
             type: 'PLAYING'
           });      
           stats = 1;
        } else if (stats == 1){
           client.user.setActivity(`ping:${client.ws.ping}ms`, {
             type: 'PLAYING'
           });
           stats = 2;
        } else if (stats == 2){
           client.user.setActivity(`ver:2.0.0`, {
             type: 'PLAYING'
           });
           stats = 0; 
        }
    }, 8000)
    //console.log
    console.log(`CLIENT:READY! USER:${client.user.tag}`); 
    console.log(`CLIENT:<${client.guilds.cache.size}>SERVER`)
});

client.on('messageCreate', async (message) =>{
  if(message.channel.id === "969826637094993932"){
    const chat = new Chat({
        name: "チャットBOT",
        gender: "男",
        age: "18",
        developer_name: "Taka005",
        user: `${message.author.id}`,
        language: "ja",
        birthplace: "日本",
        birthday: "4月9日",
        religion: "仏教",
        actor: "マツコデラックス",
        book: "六法全書",
        color: "赤",
        season: "夏",
        sport: "野球",
        state: "元気",
        email: "support@taka.ml"
    });

    console.log(`MESSAGE:(`+message.author.tag+`)`+message.content+` [PING:${client.ws.ping}ms`);

    if(!message.channel.type === 'GUILD_TEXT' || message.author.bot ) return;  
    message.channel.sendTyping()
      
    chat.chat(`${message.content}`)
      .then(reply =>{
        message.channel.send(`${reply}`);
      })

    }
});

client.login(process.env.TOKEN)
   .then(()=> console.log("CLIENT:ログインに成功しました"))
   .catch(() => console.log("ERROR:ログインに失敗しました"))

//エラー回避
process.on('uncaughtException', (error) => {
  return console.log(error);
});

process.on('unhandledRejection', (error) => {
  return console.log(error)
});