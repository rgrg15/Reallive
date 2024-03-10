const db = require("./../../models/r-syr")
const db1 = require("./../../models/r59h")
const { MessageEmbed, MessageActionRow, MessageButton, TextInputCompnent, Modal } = require("discord.js")
const {mwsManger,mws,lspd} = require("./../../config.json")

module.exports = {
  name: "search-license", 
  run: async(client, message, args) => { 
    if(!message.member.roles.cache.has(lspd)) return;
    const ar = message.content.split(' ').slice(1).join(' ')
    data12 = await db.findOne({lo7h: ar}) 
    if(data12) {
    const m5 = await db.find({
      user: data12.user,
    guildId: message.guild.id,
    });
  
    const embedsetDescription = m5.map((data) => {
    const userId = message.guild.members.cache.get(data.user)


    return [
      
      `${data.lo7h}-${data.no3}`
    

    ].join(",");
    })
   db.findOne({lo7h: ar}, async(err,data) => {
      if(err) throw err ;
      if(data) {
     
          const embed = new MessageEmbed()
          .setTitle("رخصه القياده")
          .setColor("YELLOW")
          .setDescription(`**
          الاسم : ${data.name}
          رقم الهوية : ${data.haw}
          رخص السير : ${embedsetDescription || "لايوجد"}
          **`)
          message.channel.send({
            embeds: [embed]
          })
          
        
        
        
      } else {
       message.reply({
         content: "لم اجد على رخصه سير "
       })
     }  
    })
    } else {
       message.reply({
         content: "لم اجد على رخصه سير "
       })
     }  
  }
}