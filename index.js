const dotenv= require('dotenv')
dotenv.config()
const aireponces= require('./Geimiai.js')

// GAtewayIntentBis kya hae to hote hae permisson ke liye 



const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [ // ese aap apne jisab se modify kar sakte hae ese hame pata chalta hae ki bot kya milga na chaiye 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, // ese me pata chatla hae message aaya sirf kya aya pata nahi this auto mazatio server par jisteme me message aaye ese pata caliye ese liye hot ahe 
    GatewayIntentBits.MessageContent    // ese pata chatal hae message kya aya         

  ] 
  
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate',async (messageinfo)=>{ // server koi message aaya jisem user me message ki you use andar aayega 
  const isBot = messageinfo.author.bot;  // sese                                                                                                             
  if(isBot) return ;    
  
  // console.log(messageinfo.content)
  const reponces = await aireponces(messageinfo.content)
  messageinfo.reply(`${messageinfo.author.globalName}:- ${reponces}`)// here gemini ingration 
})


client.login(process.env.TOKEN);

  // Discord me bot kya kar sakte hae use permision lene padti hae use liye bot permission ko serch kar use aap dek sakthae ho  and use ek number sho hoga  example administro 8 