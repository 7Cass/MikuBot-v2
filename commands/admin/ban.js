module.exports = {
  name: "ban",
  description: "Bane o usuário mencionado",
  cooldown: 5,
  require: "ADMINISTRATOR",
  execute(message, args, client, prefix) {
    const { mentions } = message;

    const admin = "476937718677504010" || "501468044234265857";
    const target = mentions.users.first();

    if (message.author.id !== admin) {
      return message.reply(`Você não tem premissão para usar este comando!`);
    }

    if (target) {
      const targetBan = message.guild.members.cache.get(target.id);
      targetBan.ban();
      return message.reply(`O usuário <@${target.id}> foi banido!`);
    } else {
      return message.reply(
        `Mencione o membro desejado como argumento para este comando! ex: \`${prefix}${this.name} @menção\`  `
      );
    }
  },
};
