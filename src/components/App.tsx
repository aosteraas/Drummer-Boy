import React from 'react';
import { AppStyle } from '../styles/AppStyles';
import { Drum } from './Drum';
import { Body } from './Body';
import { Buttons } from './Buttons';

const App: React.FC = () => {
  return (
    <AppStyle>
      <header>
        <h2>The Title</h2>
      </header>
      <main>
        <Body />
        <Drum />
        <Buttons />
      </main>
    </AppStyle>
  );
};

export default App;
