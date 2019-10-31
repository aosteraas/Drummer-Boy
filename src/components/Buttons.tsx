import React from 'react';
import styled from 'styled-components/macro';
import { ButtonRow, Button } from '../styles/ButtonRow';
import { useDrums } from '../hooks/useDrums';

const Kbd = styled.kbd`
  display: block;
  border: 1px solid grey;
  border-radius: 3px;
  background: rgba(128, 128, 128, 0.5);
`;

export const Buttons = () => {
  const { playSound, actions } = useDrums();

  return (
    <ButtonRow>
      {actions.map(ac => (
        <Button
          id={`key-${ac.keyCode}`}
          className="key"
          key={ac.key}
          onClick={() => playSound(ac.keyCode)}
        >
          <div>{ac.name}</div>
          <Kbd>{ac.key}</Kbd>
        </Button>
      ))}
    </ButtonRow>
  );
};
