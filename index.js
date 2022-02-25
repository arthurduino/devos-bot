const Client = require('./base/Client');
const config = require('./config.json');
require('./base/Prototypes');

const client = new Client();

client.login(process.env.TOKEN);