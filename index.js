import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
