import React from 'react';

import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import SendMessage from './SendMessage';
import Sidebar from './Sidebar';
import Messages from './Messages';

import { meQuery } from '../graphql/queries/queries';
import { createMessageMutation } from '../graphql/mutations/mutations';

const ViewTeam = ({
  data: { loading, me },
  match: { params: { teamId, userId } },
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
      {/* <Header channelName={channel.name} />
      <Messages channelId={channel.id} /> */}
      <SendMessage onSubmit={() => {}} placeholder={userId} />
    </div>
  );
};

export default compose(
  graphql(meQuery, { options: { fetchPolicy: 'network-only' } }),
  graphql(createMessageMutation)
)(ViewTeam);
