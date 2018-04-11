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
    const { teams, team } = this.props;
    const { openAddChannelModal, openInvitePeopleModal } = this.state;

    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (err) {
      console.log(err);
    }

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        team={team}
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
