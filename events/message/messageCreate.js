module.exports = async (client, message) => {
  if (!message.author.bot) {

    const usersDB = await client.pool.query(`SELECT * FROM users where id = ${message.author.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) {
      await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${message.author.id}, 0, 0, 0)`);
    }
  }

  if (message.author.id == client.config.disboard_id) {
    const user = message.guild.members.cache.get(message.embeds[0].description.split(' ')[0].replace('<@', '').replace('>', ''));
    const userDB = await client.pool.query(`SELECT * FROM users where id = ${user.id}`);

    await client.pool.query(`UPDATE users SET credits =  ${userDB.credits + 0.5} WHERE id = ${user.id}`);
    message.channel.send(`Merci ${user.toString()} d'avoir bump le serveur. Voici 0.5 credit en récompense.`);
  }
};