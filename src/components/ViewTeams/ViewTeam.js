import React from 'react';

import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { allTeamsQuery } from '../../graphql/queries/queries';

import Sidebar from './Sidebar';
import Header from './Header';
import Messages from './Messages';
import SendMessage from './SendMessage';

const ViewTeam = ({
  data: { loading, allTeams },
  match: { params: { teamId, channelId } },
}) => {
  if (loading) {
    return null;
  }

  // Redirect to create-team page if where not any teams created yet
  if (!allTeams.length) {
    return <Redirect to="/create-team" />;
  }

  // Team logic
  const teams = allTeams.map(t => ({
    id: t.id,
    letter: t.name.charAt(0).toUpperCase(),
  }));
  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger
    ? findIndex(allTeams, ['id', teamIdInteger])
    : 0;
  const team = allTeams[teamIdx];

  // Channel logic
  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(team.channels, ['id', channelIdInteger])
    : 0;
  const channel = team.channels[channelIdx];

  return (
    <div className="view-team">
      <Sidebar teams={teams} team={team} />
      {channel && <Header channelName={channel.name} />}
      {channel && <Messages channelId={channel.id} />}
      {channel && <SendMessage channelName={channel.name} />}
    </div>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
