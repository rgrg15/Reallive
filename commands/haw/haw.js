const db = require("./../../models/haw");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "identity", 
    run: async(client,message,args) => {
    
        db.findOne({user: message.author.id}, async(err,data)=> {
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
                message.channel.send({
                    embeds:[embed]
                })
            } else {
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

