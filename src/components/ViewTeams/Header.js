import React from 'react';

import { Header } from 'semantic-ui-react';

const TopHeader = ({ channelName }) => (
  <div className="header">
    <Header textAlign="center">#{channelName}</Header>
  </div>
);

export default TopHeader;
