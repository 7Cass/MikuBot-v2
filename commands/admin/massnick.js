module.exports = {
  name: "massnick",
  description: "Troca o nick de todos os usuários do servidor",
  cooldown: 5,
  require: "ADMINISTRATOR",
  async execute(message, args, client, prefix) {
    const admin = "476937718677504010" || "501468044234265857";

    const nick = args.join(" ");

    const server = message.guild.members;

    if (message.author.id !== admin) {
      return message.reply(`Você não tem premissão para usar este comando!`);
    } else {
      try {
        const response = await server.fetch();
        await response.forEach((member) => {
          member.setNickname(nick);
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
