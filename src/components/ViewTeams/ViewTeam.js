import React from 'react';

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

  const teams = allTeams.map(t => ({
    id: t.id,
    letter: t.name.charAt(0).toUpperCase(),
  }));
  const teamIdx = teamId
    ? findIndex(allTeams, ['id', parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIdx];

  const channelIdx = channelId
    ? findIndex(team.channels, ['id', parseInt(channelId, 10)])
    : 0;
  const channel = team.channels[channelIdx];

  return (
    <div className="view-team">
      <Sidebar teams={teams} team={team} />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id} />
      <SendMessage channelName={channel.name} />
    </div>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
