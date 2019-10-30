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
    { name: 'Bass', key: 'B', keyCode: 66, sound: new Audio(bass) },
    { name: 'Tone', key: 'T', keyCode: 84, sound: new Audio(tone) },
    { name: 'Slap', key: 'S', keyCode: 83, sound: new Audio(slap) }
  ];

  const slaps = [
    new Audio(closedSlap),
    new Audio(fingerSlap),
    new Audio(mutedSlap),
    new Audio(slap)
  ];
  const keyCodes = actions.map(ac => ac.keyCode);
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
    if (!keyCodes.includes(keyCode)) return;
    const thing = actions.find(x => x.keyCode === keyCode);
    thing!.sound.currentTime = 0;
    thing!.sound.play();
  };

  return { playSound, actions };
}

interface Actions {
  name: string;
  key: string;
  keyCode: number;
  sound: HTMLAudioElement;
}

interface UseDrums {
  playSound: (e: number | KeyboardEvent) => void;
  actions: Actions[];
}
