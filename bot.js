const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
require("./util/eventLoader")(client);
client.cooldowns = new Discord.Collection()

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);

// CAPSLOCK \\

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});


// CAPSLOCK \\

// CHAT LOG \\
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  var yapan = message.author;

  var kanal = await db.fetch(`chatlog_${message.guild.id}`);
  if (!kanal) return;
  var kanalbul = message.guild.channels.cache.find("name", kanal);

  const chatembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, yapan.avatarURL())
    .addField("Kullanıcı Tag", yapan.tag, true)
    .addField("ID", yapan.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(yapan.avatarURL());
  kanalbul.send(chatembed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  var yapan = oldMsg.author;

  var kanal = await db.fetch(`chatlog_${oldMsg.guild.id}`);
  if (!kanal) return;
  var kanalbul = oldMsg.guild.channels.cache.find("name", kanal);

  const chatembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, yapan.avatarURL())
    .addField("Kullanıcı Tag", yapan.tag, true)
    .addField("ID", yapan.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(yapan.avatarURL());
  kanalbul.send(chatembed);
});
// CHAT LOG \\

// REKLAM \\

client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem İzin Vermem ? !**').then(msg => msg.delete(3000));
   
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });

//////////////////////////////////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("Aleyküm selam,  hoş geldin ^^");
  }
});

////////////////////////////////////////////////////////////////////////

client.on("message", m => {
  if (m.channel.id !== "796735762238406686") { //buraya o kanalın ID'si yazılacak.
    return;
  }
  if (m.author.id === m.guild.ownerID) return;
  if (m.attachments.size < 1) {
    m.delete();
  }
});

////////////////////////////////////////////////////////////////

client.on("ready", () => {
  client.channels.get("842450491627667456").join();
   //main dosyaya atılacak
})

////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('Sunucumuza Hoşgeldin')
.setDescription('Kayıt olmak için, register-chat kanalında bir yetkiliyi etiketleyip, sizi kayıt etmesini bekleyin. Tag almak isterseniz; ★ İyi Eğlenceler')
member.send(embed)
})