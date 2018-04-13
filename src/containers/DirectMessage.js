import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { directMessagesQuery } from '../graphql/queries/queries';
import { newDirectMessageSubscription } from '../graphql/subscriptions/subscriptions';

// eslint-disable-next-line react/prefer-stateless-function
class DirectMessage extends Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (teamId, userId) =>
    this.props.data.subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          directMessages: [
            ...prev.directMessages,
            subscriptionData.newDirectMessage,
          ],
        };
      },
    });

  render() {
    const {
      data: { loading, directMessages },
    } = this.props;

    return loading ? null : (
      <Comment.Group className="messages">
        {directMessages.map(message => (
          <Comment key={`${message.id}-direct-message`}>
            <Comment.Content>
              <Comment.Author as="a">{message.sender.username}</Comment.Author>
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

export default graphql(directMessagesQuery, {
  options: props => ({
    fetchPolicy: 'network-only',
    variables: {
      teamId: props.teamId,
      userId: props.userId,
    },
  }),
})(DirectMessage);
