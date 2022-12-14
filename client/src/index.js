import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './App';
import { store } from './store/store';
import './index.css';
import UserContextProvider from './context/User.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider>
    <BrowserRouter>
      <UserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContextProvider>
    </BrowserRouter>
  </StyledEngineProvider>,
);
