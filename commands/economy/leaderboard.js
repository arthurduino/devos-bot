module.exports = {
  description: 'Affiche différents classements.',
  type: 'CHAT_INPUT',
  options: [
    { name: 'level', description: 'Affiche le classement des niveaux.', type: 'SUB_COMMAND' },
    { name: 'credits', description: 'Affiche le classement des credits.', type: 'SUB_COMMAND' }
  ],
  async run({ client, interaction }) {
    const leadeboard_type = interaction.options.getSubcommand();

    if (leadeboard_type == 'level') {
      const usersDB = await client.pool.query('SELECT * FROM users ORDER BY experience DESC LIMIT 10');

      const embed = {
        color: client.config.colors.main,
        author: { name: interaction.guild.name, icon_url: interaction.guild.iconURL() },
        title: 'Level Leadeboard',
        fields: [],
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      };

      usersDB.rows.map((userDB, i) => {
        const member = interaction.guild.members.cache.get(userDB.id);
        embed.fields.push({ name: `${i + 1}. ${member.user.username}#${member.user.discriminator}`, value: `Niveau : ${userDB.level}, Experience : ${userDB.experience}` });
      });

      interaction.reply({ embeds: [embed] });
    } else if (leadeboard_type == 'credits') {
      const usersDB = await client.pool.query('SELECT * FROM users ORDER BY credits DESC LIMIT 10');

      const embed = {
        color: client.config.colors.main,
        author: { name: interaction.guild.name, icon_url: interaction.guild.iconURL() },
        title: 'Credits Leadeboard',
        fields: [],
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      };

      usersDB.rows.map((userDB, i) => {
        const member = interaction.guild.members.cache.get(userDB.id);
        embed.fields.push({ name: `${i + 1}. ${member.user.username}#${member.user.discriminator}`, value: `Credits : ${userDB.credits}` });
      });

      interaction.reply({ embeds: [embed] });
    }
  }
};