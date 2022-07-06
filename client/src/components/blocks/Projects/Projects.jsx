import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../../graphQl/queries/project.queries';
import Spinner from '../../elements/Spinner';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div class='row mt-5'>
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
