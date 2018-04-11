import React from 'react';

import { Link } from 'react-router-dom';

const team = ({ id, letter }) => (
  <Link key={`team-${id}`} to={`/view-team/${id}`}>
    <li className="teams__list--item">{letter}</li>
  </Link>
);

const Teams = ({ teams }) => (
  <div className="teams">
    <ul className="teams__list">{teams.map(team)}</ul>
  </div>
);

export default Teams;
