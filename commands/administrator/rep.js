module.exports = {
  description: 'Affiche le nombre de credits que vous avez ou celui d\'un autre utilisateur.',
  type: 1,
  role: '946876887618183198',
  options: [
    { name: 'member', description: 'Choisissez un membre.', type: 6, required: true }
  ],
  async run({ client, interaction }) {
    const member = interaction.options.get('member').member;
    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${member.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) {
      await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${member.id}, 1, 0, 0)`);
    } else {
      await client.pool.query(`UPDATE users SET credits =  ${userDB.credits + 1} WHERE id = ${member.id}`);
    }

    interaction.success(`J'ai donné 1 credit à ${member.toString()}. Merci à lui pour sa participation.`);
  }
};