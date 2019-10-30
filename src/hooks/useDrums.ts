import { useEffect, useCallback } from 'react';
import { bass, closedSlap, fingerSlap, fingerTone, mutedSlap, slap, tone } from '../audio';
import { SoundType, Actions, UseDrums } from '../types/DrumTypes';
/**
 *
 */
export function useDrums(): UseDrums {
  // the actions we support
  const actions: Actions[] = [
    { name: 'Bass', key: 'B', keyCode: 66, audio: new Audio(bass), sound: SoundType.BASS },
    { name: 'Tone', key: 'T', keyCode: 84, audio: new Audio(tone), sound: SoundType.TONE },
    { name: 'Slap', key: 'S', keyCode: 83, audio: new Audio(slap), sound: SoundType.SLAP }
  ];
  // various types of slaps
  const slaps = [
    new Audio(closedSlap),
    new Audio(fingerSlap),
    new Audio(mutedSlap),
    new Audio(slap),
    new Audio(fingerTone)
  ];
  // valid keycodes that we should respond to.
  const keyCodes = actions.map(ac => ac.keyCode);

  /**
   * Plays a sound on valid keypress.
   * @param e a number or keyboard event
   */
  const playSound = useCallback(
    (e: number | KeyboardEvent) => {
      const keyCode = parseKeyCode(e);
      if (!keyCodes.includes(keyCode)) return;

      const { audio, sound } = actions.find(x => x.keyCode === keyCode)!;

      if (sound === SoundType.SLAP) {
        const slap = slaps[~~(slaps.length * Math.random())];
        slap.currentTime = 0;
        slap.play();
      } else {
        audio.currentTime = 0;
        audio.play();
      }
    },
    [actions, keyCodes, slaps]
  );

  // add/remove event listeners for appropriate events on load/unload
  useEffect(() => {
    window.addEventListener('keydown', playSound);
    return () => window.removeEventListener('keydown', playSound);
  }, [playSound]);

  const parseKeyCode = (e: number | KeyboardEvent) => {
    if (typeof e === 'number') {
      return e;
    }
    return e.keyCode;
  };

  return { playSound, actions };
}
