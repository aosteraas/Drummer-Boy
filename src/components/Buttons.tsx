import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const Button = styled.button`
  color: #09d3ac;
  border: 3px solid #09d3ac;
  border-radius: 3px;
  background: transparent;
  width: 5rem;
  height: 5rem;
  font-size: 1.5rem;
`;

const ButtonRow = styled.section`
  display: flex;
  width: 50vw;
  justify-content: space-evenly;
`;

const Kbd = styled.kbd`
  display: block;
  border: 1px solid grey;
  border-radius: 3px;
  background: rgba(128, 128, 128, 0.5);
`;

export const Buttons = () => {
  const actions = [
    { name: 'Bass', key: 'B', keyCode: 66, audio: '/audio/bass.wav' },
    { name: 'Tone', key: 'T', keyCode: 84, audio: '/audio/tone.wav' },
    {
      name: 'Slap',
      key: 'S',
      keyCode: 83,
      audio: '/audio/open-slap.wav'
    }
  ];

  useEffect(() => {
    window.addEventListener('keydown', playSound);
    return () => window.removeEventListener('keydown', playSound);
  }, []);

  const playSound = (e: number | KeyboardEvent) => {
    let keyCode: number;
    if (typeof e === 'number') {
      keyCode = e;
    } else {
      keyCode = e.keyCode;
    }
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`) as HTMLAudioElement;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <ButtonRow>
      {actions.map(ac => (
        <Button key={ac.key} onClick={() => playSound(ac.keyCode)}>
          <div>{ac.name}</div>
          <Kbd>{ac.key}</Kbd>
          <audio data-key={ac.keyCode} src={ac.audio}></audio>
        </Button>
      ))}
    </ButtonRow>
  );
};
