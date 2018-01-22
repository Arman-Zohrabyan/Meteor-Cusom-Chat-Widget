export default {
  sendMessage({Meteor}, clientId, userId, message) {
    Meteor.call('chat.sendMessage', clientId, userId, message, (err) => {
      if (err) {
        console.warn("ERROR during 'chat.sendMessage'")
      }
    });
  }
};
