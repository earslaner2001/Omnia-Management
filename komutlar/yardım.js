const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const codare = new Discord.RichEmbed()

             .setColor('#fff000')
             .setAuthor(`Kategoriler`, client.user.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .addField(`Kategoriler`, `${prefix}moderasyon \n ${prefix}kulanıcı \n ${prefix}müzik `) // bunlar boş kalırsa hata verir
             .addField(`Linkler ->`, `[Sunucumuz](https://discord.gg/)`) // bunlar boş kalırsa hata verir
             .setFooter(`Menüyü ${message.author.username} istedi .`, message.author.avatarURL)
            
        return message.channel.sendEmbed(codare);
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['yardım'],
	permLevel : 0
}
//codare
exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : 'yardım'
}
