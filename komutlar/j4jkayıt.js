const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '807698797475528738' //KAYIT YETKİLİSİ ID
let verbuse = '808091807372017704' //VERİLECEK ROL ID
let verbusem = '' //VERİLECEK ROL ID
let albuse = '' //ALINACAK ROL ID
let albusem = '' //ALINACAK ROL ID l Kullanmicaksanız silin
let isimön = '✥ ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN
let isimson = '' //DEĞİŞTİRİLECEK İSMİN SONUNA GELEN
//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt Sorumlusu\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('Bir Üye Etiketlemelisin 💖')
  if (!isim) return message.channel.send('Bir İsim Yazmalısın 💖')

  setTimeout(function(){
  member.setNickname(`${isimön}${isim}${isimson}`)
  },2000)
  setTimeout(function(){
  member.addRole(verbuse)
  member.addRole(verbusem)
  },3000)
  setTimeout(function(){
  member.removeRole(albuse)
  member.addRole(albusem)
  },4000)
  
 const emoji = client.emojis.find(emoji => emoji.name === "tik");
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`:white_check_mark:  **Kayıt işlemi Başarılı.** :white_check_mark:

**Kayıt edilen kullanıcı :** ${isimön}${isim}${isimson}

**Kayıt işleminde verilen rol :** <@&${verbuse}>

**Kayıt Yapan Kişide Bulunan Rol :** Yok
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  .setImage("https://www.filgezi.com/wp-content/uploads/2017/12/pasaport-nasil-alinir.gif")
message.channel.send(embed)
message.react(emoji)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oyuncu','o'],
  permLevel: 0
}
exports.help = {
  name: 'join',
  description: "Join4Join kullanıcıları kayıt etme komutu.",
  usage: 'join <yeni nick>'
}