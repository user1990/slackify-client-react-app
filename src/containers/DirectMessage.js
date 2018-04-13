import React from 'react';

import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { directMessagesQuery } from '../graphql/queries/queries';

// const newChannelMessageSubscription = gql`
//   subscription($channelId: Int!) {
//     newChannelMessage(channelId: $channelId) {
//       id
//       text
//       user {
//         username
//       }
//       created_at
//     }
//   }
// `;

// eslint-disable-next-line react/prefer-stateless-function
class DirectMessageContainer extends React.Component {
  // componentWillMount() {
  //   this.unsubscribe = this.subscribe(this.props.channelId);
  // }

  // componentWillReceiveProps({ channelId }) {
  //   if (this.props.channelId !== channelId) {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //     this.unsubscribe = this.subscribe(channelId);
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

  // subscribe = channelId =>
  //   this.props.data.subscribeToMore({
  //     document: newChannelMessageSubscription,
  //     variables: {
  //       channelId,
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData) {
  //         return prev;
  //       }

  //       return {
  //         ...prev,
  //         messages: [...prev.messages, subscriptionData.newChannelMessage],
  //       };
  //     },
  //   });

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
  variables: props => ({
    teamId: props.teamId,
    userId: props.userId,
  }),
  options: {
    fetchPolicy: 'network-only',
  },
})(DirectMessageContainer);
