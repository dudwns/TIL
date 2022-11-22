import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider} from "styled-components";     //Theme를 쓰려면 import 해야 함


const root = ReactDOM.createRoot(document.getElementById('root'));

const darkTheme = {
  textColor:"whitesmoke",
  backgroundColor:"#111",
}

const lightTheme = {
  textColor:"#111",
  backgroundColor:"whitesmoke",
}

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>  {/*<ThemeProvider>로 감싸줘야 됨, theme prop만 바꾸면 모드 변경 가능 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

