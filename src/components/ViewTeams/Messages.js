import React from 'react';

import { graphql } from 'react-apollo';
import { messagesQuery } from '../../graphql/queries/queries';

const Messages = ({ data: { loading, messages } }) =>
  loading ? null : <div>{JSON.stringify(messages)}</div>;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(Messages);
