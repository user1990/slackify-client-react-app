import React, { Component } from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';

import AddChannelModal from '../components/modals/AddChannelModal';
import InvitePeopleModal from '../components/modals/InvitePeopleModal';
import DirectMessageModal from '../components/modals/DirectMessageModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false,
  };

  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({
      openDirectMessageModal: !state.openDirectMessageModal,
    }));
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
    const {
      openAddChannelModal,
      openInvitePeopleModal,
      openDirectMessageModal,
    } = this.state;

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamId={team.id}
        teamName={team.name}
        isOwner={team.admin}
        username={username}
        channels={team.channels}
        users={team.directMessageMembers}
        onAddChannelModal={this.toggleAddChannelModal}
        onInvitePeopleModal={this.toggleInvitePeopleModal}
        onDirectMessageModal={this.toggleDirectMessageModal}
      />,
      <DirectMessageModal
        teamId={team.id}
        open={openDirectMessageModal}
        onClose={this.toggleDirectMessageModal}
        key="sidebar-direct-message-modal"
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
