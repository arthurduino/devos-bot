const Client = require('./base/Client');
const config = require('./config.json');
require('dotenv/config');

const client = new Client({ config });

client.login(process.env.TOKEN);

client.loadEvents();
client.loadCommands();