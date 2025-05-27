import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './index.scss';
import App from './App';

import { MobXStoreContext } from './stores/MobXStoreContext';
import TasksService from './services/tasks.service';
import TasksStore from './stores/tasks.store';
import UserStore from './stores/user.store';
import AuthService from './services/auth.service';

// Initialize services and stores
const services = {};
const stores = {};

services.authService = new AuthService();
services.tasksService = new TasksService(); // Removed routerStore

stores.tasksStore = new TasksStore(services.tasksService);
stores.userStore = new UserStore(services.authService);

// Create root and render
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <MobXStoreContext.Provider value={stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </MobXStoreContext.Provider>
  </React.StrictMode>
);
