import React, { Component } from 'react';

import decode from 'jwt-decode';
import Channels from './Channels';
import Teams from './Teams';

import AddChannelModal from './modals/AddChannelModal';
import InvitePeopleModal from './modals/InvitePeopleModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openAddChannelModal: !state.openAddChannelModal,
    }));
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openInvitePeopleModal: !state.openInvitePeopleModal,
    }));
  };

  render() {
    const { teams, team, username } = this.props;
    const { openAddChannelModal, openInvitePeopleModal } = this.state;

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        team={team}
        isOwner={team.admin}
        username={username}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelModal={this.toggleAddChannelModal}
        onInvitePeopleModal={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={team.id}
        open={openAddChannelModal}
        onClose={this.toggleAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={team.id}
        open={openInvitePeopleModal}
        onClose={this.toggleInvitePeopleModal}
        key="invite-people-modal"
      />,
    ];
  }
}

export default Sidebar;
