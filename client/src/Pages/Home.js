import React from 'react';
import AddClient from '../components/blocks/Clients/AddClient';
import Projects from '../components/blocks/Projects/Projects';
import Clients from '../components/blocks/Clients/Clients';
import AddProject from '../components/blocks/Projects/AddProject';

const Home = () => {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClient />
        <AddProject />
      </div>
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
