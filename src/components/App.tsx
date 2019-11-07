import React from 'react';
import { AppStyle } from '../styles/AppStyles';
import { Drum } from './Drum';
import { Body } from './Body';
import { Buttons } from './Buttons';
import { Header } from './Header';

const App: React.FC = () => {
  return (
    <AppStyle>
      <Header>
        <h2>Cemre's Djembe</h2>
        <h4>
          (because his name is pronounced <em>djemre</em>
        </h4>
      </Header>
      <main>
        <Body />
        <Drum />
        <Buttons />
      </main>
    </AppStyle>
  );
};

export default App;
