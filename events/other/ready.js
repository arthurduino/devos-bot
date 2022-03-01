require('dotenv/config');

module.exports = async (client) => {
  const guild = client.guilds.cache.get(process.env.TEST_GUILD_ID);

  guild.members.fetch();

  const command = await guild.commands.set(client.slashs);

  // guild.commands.permissions.set({ fullPermissions });

  client.user.setPresence({ status: client.config.presence.type, activities: [{ name: client.config.presence.status }] });

  console.log(`[${client.user.username}]: I'm ready.`);
};