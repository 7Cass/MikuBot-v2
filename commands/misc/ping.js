const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Mostra o tempo de resposta do bot",
  cooldown: 5,
  execute(message, args, client, prefix) {
    const server = message.guild.name;
    const bot = client.user;
    const ping = message.createdTimestamp - Date.now();

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(bot.username, bot.avatarURL({ format: "png", dynamic: true }))
      .setTitle(`🏓 ${ping}ms`)
      .setFooter(server)
      .setTimestamp();

    return message.channel.send(embed);
  },
};
