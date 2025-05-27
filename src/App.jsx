import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import TasksPage from './pages/tasks/TasksPage';
import CreateTaskPage from './pages/create-task/CreateTaskPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/create" element={<CreateTaskPage />} />
    </Routes>
  );
};

export default observer(App);
