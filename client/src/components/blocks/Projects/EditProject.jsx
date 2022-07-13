import React, { useState } from 'react';

const initialState = {
  name: '',
  description: '',
  status: '',
};

const EditProject = ({ project }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, status } = formData;
    if (name === '' || description === '' || status === '') {
      return alert('Fill in all fields');
    }
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
