module.exports = {
  description: 'Donne 1 credit à une personne ayant aidé.',
  type: 'CHAT_INPUT',
  permissions: ['BAN_MEMBERS'],
  options: [
    { name: 'member', description: 'Choisissez un membre.', type: 'SUB_COMMAND' }
  ],
  async run({ client, interaction }) {
    console.log('');
  }
};