module.exports = {
  description: 'Affiche le ping du bot.',
  type: 1,
  async run({ interaction }) {
    interaction.reply('Pong');
  }
};