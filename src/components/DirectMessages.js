import React from 'react';

import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import SendMessage from './SendMessage';
import Sidebar from '../containers/Sidebar';
import DirectMessage from '../containers/DirectMessage';

import { meQuery } from '../graphql/queries/queries';
import { createDirectMessageMutation } from '../graphql/mutations/mutations';

const ViewTeam = ({
  mutate,
  data: { loading, me },
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
      <Header channelName="Someone's username" />
      <DirectMessage teamId={teamId} userId={userId} />
      <SendMessage
        onSubmit={async text => {
          const response = await mutate({
            variables: {
              text,
              receiverId: userId,
              teamId,
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
  graphql(meQuery, { options: { fetchPolicy: 'network-only' } }),
  graphql(createDirectMessageMutation)
)(ViewTeam);
