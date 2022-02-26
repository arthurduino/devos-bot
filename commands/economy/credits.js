module.exports = {
  description: 'Affiche le nombre de credits que vous avez ou celui d\'un autre utilisateur.',
  type: 1,
  async run({ client, interaction }) {
    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${interaction.user.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) return interaction.error('Votre profile n\'est pas enregistré. Faites /set-profile ou envoyez un message pour enregistrer un profile.');

    interaction.reply({
      embeds: [{
        color: client.config.colors.blue,
        title: 'Credits',
        description: `Vous avez ${userDB.credits} credits.`
      }]
    })
  }
};