const db = require("./../../models/jail-lspd");
const { MessageEmbed } = require("discord.js");
const db1 = require("./../../models/haw");
const db2 = require("./../../models/m5")
const ms = require("ms")
const { lspd } = require("./../../config.json")
module.exports = {
  name: "criminal-record",
  description: "للبحث في السجل الاجرامي",
  options :[
    {
      name: "haw",
      description: "هويه الشخص ",
      type: "NUMBER",
      required: true,
    },
  ],
  run: async(client,interaction) => {
    const haw = interaction.options.getNumber("haw")
    if(!interaction.member.roles.cache.has(lspd)) return;
    data = await db1.findOne({
      haw: haw,
    })
    if(!data) return interaction.followUp("لم اجد على هذه الهويه | :x:");
    if(data) {
      const d1 = await db2.find({
        userm: data.user,
        guildId: interaction.guild.id,
      })
      const m5 = d1.map((data1) => {
              const userId = interaction.guild.members.cache.get(data1.userId)


          return [
              `الشخص الذي خالف: ${userId}`, 
              `رقم المخالفه   : ${data1.idoffer}, `, 
              `المخالفه : ${data1.offer}`, 
              `شخص المخالف لامر مروري : <@${data1.userm}> `,
              ` كم مضى على المخالفه : <t:${Math.floor((data1.timestamp - 50000) / 1000)}:R>`,
      `سعر المخالفه : ${data1.s3r}`,

           ].join("\n");
        
      })
      const d2 = await db.find({
        userId: data.user,
        guildId: interaction.guild.id,
      })
      const ag = d2.map((data2) => {
              const userId = interaction.guild.members.cache.get(data2.user)


          return [
    `- ${data2.reason}
الحاله : ${data2.condition} 
الوقت : ${data2.time}
الرقم : ${data2.id}

               `

           ].join("\n");

      })
      const embed = new MessageEmbed()
        .setTitle("السجل الامني :")
        .setDescription(`
- الاسم : ${data.name} .
**__السجل :__**
${ag.join("\n")}
**__ المخالفات المثبته __** : 
${m5.join("\n")}
        `).setColor("DARK_BLUE")
        interaction.followUp({
          embeds: [embed]
        })
    } 
  }
}