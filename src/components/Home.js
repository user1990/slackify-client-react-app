import React from 'react';

import { graphql } from 'react-apollo';
import { allUsersQuery } from '../graphql/queries/queries.js';

const Home = ({ data: { allUsers = [] } }) =>
  allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);

export default graphql(allUsersQuery)(Home);
