require('dotenv/config');

module.exports = async (client) => {
  const guild = client.guilds.cache.get(process.env.TEST_GUILD_ID);

  guild.commands.cache.delete();
  await guild.commands.set(client.slashs);

  client.user.setPresence({ status: client.config.presence.type, activities: [{ name: client.config.presence.status }] });

  console.log(`[${client.user.username}]: I'm ready.`);
  
  await client.pool.query("CREATE TABLE IF NOT EXISTS public.users ( id bigint NOT NULL, credits double precision, experience integer, level integer, CONSTRAINT users_pkey PRIMARY KEY (id) ) TABLESPACE pg_default; ALTER TABLE IF EXISTS public.users OWNER to squarfiuz;");


};