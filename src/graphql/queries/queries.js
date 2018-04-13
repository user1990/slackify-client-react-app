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
