const { token, prefix } = require("./config.json");
const { Client, Intents, Collection } = require("discord.js");

let intents = new Intents(Intents.NON_PRIVILEGED);
intents.add("GUILD_MEMBERS");
const client = new Client({ ws: { intents: intents } });

const loadCommands = require("./loadCommands.js");

client.commands = new Collection();

client.once("ready", () => {
  console.log(`Bot On! ${client.user.tag}`);

  loadCommands(client);
});

const cooldowns = new Collection();

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.author.type === "dm") {
    return message.reply("Comando apenas no servidor!");
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply("Vocẽ não tem permissão para usar este comando!");
    }
  }

  if (command.args && !args.length) {
    let reply = `Você não definiu argumentos ${message.author}!`;

    if (command.usage) {
      reply += `\nTente: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const dateNow = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (dateNow < expirationTime) {
      const timeLeft = (expirationTime - dateNow) / 1000;
      return message.reply(
        `Espere \`\`${timeLeft.toFixed(1)}s\`\` antes de usar o comando \`\`${
          command.name
        }\`\` novamente.`
      );
    }
  }

  timestamps.set(message.author.id, dateNow);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client, prefix);
  } catch (error) {
    console.error(error);
    message.reply("Houve um erro ao executar este comando!");
  }
});

client.login(token);
