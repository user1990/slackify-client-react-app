import React from 'react';

import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import SendMessage from './SendMessage';
import Sidebar from '../containers/Sidebar';
import DirectMessage from '../containers/DirectMessage';

import { meQuery, directMessageMeQuery } from '../graphql/queries/queries';
import { createDirectMessageMutation } from '../graphql/mutations/mutations';

const DirectMessages = ({
  mutate,
  data: { loading, me, getUser },
  match: {
    params: { teamId, userId },
  },
}) => {
  if (loading) {
    return null;
  }

  const { username, teams } = me;

  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  return (
    <div className="app-container">
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
        username={username}
      />
      <Header channelName={getUser.username} />
      <DirectMessage teamId={team.id} userId={userId} />
      <SendMessage
        onSubmit={async text => {
          const response = await mutate({
            variables: {
              text,
              receiverId: userId,
              teamId,
            },
            optimisticResponse: {
              createDirectMessage: true,
            },
            update: store => {
              const data = store.readQuery({ query: meQuery });
              const teamIdx2 = findIndex(data.me.teams, ['id', team.id]);
              const notAlreadyThere = data.me.teams[
                teamIdx2
              ].directMessageMembers.every(
                member => member.id !== parseInt(userId, 10)
              );
              if (notAlreadyThere) {
                data.me.teams[teamIdx2].directMessageMembers.push({
                  __typename: 'User',
                  id: userId,
                  username: getUser.username,
                });
                store.writeQuery({ query: meQuery, data });
              }
            },
          });
          console.log(response);
        }}
        placeholder={userId}
      />
    </div>
  );
};

export default compose(
  graphql(directMessageMeQuery, {
    options: props => ({
      variables: { userId: props.match.params.userId },
      fetchPolicy: 'network-only',
    }),
  }),
  graphql(createDirectMessageMutation)
)(DirectMessages);
