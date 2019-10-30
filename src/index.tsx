import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { GlobalStyle } from './styles/GlobalStyle';
import * as serviceWorker from './serviceWorker';

const StyledApp = () => {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  );
};
ReactDOM.render(<StyledApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
