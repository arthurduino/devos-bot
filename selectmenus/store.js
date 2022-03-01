module.exports = {
  async run({ client, interaction }) {
    if (interaction.user.id !== interaction.customId.split('.')[1]) return interaction.deferUpdate();

    const item = client.config.store.find(s => s.item == interaction.values[0]);

    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${interaction.user.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) return interaction.error('Votre profil n\'est pas enregistré. Faites la commande `/create-profile` ou envoyez un message pour enregistrer un profil.');
    if (userDB.credits < item.credits) return interaction.error(`${interaction.user.toString()}, Il vous manque ${item.credits - userDB.credits} credits pour acheter ce produit.`);

    if (item.item == 'ad_role') {
      if (interaction.member.roles.cache.has(client.config.ad_role)) return interaction.error('Vous avez déjà achetr ce produit.');
      interaction.member.roles.add(client.config.ad_role);
      await client.pool.query(`UPDATE users SET credits =  ${userDB.credits - 10} WHERE id = ${interaction.user.id}`);
      interaction.success('Vous avez correctement acheter ce produit. Je vous ai débité 10 credits.');
    }
  }
};