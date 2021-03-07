module.exports = {
  name: "purge",
  description: "Apaga um número específico de mensagens do chat",
  cooldown: 5,
  require: "MODERATOR",
  execute(message, args, client, prefix) {
    const FLAGS = ["MANAGE_MESSAGES"];
    const isMod = message.channel
      .permissionsFor(message.member)
      .has(FLAGS, false);

    if (isMod) {
      if (args.length > 0) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount) && (amount <= 1 || amount > 100)) {
          return message.reply(
            `Digite um número entre 1 e 99 para a quantidade de mensagens a serem deletadas! ex: \`${prefix}${this.name} 20\`  `
          );
        } else {
          return message.channel.bulkDelete(amount, true).catch((error) => {
            console.error(error);
          });
        }
      } else {
        return message.reply(
          `Digite um número entre 1 e 99 para a quantidade de mensagens a serem deletadas! ex: \`${prefix}${this.name} 20\`  `
        );
      }
    } else {
      return message.reply("Você não tem permissão para usar este comando!");
    }
  },
};
