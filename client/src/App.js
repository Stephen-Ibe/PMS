import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddClient from './components/blocks/Clients/AddClient';

import Header from './components/blocks/Header';
import Projects from './components/blocks/Projects/Projects';
import Clients from './components/blocks/Clients/Clients';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <AddClient />
            <Projects />
            <Clients />
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
