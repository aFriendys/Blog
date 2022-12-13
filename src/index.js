import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import 'antd/dist/antd.css';
import './index.css';
import App from './components/App';
import api from './redux/serverApi';
import serverSlice from './redux/serverSlice';

const rootReducer = combineReducers({ [api.reducerPath]: api.reducer, serverSlice });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
