module.exports = {
  description: 'Donne 1 credit à une personne ayant aidé.',
  type: 'CHAT_INPUT',
  permissions: ['BAN_MEMBERS'],
  options: [
    { name: 'member', description: 'Choisissez un membre.', type: 'USER', required: true }
  ],
  async run({ client, interaction }) {
    const member = interaction.options.get('member').member;

    if (!member) return interaction.error('Je ne trouve pas ce membre sur le serveur.');
    if (member.user.bot) return interaction.error('Vous ne pouvez pas donner des credits à un bot.');

    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${member.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) {
      await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${member.id}, 1, 0, 0)`);
    } else {
      await client.pool.query(`UPDATE users SET credits =  ${userDB.credits + 1} WHERE id = ${member.id}`);
    }

    interaction.success(`J'ai donné \`1\` credit à ${member.toString()}. Merci à lui pour sa participation.`);
  }
};