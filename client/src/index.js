import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './App';
import { store } from './store/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider>
    <BrowserRouter>

      <Provider store={store}>
        <App />
      </Provider>

    </BrowserRouter>
    ,
  </StyledEngineProvider>,
);
