import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import Spinner from '../../elements/Spinner';
import { ADD_CLIENT } from '../../../graphQl/mutations/client.mutation';
import { GET_CLIENTS } from '../../../graphQl/queries/clients.queries';

const initialState = {
  name: '',
  email: '',
  phone: '',
};

const AddClient = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setloading] = useState(false);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
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
    setloading(true);
    const { name, email, phone } = formData;
    if (name === '' || email === '' || phone === '') {
      setloading(false);
      return alert('Fill in all fields');
    }
    await addClient(name, email, phone);
    setFormData(initialState);
    setloading(false);
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary border-0'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        tabIndex='-1'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Add Client
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
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                    name='email'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='phone'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e)}
                    name='phone'
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-secondary'
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
  );
};

export default AddClient;
