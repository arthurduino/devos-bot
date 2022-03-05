module.exports = {
  description: 'Affiche différents classements.',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'level',
      description: 'Affiche le classement des niveaux.',
      type: 'SUB_COMMAND'
    },
    {
      name: 'credits',
      description: 'Affiche le classement des credits.',
      type: 'SUB_COMMAND'
    }
  ],
  async run({ client, interaction }) {
    const leadeboard_type = interaction.options.getSubcommand();

    if (leadeboard_type == 'level') {
      const usersDB = await client.pool.query('SELECT * FROM users ORDER BY experience DESC LIMIT 10');

      const ranks = await client.pool.query(`WITH ranking AS (SELECT id, experience, DENSE_RANK() OVER (ORDER BY experience DESC) AS position FROM public.users) SELECT * from ranking WHERE id = ${interaction.member.id};`);
      const rank = ranks.rows[0];

      const embed = {
        color: client.config.colors.main,
        author: {
          name: interaction.guild.name,
          icon_url: interaction.guild.iconURL()
        },
        title: 'Level Leadeboard',
        description: '',
        footer: {
          icon_url: client.user.displayAvatarURL(),
          text: client.config.footer
        }
      };

      usersDB.rows.map((userDB, i) => {
        const member = interaction.guild.members.cache.get(userDB.id);
        if (!member) return;
        embed.description += `${i + 1}. ${member.toString()}\nNiveau : ${userDB.level}, Experience : ${userDB.experience}\n`;
      });

      if (rank.position > usersDB.rows.length) {
        const personnalUsersDB = await client.pool.query(`SELECT * FROM users WHERE id = ${interaction.member.id}`);
        const personnalUserDB = personnalUsersDB.rows[0];
        embed.description += `\n↪ ${rank.position}. ${interaction.member.toString()}\nNiveau : ${personnalUserDB.level}, Experience : ${personnalUserDB.experience}`;
      }

      interaction.reply({ embeds: [embed] });
    } else if (leadeboard_type == 'credits') {
      const usersDB = await client.pool.query('SELECT * FROM users ORDER BY credits DESC LIMIT 10');

      const ranks = await client.pool.query(`WITH ranking AS (SELECT id, credits, DENSE_RANK() OVER (ORDER BY credits DESC) AS position FROM public.users) SELECT * from ranking WHERE id = ${interaction.member.id};`);
      const rank = ranks.rows[0];

      const embed = {
        color: client.config.colors.main,
        author: { name: interaction.guild.name, icon_url: interaction.guild.iconURL() },
        title: 'Credits Leadeboard',
        description: '',
        footer: { icon_url: client.user.displayAvatarURL(), text: client.config.footer }
      };

      usersDB.rows.map((userDB, i) => {
        const member = interaction.guild.members.cache.get(userDB.id);
        embed.description += `${i + 1}. ${member.toString()}\nCredits : ${userDB.credits}\n`;
      });

      if (rank.position > usersDB.rows.length) {
        const personnalUsersDB = await client.pool.query(`SELECT * FROM users WHERE id = ${interaction.member.id}`);
        const personnalUserDB = personnalUsersDB.rows[0];
        embed.description += `\n↪ ${rank.position}. ${interaction.member.toString()}\nCredits : ${personnalUserDB.credits}`;
      }

      interaction.reply({ embeds: [embed] });
    }
  }
};