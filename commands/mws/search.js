const db = require("./../../models/haw")
const { MessageEmbed, MessageActionRow, MessageButton, TextInputCompnent, Modal } = require("discord.js")
const {mwsManger,mws,lspd} = require("./../../config.json")
module.exports = {
  name: "mws", 
  run: async(client, message, args) => {
    const m = message;
    const b =  new MessageButton()
      .setCustomId("search01")
      .setLabel("للبحث على شخص بالاسم")
      .setStyle("SECONDARY")
    const row = new MessageActionRow().addComponents(b)
    if(!m.member.roles.cache.has(mwsManger)) return
    m.channel.send({
      embeds: [
        new MessageEmbed()
        .setTitle("**البحث على شخص بالاسم لاستخدام صلاحيات المعارض**")
        .setDescription(`- اضغط على الزر للبحث على شخص`)
        .setColor("RED")
      ],
      components: [row]
    })
  }
}