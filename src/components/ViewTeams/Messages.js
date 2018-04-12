import React from 'react';

import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { messagesQuery } from '../../graphql/queries/queries';

const Messages = ({ data: { loading, messages } }) =>
  loading ? null : (
    <Comment.Group className="comments">
      {messages.map(message => (
        <Comment key={`${message.id}-message`}>
          <Comment.Content>
            <Comment.Author as="a">{message.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{message.created_at}</div>
            </Comment.Metadata>
            <Comment.Text>{message.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(Messages);
