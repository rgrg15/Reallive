const db = require("./../../models/haw")
const { MessageEmbed } = require("discord.js")
const { lspd } = require("./../../config.json")
module.exports = { 
    name: "search-id",
    run: async(client,message,args) => {
const ar = message.content.split(' ').slice(1).join(" ")


    if(!message.member.roles.cache.has(lspd)) return;

  db.findOne({haw: ar}, async(err,data)=> {
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