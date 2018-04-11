import React from 'react';

import { Input } from 'semantic-ui-react';

const SendMessage = ({ channelName }) => (
  <div className="view-team__input">
    <Input type="text" placeholder={`Message #${channelName}`} />
  </div>
);

export default SendMessage;
