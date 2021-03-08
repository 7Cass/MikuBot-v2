const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Muta o usuário mencionado",
  cooldown: 5,
  require: "MODERATOR",
  async execute(message, args, client, prefix) {
    const FLAGS = ["MANAGE_ROLES", "MANAGE_CHANNELS", "KICK_MEMBERS"];
    const isMod = message.channel
      .permissionsFor(message.member)
      .has(FLAGS, false);

    const user = message.author;
    const bot = client.user;

    if (args.length === 0) {
      return message.reply(
        `Mencione o usuário desejado para o mute! Ex: \`\`${a}${prefix} @menção\`\``
      );
    }

    if (isMod) {
      const target = message.mentions.members.first();
      const time = parseInt(args[1] * 60000);
      const reason = args[2] || "Motivo não especificado";

      // Verifica os argumentos passados
      if (!target) {
        return message.reply(
          `O primeiro argumento deve ser a menção de um usuário! Ex: \`\`${prefix}${this.name} @menção 5 motivo\`\``
        );
      }

      if (isNaN(time)) {
        return message.reply(
          `O segundo argumento deve ser a quantidade em minutos! Ex: \`\`${prefix}${this.name} @menção 5 motivo\`\``
        );
      }

      //Padrão - Se não houver cargo, criar, setar permissões e atribuir ao alvo
      let role = message.guild.roles.cache.find(
        (role) => role.name === "Miku Mute"
      );

      if (!role) {
        role = await message.guild.roles.create({
          data: {
            name: "Miku Mute",
            color: "RED",
          },
          reason: `Cargo criado automaticamente para Mute`,
        });

        await message.guild.channels.cache.map((channel) => {
          channel.updateOverwrite(role, {
            SEND_MESSAGES: false,
            CONNECT: false,
          });
        });
      }
      await target.roles.add(role);

      // Embeds
      const muteEmbed = new MessageEmbed()
        .setAuthor(
          `${bot.username}`,
          `${bot.avatarURL({ format: "png", dynamic: true })}`
        )
        .setDescription(`<@${target.id}> foi mutado por <@${user.id}>`)
        .addField(`Motivo: ${reason}`, `Duração: ${time / 60000}min`)
        .setFooter(`${message.guild.name}`)
        .setTimestamp()
        .setColor("RED");

      const unmuteEmbed = new MessageEmbed()
        .setAuthor(
          `${bot.username}`,
          `${bot.avatarURL({ format: "png", dynamic: true })}`
        )
        .setDescription(`<@${target.id}> foi mutado por <@${user.id}>`)
        .addField(`Motivo: ${reason}`, `Duração: ${time / 60000}min`)
        .setFooter(`${message.guild.name}`)
        .setTimestamp()
        .setColor("RED");

      message.channel.send(muteEmbed);
      // Timeout para remover o cargo em minutos
      setTimeout(async () => {
        await target.roles.remove(role);

        return message.channel.send(unmuteEmbed);
      }, time);
    } else {
      return message.reply("Você não tem permissão para usar este comando!");
    }
  },
};
