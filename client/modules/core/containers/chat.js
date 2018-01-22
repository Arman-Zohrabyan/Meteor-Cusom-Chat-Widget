import Chat from '../components/chat';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import { Random } from 'meteor/random';

export const composer = ({context, clientId}, onData) => {
  const {Meteor, Collections} = context();

  if(!localStorage.getItem('userId')) {
    localStorage.setItem('userId', Random.id());
  }

  onData(null, {clientId, userId: localStorage.getItem('userId')});

  if(Meteor.subscribe('chat.content', clientId).ready()) {
    const chatContent = Collections.Clients.find({_id: clientId}).fetch();
    onData(null, {clientId, userId: localStorage.getItem('userId'), chatData: chatContent[0]});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  sendMessage: actions.chatActions.sendMessage
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Chat);
