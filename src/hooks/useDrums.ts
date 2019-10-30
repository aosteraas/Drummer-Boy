import { useEffect } from 'react';
import { bass, closedSlap, fingerSlap, fingerTone, mutedSlap, slap, tone } from '../audio';
/**
 *
 */
export function useDrums(): UseDrums {
  // add/remove event listeners for appropriate events on load/unload
  useEffect(() => {
    window.addEventListener('keydown', playSound);
    return () => window.removeEventListener('keydown', playSound);
  }, []);

  const actions: Actions[] = [
    { name: 'Bass', key: 'B', keyCode: 66, audio: bass },
    { name: 'Tone', key: 'T', keyCode: 84, audio: tone },
    { name: 'Slap', key: 'S', keyCode: 83, audio: slap }
  ];

  const slaps = [
    new Audio(closedSlap),
    new Audio(fingerSlap),
    new Audio(mutedSlap),
    new Audio(slap)
  ];

  /**
   *
   * @param e a number or keyboard event
   */
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

  return { playSound, actions };
}

interface Actions {
  name: string;
  key: string;
  keyCode: number;
  audio: any;
}

interface UseDrums {
  playSound: (e: number | KeyboardEvent) => void;
  actions: Actions[];
}
