import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Clients} from '/lib/collections';

export default function () {
  Meteor.methods({
    'chat.sendMessage'(clientId, userId, message) {
      check(clientId, String);
      check(userId, String);
      check(message, String);

      const time = new Date();
      const messageData = {userId, message, time: time.toString()};

      if(!Clients.findOne({_id: clientId})) {
        Clients.insert({_id: clientId, messages: []})
      }

      Clients.update({_id: clientId}, { $push: {messages: messageData} });
    }
  });

}
