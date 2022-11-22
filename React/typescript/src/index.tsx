import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider} from "styled-components";     //Theme를 쓰려면 import 해야 함


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

