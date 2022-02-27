module.exports = async (client, message) => {
  if (!message.author.bot) {

    const usersDB = await client.pool.query(`SELECT * FROM users WHERE id = ${message.author.id}`);
    const userDB = usersDB.rows[0];

    if (!userDB) {
      await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${message.author.id}, 0, 0, 0)`);
    }
  }

  if (message.author.id == client.config.disboard_id) {
    console.log('1');
    console.log(message.embeds[0].color);
    if (message.embeds[0].color == '#24b7b7') {
      console.log('2');
      const member = message.guild.members.cache.get(message.embeds[0].description.split(' ')[0].replace('<@', '').replace('>', ''));

      const usersDB = await client.pool.query(`SELECT * FROM users WHERE id = ${member.id}`);
      const userDB = usersDB.rows[0];

      await client.pool.query(`UPDATE users SET credits = ${userDB.credits + 0.5} WHERE id = ${member.id}`);
      message.channel.send(`Merci ${member.toString()} d'avoir bump le serveur. Voici 0.5 credit en récompense.`);
    }    
  }
};