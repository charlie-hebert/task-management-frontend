import React, { useState, useContext } from 'react';
import { TextField, FormControl, Button } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage';
import { MobXStoreContext } from '../../stores/MobXStoreContext'; // 👈 you'll create this

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { tasksStore } = useContext(MobXStoreContext); // 👈 inject your store here

  const handleSubmitTask = async () => {
    try {
      await tasksStore.createTask(title, description);
      navigate('/tasks');
    } catch (error) {
      const message = error?.response?.data?.message || 'Unknown error';
      setErrorMessage(message);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Create a new task</h1>
        <p>Provide information about the task you wish to complete.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <FormControl fullWidth>
          <TextField
            label="Title"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          CREATE TASK
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};

export default CreateTaskPage;
