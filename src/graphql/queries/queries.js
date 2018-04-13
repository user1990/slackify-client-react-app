import gql from 'graphql-tag';

export const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export const meQuery = gql`
  {
    me {
      id
      username
      teams {
        id
        name
        admin
        channels {
          id
          name
        }
      }
    }
  }
`;

export const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

export const directMessagesQuery = gql`
  query($teamId: Int!, $userId: Int!) {
    directMessages(teamId: $teamId, otherUserId: $userId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`;
