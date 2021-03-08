const { MessageEmbed, Permissions } = require("discord.js");

function capitalize(name) {
  let output = "";
  for (let i = 0; i < name.length; i++) {
    if (i === 0) {
      output += name[i].toUpperCase();
    } else {
      output += name[i];
    }
  }
  return output;
}

module.exports = {
  name: "help",
  description: "Lista de comandos",
  cooldown: 5,
  execute(message, args, client, prefix) {
    const admin = "476937718677504010" || "501468044234265857";
    const FLAGS = ["MANAGE_ROLES", "MANAGE_CHANNELS", "KICK_MEMBERS"];
    const isMod = message.channel
      .permissionsFor(message.member)
      .has(FLAGS, false);

    const user = message.author;
    const bot = client.user;
    const commands = client.commands;

    const embed = new MessageEmbed()
      .setAuthor(
        `${bot.username}`,
        `${bot.avatarURL({ format: "png", dynamic: true })}`
      )
      .setTitle(`${this.description}`)
      .setFooter(`${message.guild.name}`)
      .setTimestamp();

    commands
      .filter((command) => !command.require)
      .forEach((command) => {
        embed.addField(`${capitalize(command.name)}`, `${command.description}`);
      });

    if (user.id === admin) {
      embed.setColor("#2f99bb");
      commands.forEach((command) => {
        embed.addField(`${capitalize(command.name)}`, `${command.description}`);
      });
      return message.channel.send(embed);
    }

    if (isMod) {
      embed.setColor("#73ff88");
      commands
        .filter((command) => command.require === "MODERATOR")
        .forEach((command) => {
          embed.addField(
            `${capitalize(command.name)}`,
            `${command.description}`
          );
        });
      return message.channel.send(embed);
    } else {
      return message.channel.send(embed);
    }
  },
};
