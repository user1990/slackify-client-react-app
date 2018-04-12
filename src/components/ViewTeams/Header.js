import React from 'react';

import { Header } from 'semantic-ui-react';

const TopHeader = ({ channel }) => (
  <div className="header">
    <Header textAlign="center">#{channel.name}</Header>
  </div>
);

export default TopHeader;
