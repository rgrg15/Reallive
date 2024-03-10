const db = require("./../models/haw")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { Modal, TextInputComponent } = require("discord.js")
const {mwsManger,mws} = require("./../config.json")
const client = require("./../index")
client.on("interactionCreate", async(inter) => {
  if(inter.isButton()) {
    if(inter.customId == "search01") {
      const t1 = new TextInputComponent() 
                .setCustomId('asm')
                .setLabel('اسم او رقم الهويه')
                    .setPlaceholder("3887 | فلان بن فلاني")
                .setMaxLength(2)
                .setMaxLength(25)
                .setRequired(true)
                .setStyle("SHORT")
      const rows1 = new MessageActionRow().addComponents(t1)
      const modal = new Modal()
      .setTitle("البحث عن شخص")
      .setCustomId("t12")
      modal.addComponents(rows1)
      await inter.showModal(modal)
    }
  }
})