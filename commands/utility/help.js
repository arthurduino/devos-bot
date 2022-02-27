module.exports = {
  description: 'Affiche la liste des commande ou des informations sur une commande.',
  type: 1,
  options: [
    { name: 'command', description: 'Informations sur une commande.', type: 'STRING' }
  ],
  async run({ client, interaction }) {
    const command = interaction.options.get('command');

    if (!command) {
      interaction.reply({
        embeds: [{
          color: client.config.colors.main,
          title: 'Liste des commandes',
          description: 'Toutes les commandes ci-dessous s\'effectuent en slash commande (`/`).',
          fields: [
            { name: `${client.config.emojis.administration} Administration`, value: Object.values(client.commands).filter(c => c.category == 'administration').map(cmd => `\`${cmd.name}\``).join(', ') },
            { name: `${client.config.emojis.economy} Economie`, value: Object.values(client.commands).filter(c => c.category == 'economy').map(cmd => `\`${cmd.name}\``).join(', ') },
            { name: `${client.config.emojis.utility} Utilitaire`, value: Object.values(client.commands).filter(c => c.category == 'utility').map(cmd => `\`${cmd.name}\``).join(', ') }
          ],
          footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
        }]
      });
    }
  }
};