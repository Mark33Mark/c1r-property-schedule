import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { App } from './components/App';
import { store } from './store';
import './index.scss';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = createRoot(document.getElementById('root'));

root.render(
  
    <StrictMode>
      <Provider store={store}>

          <Router>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>

      </Provider>
    </StrictMode>

);
