import React from 'react';

import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Bubble = ({ on = true }) =>
  on ? <span className="bubble">●</span> : '○';

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <li className="channels__list--item"># {name}</li>
  </Link>
);

const user = ({ id, username }, teamId) => (
  <li key={`user-${id}`}>
    <Link to={`/view-team/user/${teamId}/${id}`}>
      <Bubble />
      <span className="channels__users-list--item">{username}</span>
    </Link>
  </li>
);

const Channels = ({
  teamName,
  isOwner,
  username,
  users,
  teamId,
  channels,
  onAddChannelModal,
  onInvitePeopleModal,
  onDirectMessageModal,
}) => (
  <div className="channels">
    <div className="channels__heading">
      <div className="channels__heading--team">{teamName}</div>
      {username}
    </div>
    <div>
      <ul className="channels__list">
        <h4 className="channels__heading">
          Channels{' '}
          {isOwner && <Icon name="add circle" onClick={onAddChannelModal} />}
        </h4>
        {channels.map(c => channel(c, teamId))}
      </ul>
    </div>
    <div>
      <ul className="channels__list channels__heading">
        <h4 className="channels__heading">
          Direct Messages<Icon
            name="add circle"
            onClick={onDirectMessageModal}
          />
        </h4>
        {users.map(u => user(u, teamId))}
      </ul>
    </div>
    {isOwner && (
      <div>
        <a href="#invite-people" onClick={onInvitePeopleModal}>
          + Invite people
        </a>
      </div>
    )}
  </div>
);

export default Channels;
