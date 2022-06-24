import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClient from './components/blocks/AddClient';
import Clients from './components/blocks/Clients';
import Header from './components/blocks/Header';
import Projects from './components/blocks/Projects/Projects';

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
        <Header />
        <div className='container'>
          <AddClient />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
