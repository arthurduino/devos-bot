require('dotenv/config');

module.exports = async (client) => {
  const guild = client.guilds.cache.get(process.env.TEST_GUILD_ID);

  guild.commands.cache.delete();
  const command = await guild.commands.set(client.slashs);

  const getRoles = function(commandName) {
    const permissions = client.slashs.find(s => s.name == commandName).permissions;
    if (!permissions) return null;

    return guild.roles.cache.filter(r => r.permissions.has(permissions) && !r.managed);
  }

  const fullPermissions = command.reduce((accumulator, x) => {
    const roles = getRoles(x.name);
    if (!roles) return accumulator;

    const permissions = roles.reduce((a, v) => {
      return [...a, { id: v.id, type: 'ROLE', permission: true }];
    }, []);

    return [...accumulator, { id: x.id, permissions } ]
  }, []);

  guild.commands.permissions.set({ fullPermissions });

  client.user.setPresence({ status: client.config.presence.type, activities: [{ name: client.config.presence.status }] });

  console.log(`[${client.user.username}]: I'm ready.`);
};