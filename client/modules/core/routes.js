import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import Chat from './containers/chat';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/:clientId', {
    name: 'chat',
    action({clientId}) {
      mount(MainLayoutCtx, {
        content: () => (<Chat clientId={clientId} />)
      });
    }
  });
}
