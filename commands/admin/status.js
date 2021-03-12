module.exports = {
  name: "botstatus",
  description: "Altera o status do bot",
  cooldown: 5,
  require: "ADMINISTRATOR",
  execute(message, args, client, prefix) {
    const admin = "476937718677504010" || "501468044234265857";
    const bot = client.user;

    // const type = parseInt(args.splice(0, 1).join(""));
    const name = args.map((word) => word).join(" ");
    console.log(name);

    const presence = {
      activity: {
        name,
        type: 0,
      },
    };

    if (message.author.id !== admin) {
      return message.reply(`Você não tem premissão para usar este comando!`);
    }

    if (name === "") {
      return message.reply(
        `Digite a mensagem desejada como argumento para este comando, ela aparecerá na frente da palavra Jogando! ex: \`${prefix}${this.name} Pedra na sua janela\`  `
      );
    }
    return bot.setPresence(presence);
  },
};
