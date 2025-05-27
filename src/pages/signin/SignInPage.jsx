import React, { useState, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import './SignInPage.scss';
import ErrorMessage from '../../components/ErrorMessage';
import { MobXStoreContext } from '../../stores/MobXStoreContext';

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

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const { userStore } = useContext(MobXStoreContext);
  const navigate = useNavigate();

  const submit = async () => {
    setErrorMessage(null);
    try {
      await userStore.signin(username, password);
      navigate('/tasks');
    } catch (error) {
      const message = error?.response?.data?.message || 'Signin failed';
      setErrorMessage(message);
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="fullscreen-wrapper">
<FormContainer>
  <Heading>Hello!</Heading>
  <p>Fill in your username and password to sign in.</p>

  {errorMessage && <ErrorMessage message={errorMessage} />}

  <form
    onSubmit={(e) => {
      e.preventDefault(); // prevent page reload
      submit();
    }}
  >
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

    <hr />
    <div>
      <Button
        type="submit" // important!
        style={{ marginBottom: '10px' }}
        fullWidth
        variant="contained"
        color="primary"
      >
        SIGN IN
      </Button>
    </div>
  </form>

  <Button fullWidth onClick={goToSignUp}>
    Don't have an account? Sign up now!
  </Button>
</FormContainer>
    </div>
  );
};

export default SignInPage;
