module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands[interaction.commandName];

    command.run({ client, interaction });
    console.log(`${interaction.user.tag} à fait la commande ${interaction.commandName}`);
  }
};