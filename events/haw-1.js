const client = require("./../index")
const haw = require("./../models/haw")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { Modal, TextInputComponent } = require("discord.js")
const {haw3,a7oal} = require('./../config.json')

client.on("interactionCreate", async(inter) => {
   
    if(!inter.isModalSubmit()) return;
   if(inter.replied) return console.log("-")
    if(inter.customId == "h1") {

         const name = inter.fields.getTextInputValue("asm")
         const p1 = Math.floor(Math.random() * 1100) + 9
         const my = inter.fields.getTextInputValue("mylad")
        const snh = inter.fields.getTextInputValue("snh")
        const sex = inter.fields.getTextInputValue("sex")
        const url = inter.fields.getTextInputValue("url")
      
       haw.findOne({user: inter.user.id}, async(err,data)=> {
           if(err) throw err;
           if(data) {
             
              inter.reply({
                  content: `لديك هويه سابقه`,
                  ephemeral: true
              })
           } else {
                haw.create({
                  name: name,
                  haw: p1,
                  mylad: my,
                  snh: snh,
                  url: url,
                  sex: sex,
                  user: inter.user.id,
                  guildId: inter.guild.id,
                  condition: "قيد قبول الهويه"
              }).then(() => {
                  inter.reply({content: `تم انشاء هويه بنجاح | شكرا لصبرك.`, ephemeral: true})
                const ch = inter.client.channels.cache.get(haw3) 
                 
                  const button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("17")
                    .setStyle("SUCCESS")
                    .setLabel("قبول"),
                    new MessageButton()
                    .setCustomId("18")
                    .setStyle("DANGER")
                    .setLabel("رفض")

                  )
                 
                  ch.send({
                      embeds: [
                          new MessageEmbed()
                          .setThumbnail(inter.user.displayAvatarURL())
                          .setTitle(`**Create a national identity | إنشاء هوية وطنية**`)
                          .addFields(
                              {name: "**منشن للشخص** :", value: `${inter.user}`},
                              {name: "**اسم للشخص** :", value: `${name}`},
                              {name: "**هويه للشخص** :", value: `${p1}`},
                              {name: "**الولايه** :", value: `${my}`},
                              {name: "**يوم ميلاد للشخص** :", value: `${snh}`},
                              {name: "**الجنس** :", value: `${sex}`}
                          )
                          .setImage(url)
                          .setFooter({ text: inter.user.id })
                          .setColor("WHITE")
                      ],
                      components: [button]
                  })


        })
            
           }
       })
     
    }
   
      }

         )
         client.on("interactionCreate", async(i) => {
const inter = i;
            if(!i.isButton()) return;
            if(i.customId == "17") {
                if(!i.member.roles.cache.has(a7oal)) return;
                const getIdFromFooter = i.message.embeds[0].footer.text;
                const getMember = await i.guild.members.fetch(getIdFromFooter);
             
                data = haw.findOne({user : getMember.id })
                if(!data) return i.reply({
                    content: "لم اجد هذه الهويه في قاعده البيانات | :x:",
                    ephemeral: false
                })
                if(data) {
                await  data.updateOne({condition: "تم قبول الهويه"})
                    i.update({
                        embeds: [ 
                            new MessageEmbed()
                            .setTitle(`تم قبول الهويه`)
                            .setColor("GREEN")
                            .setDescription(`
> - تم قبول الهويه من : ${i.user}
> - الشخص الذي قبلت هويته : ${getMember}
                            `)
                        ], 
                        components: [
                            new MessageActionRow().addComponents(
                                new MessageButton()
                                .setCustomId("2768")
                                .setLabel("الهويه مقبوله")
                                .setStyle("SUCCESS")
                                .setDisabled(true)
                            )
                           
                        ]
                    })
                    getMember.send({
embeds: [
new MessageEmbed()
.setTitle("اشعار جديد")
    .setDescription(`تم قبول هويتك في الاحوال المدنيه وبامكانك التجول بها داخل المدينه ، ونشكرك على صبرك`)
.setColor("BLUE")
], 
components :[
     new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId("2368")
                                    .setLabel(inter.guild.name)
                                    .setStyle("SUCCESS")
                                    .setDisabled(true)
                                )
]
                    })
                }
            }
            if(i.customId == "18") {
               if(!i.member.roles.cache.has(a7oal)) return;
                const getIdFromFooter = i.message.embeds[0].footer.text;
                const getMember = await i.guild.members.fetch(getIdFromFooter);
                 haw.findOneAndDelete({user: getMember.id},async(err,data) => {
                    if(err) throw err;
                    if(data) {
                        getMember.send({content: "تم رفض هويتك لاسباب معينه عدم الالتزام بها | :x:"})
                        i.update({
                            embeds: [ 
                                new MessageEmbed()
                                .setTitle(`تم رفض الهويه`)
                                .setColor("RED")
                                .setDescription(`
    > - : تم رفض هويته من : ${i.user}
    > - الشخص الذي رفضت هويته : ${getMember}
                                `)
                            ], 
                            components: [
                                new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId("2368")
                                    .setLabel("الهويه مرفوضه")
                                    .setStyle("DANGER")
                                    .setDisabled(true)
                                )
                               
                            ]
                        })
                          getMember.send({
embeds: [
new MessageEmbed()
.setTitle("اشعار جديد")
    .setDescription(`هويتك مرفوضه لدى الاحوال المدنيه ؛ لعد الالتزام بالقوانين`)
.setColor("RED")
], 
components :[
     new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId("2368")
                                    .setLabel(inter.guild.name)
                                    .setStyle("DANGER")
                                    .setDisabled(true)
                                )
]
                    })
                    }
                })
            }
                })
