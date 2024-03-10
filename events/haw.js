const client = require("./../index")
const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require("discord.js")
const { Modal, TextInputComponent } = require("discord.js")
client.on("messageCreate", async(message) => {
    if(message.content.startsWith("#menu")) {

        if(!message.member.permissions.has("ADMINISTRATOR")) return ;
        const b1 = new MessageButton()
        .setCustomId("08")
        .setStyle("SUCCESS")
        .setLabel("إنشاء هوية")
        const a1 = new MessageActionRow()
        .addComponents(b1)
        const em = new MessageEmbed()
        .setTitle("**__الاحوال المدنية__**")
        .setColor(`DARK_BLUE`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**الأحوال المدنية 

        إنشاء هوية - 
       
       - ملاحظة 🔴 | هويتك لا يمكنك الكشف عنها إلا للعسكر او الحكومة بشكل عام ، ايضاً اجباري في حال اي ضابط واجهك تعطيه هويتك لـ التأكد أن وضعك سليم وغير مخالف للدستور والقانون 
       
       - 
       
       - مخاطر عدم إنشاء الهوية | 1- تعريض نفسك للأشتباه والقبض عليك بشكل دائم 2- في حال عدم توفر معك الهويه تعتبر مجهول 3- في حال تم كشفك دون هويه ب العمل يتم اتخاذ الأجراء الأتي - المرة الأولى يتم إيقاف عنك الراتب إلى أن تصدر هوية المره الثانيه يتم فصلك من الوظيفة وإحالتك إلى الجهات المعنية لتحقيق معك 
       
       
       مع تحيات الأحوال المدنية 
       
       -  : **`)
        message.channel.send({
            embeds: [em],
            components: [a1]
        })
    }
})
client.on("interactionCreate", async(interaction) => {
    const inter = interaction
   
     if(inter.isButton()) {
        if(inter.customId == "08") {

            
          if(inter.replied) return;
           var t1 = new TextInputComponent()
            .setCustomId('asm')
            .setLabel('اسمك واسم العائله')
                .setPlaceholder("فلان بن فلاني")
            .setMaxLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setStyle("SHORT")
            var t2 = new TextInputComponent()
            .setCustomId('sex')
            .setLabel('الجنس')
                .setPlaceholder("ذكر/انثى")
            .setMaxLength(3)
            .setMaxLength(4)
            .setRequired(true)
            .setStyle("SHORT")
             var t4 = new TextInputComponent()
            .setCustomId('mylad')
            .setLabel("الولايه")
               .setPlaceholder("لوس سانتوس | بوليتو | ساندي شور")   
            .setMaxLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setStyle("SHORT")
             var t5 = new TextInputComponent()
            .setCustomId('snh')
            .setLabel('سنه الميلاد')
            .setMaxLength(2)
                 .setPlaceholder("2009-7-27")
            .setMaxLength(25)
            .setRequired(true)
            .setStyle("SHORT")
            var t3 = new TextInputComponent()
            .setCustomId('url')
            .setLabel('رابط لصوره الكركتر في قراند')
            .setMaxLength(2)
                 .setPlaceholder("https://cdn.discord.app/")
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle("PARAGRAPH")
           
        const p1 = new MessageActionRow().addComponents(t1)
             
            
              const p4 = new MessageActionRow().addComponents(t4)
              const p5 = new MessageActionRow().addComponents(t5)
              const p6 = new MessageActionRow().addComponents(t2)
              const p7 = new MessageActionRow().addComponents(t3)
           
            const modal = new Modal()
            .setTitle('إنشاء هوية')
            .setCustomId("h1")
           modal.addComponents(p1,p4,p5,p6,p7)
           if(interaction.replied) return console.log("-")
           await inter.showModal(modal)
          
 
        }
    }
})
