module.exports = {
  description: 'Affiche le ping du bot.',
  type: 1,
  async run({ client, interaction }) {
    interaction.reply(`:ping_pong: Pong ! Gateway: \`${client.ws.ping}ms\`.`);
  }
};