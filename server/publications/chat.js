import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Clients} from '/lib/collections';

export default function () {
  Meteor.publish('chat.content', function (clientId) {
    check(clientId, String);

    return Clients.find({_id: clientId});
  });
}
