const db = require("./../../models/jail-lspd");
const { MessageEmbed } = require("discord.js");
const db1 = require("./../../models/haw");
const db2 = require("./../../models/m5")
const ms = require("ms")
const { highcommand } = require("./../../config.json")
module.exports = {
  name: "delete",
  description: "لمسح القضيه نهائيا ",
  options :[
    {
      name: "input",
      description: "all / رقم السجن",
      type: "STRING",
      required: true,
    },
  ],
  run: async(client,interaction) => {
    if(interaction.replied) return;
     const input = interaction.options.getString("input")
    if(!interaction.member.permissions.has(highcommand)) return;
    if(input === "all") {
   db.findOneAndDelete({guildId: interaction.guild.id}, async (err,data) => {
     if(err) throw err;
     if(data) {
       interaction.followUp({content: `> **تم مسح جميع السجنات**`})
     } else {
       interaction.followUp({content: `> **لا يوجد سجنات**`})
     }
   })
    } else {
      if(isNaN(input)) return interaction.reply({content: `> **يجب ان يكون ارقام **`})
      db.findOneAndDelete({guildId: interaction.guild.id, id: input}, async (err,data) => {
         if(err) throw err;
         if(data) {
           interaction.followUp({content: `> **تم مسح السجن**`})
         } else {
           interaction.followUp({content: `> **لا يوجد سجن**`})
         }
       })
    }
  }
}