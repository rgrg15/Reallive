const db = require("./../models/haw")
const bd = require("./../models/r59h")
const { MessageEmbed, MessageActionRow, MessageButton, TextInputValue } = require("discord.js")
const { Modal, TextInputComponent } = require("discord.js")
const {mwsManger,mws} = require("./../config.json")
const client = require("./../index")
client.on("interactionCreate", async(interaction) => {
  if(!interaction.isModalSubmit()) return;
  const inter = interaction;
 
  if(interaction.customId == "t12") {
    if(!interaction.member.roles.cache.has(mws)) return inter.reply({content: "ليس لديك صلاحيات لعمل الامر هذا", ephemeral: true})
     if(inter.replied) return;
    const id = inter.fields.getTextInputValue("asm")
   if(isNaN(id)) {
    db.findOne({name: id}, async(err, data) => {
      if(err) throw err;
      if(data) {
        const row = new MessageActionRow()
         .addComponents(
             new MessageButton()
             .setStyle('SUCCESS')
             .setLabel('اضافه سياره للشخص')
             .setCustomId('1'),
               new MessageButton()
             .setStyle('DANGER')
             .setLabel('سحب السياره')
             .setCustomId('2'),
               new MessageButton()
             .setStyle('SECONDARY')
             .setLabel('اضافه رخصه قياده')
             .setCustomId('3'),
           new MessageButton()
            .setStyle('SECONDARY')
            .setLabel('نقل ملكية مركبه')
            .setCustomId('4')
         )
        inter.reply({
          embeds: [
            new MessageEmbed()
            .setTitle("تم العثور على الشخص")
            .setColor("RED")
            .setDescription(`**
            اسمه : ${data.name}
            منشن : <@${data.user}>
            رقم الهويه : ${data.haw}
            **`)
          ],
          components:[row],
          ephemeral: true
        })
      } else {
        inter.reply({
          content: "لم اجد على هذا الشخص",
          ephemeral: true
        })
      }
    })
    
   } else {
     db.findOne({haw: id}, async(err, data) => {
       if(err) throw err;
       if(data) {
         const row = new MessageActionRow()
          .addComponents(
              new MessageButton()
              .setStyle('SUCCESS')
              .setLabel('اضافه سياره للشخص')
              .setCustomId('1'),
                new MessageButton()
              .setStyle('DANGER')
              .setLabel('سحب السياره')
              .setCustomId('2'),
                new MessageButton()
              .setStyle('SECONDARY')
              .setLabel("اضافه رخصه قياده")
              .setCustomId('3'),
            new MessageButton()
            .setStyle('SECONDARY')
            .setLabel('نقل ملكية مركبه')
            .setCustomId('4')
          )
         inter.reply({
           embeds: [
             new MessageEmbed()
             .setTitle("تم العثور على الشخص")
             .setColor("RED")
             .setDescription(`**
             اسمه : ${data.name}
             منشن : <@${data.user}>
             رقم الهويه : ${data.haw}
             **`)
           ],
           components:[row],
           ephemeral: true
         })
       } else {
         inter.reply({
           content: "لم اجد على هذا الشخص",
           ephemeral: true
         })
       }
     })
   } 
   


   }

})

client.on("interactionCreate", async(inter) => {
   if(!inter.isButton()) return;
  if(inter.customId == "3") {
    const t1 = new TextInputComponent() 
              .setCustomId('asm1')
              .setLabel('رقم الهويه')
                  .setPlaceholder("3887")
              .setMaxLength(2)
              .setMaxLength(25)
              .setRequired(true)
              .setStyle("SHORT")
    const rows1 = new MessageActionRow().addComponents(t1)
    const modal = new Modal()
    .setTitle("اضافه رخصه قياده ")
    .setCustomId("t11")
    modal.addComponents(rows1)
    await inter.showModal(modal)
    
   }
  if(inter.customId === "2") {
    const t1 = new TextInputComponent() 
    .setCustomId('asm2')
    .setLabel('رقم الهويه')
        .setPlaceholder("3887")
    .setMaxLength(2)
    .setMaxLength(25)
    .setRequired(true)
    .setStyle("SHORT")
    const rows1 = new MessageActionRow().addComponents(t1)
    const t2 = new TextInputComponent() 
    .setCustomId('asm22')
    .setLabel('رقم اللوحه')
        .setPlaceholder("2ASJW687")
    .setMaxLength(2)
    .setMaxLength(25)
    .setRequired(true)
    .setStyle("SHORT")
     const rows2 = new MessageActionRow().addComponents(t2)
    const modal = new Modal()
    .setTitle("سحب المركبه")
    .setCustomId("asm222")
    modal.addComponents(rows1,rows2)
    await inter.showModal(modal)
  }
 
    if(inter.customId === "1") {
      const t1 = new TextInputComponent() 
      .setCustomId('asm3')
      .setLabel('رقم الهويه')
          .setPlaceholder("3887")
      .setMaxLength(2)
      .setMaxLength(25)
      .setRequired(true)
      .setStyle("SHORT")

      const t2 = new TextInputComponent() 
      .setCustomId('asm33')
      .setLabel('رقم اللوحه')
          .setPlaceholder("2ASJW687")
      .setMaxLength(2)
      .setMaxLength(25)
      .setRequired(true)
      .setStyle("SHORT")
      const t3 = new TextInputComponent() 
      .setCustomId('asm333')
      .setLabel('نوع المركبه')
          .setPlaceholder("اول اسم من نوع المركبه")
      .setMaxLength(2)
      .setMaxLength(25)
      .setRequired(true)
      .setStyle("SHORT")
       const rows2 = new MessageActionRow().addComponents(t1)
      const rows3 = new MessageActionRow().addComponents(t2)
      const rows1 = new MessageActionRow().addComponents(t3)
      const modal = new Modal()
      .setTitle("اضافه المركبه")
      .setCustomId("asm30")
      modal.addComponents(rows2,rows1,rows3)
      await inter.showModal(modal)
    }
    if(inter.customId === "4") {
      const t1 = new TextInputComponent() 
      .setCustomId('asm4')
      .setLabel('رقم الهويه للمالك الجديد')
          .setPlaceholder("3887")
      .setMaxLength(2)
      .setMaxLength(25)
      .setRequired(true)
      .setStyle("SHORT")
      const rows1 = new MessageActionRow().addComponents(t1)
      const t2 = new TextInputComponent() 
      .setCustomId('asm44')
      .setLabel('رقم اللوحه للمالك القديم')
          .setPlaceholder("2ASJW687")
      .setMaxLength(2)
      .setMaxLength(25)
      .setRequired(true)
      .setStyle("SHORT")
      
       const rows2 = new MessageActionRow().addComponents(t2)
      const modal = new Modal()
      .setTitle("نقل ملكيه المركبه")
      .setCustomId("asm40")
      modal.addComponents(rows1,rows2)
      await inter.showModal(modal)
    }
})