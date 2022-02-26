require('dotenv/config');

module.exports = (client) => {
  client.slashs.forEach(slash => {
    client.application.commands.create(slash, process.env.TEST_GUILD_ID);
  });

  client.user.setPresence({ status: client.config.presence.type, activities: [{ name: client.config.presence.status }] });

  console.log(`[${client.user.username}]: I'm ready.`);
};