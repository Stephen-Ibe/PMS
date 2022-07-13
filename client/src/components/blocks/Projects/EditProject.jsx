import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { UPDATE_PROJECT } from '../../../graphQl/mutations/project.mutations';
import { GET_PROJECT } from '../../../graphQl/queries/project.queries';

const EditProject = ({ project }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: '',
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: formData.name,
      description: formData.description,
      status: formData.status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

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
    await updateProject(name, description, status);
    alert('Project Updated Successfully');
  };

  return (
    <div className='mt-5'>
      <h3>Update Project</h3>
      <form className='mt-2' onSubmit={handleSubmit}>
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
            name='description'
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='status' className='form-label'>
            Status
          </label>
          <select
            id='status'
            name='status'
            className='form-select'
            value={formData.status}
            onChange={(e) => handleInputChange(e)}
          >
            <option value='new'>Not Started</option>
            <option value='progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProject;
