import React from 'react';

import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Bubble = ({ on = true }) =>
  on ? <span className="bubble">●</span> : '○';

const channel = ({ id, name }, team) => (
  <Link key={`channel-${id}`} to={`/view-team/${team}/${id}`}>
    <li className="channels__list--item"># {name}</li>
  </Link>
);

const user = ({ id, name }) => (
  <li key={`user-${id}`}>
    <Bubble />
    <span className="channels__users-list--item">{name}</span>
  </li>
);

const Channels = ({
  team,
  isOwner,
  username,
  users,
  onAddChannelModal,
  onInvitePeopleModal,
}) => (
  <div className="channels">
    <div className="channels__heading">
      <div className="channels__heading--team">{team.name}</div>
      {username}
    </div>
    <div>
      <ul className="channels__list">
        <h4 className="channels__heading">
          Channels{' '}
          {isOwner && <Icon name="add circle" onClick={onAddChannelModal} />}
        </h4>
        {team.channels.map(c => channel(c, team.id))}
      </ul>
    </div>
    <div>
      <ul className="channels__list channels__heading">
        <h4 className="channels__heading">Direct Messages</h4>
        {users.map(user)}
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
