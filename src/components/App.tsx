import React from 'react';
import { AppStyle } from '../styles/AppStyles';
import { Drum } from './Drum';
import { Buttons } from './Buttons';

const App: React.FC = () => {
  return (
    <AppStyle>
      <div className="App">
        <header className="App-header">
          <h2>The Title</h2>
        </header>
        <main>
          <Drum />
          <Buttons />
        </main>
      </div>
    </AppStyle>
  );
};

export default App;
