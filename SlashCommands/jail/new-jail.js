const db = require("./../../models/jail-lspd");
const { MessageEmbed } = require("discord.js");
const db1 = require("./../../models/haw");
const ms = require("ms")
const { lspd } = require("./../../config.json")
module.exports = {
  name: "new-jailbird",
  description: "اضافه سجل امني مع مده للسجن",
  options: [
    {
      name: "haw",
      description: "هويه الشخص",
      type: "NUMBER",
      required: true,
    },
    {
      name: "reason",
      description: "الادانه المثبته",
      type: "STRING",
      required: true,
    },
    {
      name: "time",
      description: "(1m = شهر) (1h = سنه) مده المحكوميه",
      type: "STRING",
      required: true,
    }
  ],
  run: async (client, interaction) => {
    const haw = interaction.options.getNumber("haw");
    const reason = interaction.options.getString("reason")
    const time = interaction.options.getString("time")
     const id = Math.floor(Math.random() * 1000000) + 7271
    if(!interaction.member.roles.cache.has(lspd)) return;
    if(isNaN(haw)) return interaction.followUp("الهويه ليست ارقام | :x:")
  const time1 = ms(time)
    if(!time1) return interaction.followUp("الوقت غير صحيح | :x:")
    const data1 = await db1.findOne({haw: haw})
    if(!data1) return interaction.followUp("لم اجد على هذه الهويه | :x:")
    if(data1) {
      db.create({
         haw: data1.haw,
          userId: data1.user,
          by: interaction.user.id,
          reason: reason,
          time: time1,
          condition: "قيد تنفيذ المحكوميه",
        id: id,
      })
      interaction.followUp("تم اضافه سجل امني | :white_check_mark: ")
      setTimeout(async() => {
        data = await db.findOne({haw: data1.haw, reason: reason})
        if(data) {
          if(data.condition === "تم الانتهاء من المحكوميه") return;
          data.condition = "تم الانتهاء من المحكوميه",
            data.save();
         
          interaction.guild.members.cache.get(data.userId).send({
            embeds: [
              new MessageEmbed()
              .setColor("BLUE")
              .setTitle("تم انتهاء مده المحكوميه")
              .setDescription(`
              - سبب | ${data.reason}
              `)
            ]
          })
        }
      }, time1)
    }
  }
}