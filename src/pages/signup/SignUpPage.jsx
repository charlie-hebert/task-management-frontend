import React, { useState, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage';
import { MobXStoreContext } from '../../stores/MobXStoreContext';

import './SignUpPage.scss';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { userStore } = useContext(MobXStoreContext);

  const submit = async () => {
    try {
      await userStore.signup(username, password);
      navigate('/signin');
    } catch (error) {
      const message = error?.response?.data?.message || 'Signup failed';
      setErrorMessage(message);
    }
  };

  return (
    <div className="fullscreen-wrapper">
      <FormContainer>
        <Heading>Join us!</Heading>
        <p>Start managing tasks easily.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div>
          <FormField
            label="Username"
            margin="dense"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <FormField
            label="Password"
            margin="dense"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>
          Passwords must contain at least 1 upper case letter, 1 lower case letter and one number OR special character.
        </p>
        <hr />
        <div>
          <Button fullWidth variant="contained" color="primary" onClick={submit}>
            SIGN UP
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default SignUpPage;
