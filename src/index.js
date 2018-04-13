import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';
import './styles/styles.css';
import AppRouter from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';

const App = (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route component={AppRouter} />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
