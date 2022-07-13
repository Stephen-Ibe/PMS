import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import Spinner from '../../elements/Spinner';
import { GET_CLIENTS } from '../../../graphQl/queries/clients.queries';

const initialState = {
  name: '',
  description: '',
  clientId: '',
  status: 'new',
};

const AddProject = () => {
  const [formData, setFormData] = useState(initialState);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, status } = formData;
    if (name === '' || description === '' || status === '') {
      return alert('Fill in all fields');
    }

    setFormData(initialState);
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary border-0'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            tabIndex='-1'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModalLabel'>
                    New Project
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={formData.name}
                        onChange={(e) => handleInputChange(e)}
                        name='name'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='description'>Description</label>
                      <textarea
                        className='form-control'
                        id='description'
                        value={formData.description}
                        onChange={(e) => handleInputChange(e)}
                        name='email'
                      ></textarea>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='status' className='form-label'>
                        Status
                      </label>
                      <select
                        id='status'
                        className='form-select'
                        value={formData.status}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='clientId' className='form-label'>
                        Client
                      </label>
                      <select
                        name='clientId'
                        id='clientId'
                        className='form-select'
                        value={formData.clientId}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type='submit'
                      className='btn btn-primary mt-4'
                      data-bs-dismiss='modal'
                    >
                      {loading ? <Spinner /> : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProject;
