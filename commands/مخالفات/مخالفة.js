const { Message, MessageEmbed } = require("discord.js");
const client = require("./../../index.js")
 const {lspd,idchannel} = require("./../../config.json")
 const mdt = lspd;




const prefix = '=';
module.exports = {
    name: "مخالفة",
    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const m = message
        const user = message.mentions.users.first()
        
        const offer1 = await message.content.replace(/#مخالفة <@[^>]+>/g, "").split("").filter((element) => {
        return isNaN(parseInt(element))
      }).join("")
       
        let the_numbers = await message.content.replace(/<@[^>]+>/g, "").split("").filter((element) => {
        return !isNaN(parseInt(element))
      }).join("")
        
        if(!message.member.roles.cache.has(mdt)) return;
            if(!user) return ;
        if(!the_numbers) return m.reply(`لم اتعرف على سعر المخالفه | :x:`)
         if(!offer1) return m.reply(`الرجاء يكون سبب للمخالفه | :x:`)
        const db = require("../../models/m5")
       
        
      
        const id = Math.floor(Math.random() * 1000000) + 7271
      const channel = message.client.channels.cache.get(idchannel)        
          user.send({embeds:[
            new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`
           المخالفه : ${offer1}
           المعرف : ${id}
    كم مضى على المخالفه : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
   سعر المخالفه :  ${the_numbers}
                      في حال سدادها راجع تذاكر المرور 
            `)
        ]}).then((m)=>{message.reply(`تمت مخالفه الشخص المعرف الخاص بالمخالفه : ${id}`)}).catch((m) => {message.reply(`لن يتم ارسال الرساله خاص بل ارسالها في الروم المحدد ، تمت مخالفه الشخص فاالنظام`)
                                                                 channel.send({embeds: [
                               new MessageEmbed()
                               .setTitle("مخالفه عامه (اي الخاص مقفل نرجو منك فتح الخاص)")
                               .setDescription(`
        المخالفه وسعرها : ${offer1} 
        رقم المخالفه : ||${id}||
        المخالف : ${user}
         كم مضى على المخالفه : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
    ${the_numbers}
    سعر المخالفه :  ${the_numbers}
        في حال بغيت تسددها راجع تكت التسديد في نفس الكاتجوري
                               `)
                               
                           ]})
                                                                        })
            
       db.create({
            userId: message.author.id, 
           guildId: message.guild.id,
  offer: offer1,
    idoffer: id,
    timestamp: Date.now(),
    userm: user.id,
           s3r: the_numbers
           
        })

      

        
        
    },
};