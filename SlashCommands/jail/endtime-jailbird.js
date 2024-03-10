const db = require("./../../models/jail-lspd");
const { MessageEmbed } = require("discord.js");
const db1 = require("./../../models/haw");
const db2 = require("./../../models/m5")
const ms = require("ms")
const { lspd, highcommand } = require("./../../config.json")
module.exports = {
  name: "endtime-jail",
  description: "لانهاء في السجل الاجرامي",
  options :[
    {
      name: "number",
      description: "رقم السجن في السجل الاجرامي",
      type: "NUMBER",
      required: true,
    },
  ],
  run: async(client,interaction) => {
if(!interaction.member.roles.cache.has(highcommand)) return;
    const reason = interaction.options.getNumber("number")
  data = await db.findOne({
    id: reason
  })
    if(!data) return interaction.followUp("لم اجد عبى هذه القضيه| :x:");
  
    if(data) {
      if(data.condition === "تم الانتهاء من المحكوميه") return interaction.followUp("هذه القضيه منتهيه من قبل | :x:")
      data.condition = "تم الانتهاء من المحكوميه";
      data.save();
      interaction.followUp('تم انهاء المحكوميه بنجاح | :white_check_mark: ')
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
  }
}