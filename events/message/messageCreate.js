module.exports = async (client, message) => {
  if (message.author.bot) return;

  const usersDB = await client.pool.query(`SELECT * FROM users where id = ${message.author.id}`);
  const userDB = usersDB.rows[0];

  console.log(userDB);
};