class Command {
  constructor(client, options) {
    this.client = client;

    this.help = {
      description: options.description
    };

    this.configuration = {
      botPermissions: options.botPermissions || [],
      memberPermissions: options.memberPermissions || [],
      allowDMs: options.allowDMs || false
    };

    this.cooldown = {};
  }

  setMessage(message) {
    this.message = message;
  }
}

module.exports = Command;