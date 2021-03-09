module.exports = {
  name: "botname",
  description: "Muda o nome do bot, visibilidade global",
  cooldown: 5,
  require: "ADMINISTRATOR",
  execute(message, args, client, prefix) {
    const admin = "476937718677504010" || "501468044234265857";
    const name = args.join(" ");

    if (message.author.id !== admin) {
      return message.reply(`Você não tem premissão para usar este comando!`);
    }

    if (name === "") {
      return message.reply(
        `Digite o nome desejado como argumento para este comando! ex: \`${prefix}${this.name} AnimeSuki Bot\`  `
      );
    }

    return client.user.setUsername(name);
  },
};
