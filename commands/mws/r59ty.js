const db = require("./../../models/r-syr")
const db1 = require("./../../models/r59h")
const { MessageEmbed, MessageActionRow, MessageButton, TextInputCompnent, Modal } = require("discord.js")
const {mwsManger,mws,lspd} = require("./../../config.json")
module.exports = {
  name: "license", 
  run: async(client, message, args) => { 
    
   
  
    const m5 = await db.find({
      user: message.author.id,
    guildId: message.guild.id,
    });

    const embedsetDescription = m5.map((data) => {
    const userId = message.guild.members.cache.get(data.user)


    return [

      `${data.lo7h}-${data.no3}`


    ].join(",");
    }) 
    const m = m5.length 

   db1.findOne({ user: message.author.id }, async(err,data) => {
      if(err) throw err ;
      if(data) {

          const embed = new MessageEmbed()
          .setTitle("رخصه القياده")
          .setColor("YELLOW")
          .setDescription(`**
          الاسم : ${data.name}
          رقم الهوية : ${data.haw}
          رخص السير : ${embedsetDescription}
          **`)
          message.channel.send({
            embeds: [embed]
          })




      } else {
       message.reply({
         content: "لم اجد على رخصه قياده"
       })
     }  
    })
    
  }
}