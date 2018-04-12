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
  data: { loading, allTeams, inviteTeams },
  match: { params: { teamId, channelId } },
}) => {
  if (loading) {
    return null;
  }

  // Redirect to create-team page if where not any teams created yet
  if (!allTeams.length) {
    return <Redirect to="/create-team" />;
  }

  const teams = [...allTeams, ...inviteTeams];

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(team.channels, ['id', channelIdInteger])
    : 0;
  const channel =
    channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

  return (
    <div className="view-team">
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <Messages channelId={channel.id} />}
      {channel && <SendMessage channelName={channel.name} />}
    </div>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
