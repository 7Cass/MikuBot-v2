module.exports = {
  name: "botnick",
  description: "Muda o nick do bot, visibilidade apenas no servidor",
  cooldown: 5,
  require: "ADMINISTRATOR",
  execute(message, args, client, prefix) {
    const admin = "476937718677504010" || "501468044234265857";
    const bot = message.guild.me;
    const nick = args.join(" ");

    if (message.author.id !== admin) {
      return message.reply(`Você não tem premissão para usar este comando!`);
    }

    if (nick === "") {
      return message.reply(
        `Digite o nome desejado como argumento para este comando! ex: \`${prefix}${this.name} AnimeSuki Bot\`  `
      );
    }

    return bot.setNickname(nick);
  },
};
