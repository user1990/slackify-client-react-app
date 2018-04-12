import gql from 'graphql-tag';

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      name
      owner
      channels {
        id
        name
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
      createdAt
    }
  }
`;
