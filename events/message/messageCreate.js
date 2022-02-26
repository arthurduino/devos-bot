module.exports = async (client, message) => {
  if (message.author.bot) return;

  const usersDB = await client.pool.query(`SELECT * FROM users where id = ${message.author.id}`);
  const userDB = usersDB.rows[0];

  if (!userDB) {
    await client.pool.query(`INSERT INTO users(id, credits, experience, level) VALUES (${message.author.id}, 0, 0, 0)`);
  }

  console.log(userDB);
};