const db = require("./../models/haw")
const db1 = require("./../models/r59h")
const db2 = require("./../models/r-syr")
const client = require("./../index")
const { MessageEmbed, MessageActionRow, MessageButton, TextInputValue } = require("discord.js")
const { Modal, TextInputComponent } = require("discord.js")
const {mwsManger,mws} = require("./../config.json")
client.on("interactionCreate", async(inter) => {
  try {
  const interaction = inter;
  if(inter.replied) return;

  
  if(!inter.isModalSubmit) return;
  if(inter.replied) return;
  if(inter.customId === "asm30") {
    if(!interaction.member.roles.cache.has(mws)) return inter.reply({content: "ليس لديك صلاحيات لعمل الامر هذا", ephemeral: true})
    const haw = inter.fields.getTextInputValue("asm3")
    const lo7h = inter.fields.getTextInputValue("asm33")
    const no3 = inter.fields.getTextInputValue("asm333")
    db1.findOne({haw: haw}, async(err,data) => {
      if(err) throw err;
      if(data) {
        
          db2.create({
            user: data.user,
              name: data.name,
            haw: data.haw,
            lo7h: lo7h,
            no3: no3,
            guildId: inter.guild.id
          })
          inter.reply({
            content: `تمت عمليه انشاء رخصه سير مركبة`,
            ephemeral: true
          })

        
      }else {
      inter.reply({
        content: `لم اجد على رخصه قياده لانشاء رخصه سير مركبه`,
        ephemeral: true
      })

    }
    })
  }
  if(inter.customId === "asm222") {
    if(!interaction.member.roles.cache.has(mws)) return inter.reply({content: "ليس لديك صلاحيات لعمل الامر هذا", ephemeral: true})
     const haw = inter.fields.getTextInputValue("asm2")
    const lo7h = inter.fields.getTextInputValue("asm22")
    db2.findOneAndDelete({haw: haw, lo7h: lo7h}, async(err,data) => {
      if(err) throw err;
      if(data) {

         const embed = new MessageEmbed()
        .setTitle("تمت عمليه سحب الرخصه")
        .setColor("RED")
        .setDescription(`**
        تم سحب الرخصه من : ${inter.user}
        معلومات اضافيه : 
        رقم لوحه السياره المسحوبه : ${data.lo7h}
        رقم الهويه : ${data.haw}
        نوع المركبه : ${data.no3}
        **`)
await inter.reply({
  embeds: [embed],
  ephemeral: true
})
      }else {
      inter.reply({
        content: `لم اجد على رخصه سير | :x:`,
        ephemeral: true
      })

    }
    })
  }
  if(inter.customId === "t11") {
    if(!interaction.member.roles.cache.has(mwsManger)) return inter.reply({content: "ليس لديك صلاحيات لعمل الامر هذا", ephemeral: true})
    const haw = inter.fields.getTextInputValue("asm1")
    db.findOne({haw: haw}, async(err,data) => {
      if(err) throw err;
      if(data) {
        db1.findOne({haw: haw}, async(err,data1) => {
          if(err) throw err;
          if(data1) {
            inter.reply({
              content: "فعليا لديه رخصه",
              ephemeral: true
            })
          } else {
            db1.create({
              user: data.user,
                name: data.name,
              haw: data.haw,
              guildId: inter.guild.id
            })
            inter.reply({
              content: "تمت عمليه انشاء الرخصه",
              ephemeral: true
            })
          }
        })
      } else {
      inter.reply({
        content: "لم اجد على هويه ",
        ephemeral: true
      })
    }
    })
  }
  if(inter.customId === "asm40") {
    if(!interaction.member.roles.cache.has(mws)) return inter.reply({content: "ليس لديك صلاحيات لعمل الامر هذا", ephemeral: true})
     const haw = inter.fields.getTextInputValue("asm4")
     const lo7h = inter.fields.getTextInputValue("asm44")
    //err
    data1 = await db1.find({haw: haw})
    if(!data1?.length) return inter.reply({
      content: `لم اجد رخصه قياده للمالك الجديد !`,
      ephemeral: true
    })
    data2 = await db2.find({lo7h: lo7h})
    if(!data2?.length) return inter.reply({
      content: `لم اجد هذه اللوحه فالنظام !`,
      ephemeral: true
    })
  data3 = await db.find({haw: haw})
    if(!data3?.length) return inter.reply({
      content: `لم اجد هذه الهويه !`,
      ephemeral: true
    })
    //end err
    data = await db2.findOne({lo7h: lo7h})
    if(data) {
      db.findOne({haw: haw}, async(err,data1) => {
        if(err) throw err;
        if(data1) {
         await data.updateOne({haw: haw, user: data1.user, name: data1.name})
          inter.reply({
            content: "تمت عملية نقل الملكيه بنجاح .",
            ephemeral: true
          })
        } else {
          inter.reply({
            content: "هنالك خطا ما",
            ephemeral: true
          })
        }
      })
    } else {
      inter.reply({
        content: "هنالك خطا ما",
        ephemeral: true
      })
    }
  }
  } catch (err) {
    console.log(`
    -------------------err--------------------
    name err : ${err}
  
    `)
  }
})