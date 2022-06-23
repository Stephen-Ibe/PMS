import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/blocks/Clients';
import Header from './components/blocks/Header';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
