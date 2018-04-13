import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { messagesQuery } from '../graphql/queries/queries';
import { newChannelMessageSubscription } from '../graphql/subscriptions/subscriptions';

class Messages extends Component {
  componentWillMount = () => {
    this.unsubscribe = this.subscribe(this.props.channelId);
  };

  componentWillReceiveProps = ({ channelId }) => {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  };

  componentWillUnmount = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  subscribe = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });

  render() {
    const {
      data: { loading, messages },
    } = this.props;

    return loading ? null : (
      <Comment.Group className="messages">
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
  }
}

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
  options: {
    fetchPolicy: 'network-only',
  },
})(Messages);
