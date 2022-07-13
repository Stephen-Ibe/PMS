import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../graphQl/queries/project.queries';
import Spinner from '../components/elements/Spinner';
import ClientInfo from '../components/blocks/Clients/ClientInfo';
import DeleteProject from '../components/blocks/Projects/DeleteProject';
import EditProject from '../components/blocks/Projects/EditProject';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 p-5 card'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <EditProject project={data.project} />
          <DeleteProject projectId={data.project.id} />
        </div>
      )}
    </>
  );
};

export default Project;
