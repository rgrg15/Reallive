const db = require("./../../models/haw")
const { MessageEmbed } = require("discord.js")
const { lspd } = require("./../../config.json")
module.exports = { 
    name: "finger-print",
    run: async(client,message,args) => {


const ar = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args.slice(1).join(" ")) 
        if(!message.member.roles.cache.has(lspd)) return;
if(!ar) return message.reply("نرجوا منك منشن الشخص لكي التعرف عليه | :x:")
  db.findOne({user: ar.id}, async(err,data)=> {
        if(err) throw err;
    
        if(data) {
const users = message.guild.members.cache.get(data.user)
            const embed = new MessageEmbed()
           .setTitle(" Identity Card : ")
.setDescription(`**
- Name : ${data.name}
- Sex : ${data.sex}
- Dirth Of Birth : ${data.snh}
- Nationality : ${data.mylad}
- ID Number : ${data.haw}
- mention : ${users}
- condition : ${data.condition}
- Image : 
**`)
            .setColor("BLUE")
            .setImage(data.url)
            .setFooter(`الاحوال المدنيه ، طلب من : ${message.author.tag}`)
            message.channel.send({
                embeds:[embed]
            })
        }  else {
            message.reply({
                embeds:[
                    new MessageEmbed()
                    .setTitle("Erorr | :x:")
                    .setDescription(`**__ لم اجد هويه  __**`)
                    .setColor("RED")
                ]
            })
        }
    })
 }
}