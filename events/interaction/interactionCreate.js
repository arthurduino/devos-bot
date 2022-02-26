module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    const command = this.client.commands[interaction.commandName];

    command.run({ client, interaction });
  }
};