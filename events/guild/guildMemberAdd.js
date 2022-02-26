module.exports = (client, member) => {
  member.roles.add(client.autorole_roles, 'Ajout des autoroles.');
};