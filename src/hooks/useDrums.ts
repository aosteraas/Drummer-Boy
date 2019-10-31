import { useEffect, useCallback } from 'react';
import { bass, closedSlap, fingerSlap, fingerTone, mutedSlap, slap, tone } from '../audio';
import { SoundType, Actions, UseDrums } from '../types/DrumTypes';

/**
 *
 */
export function useDrums(): UseDrums {
  // the actions we support
  const actions: Actions[] = [
    { name: 'Bass', key: 'B', keyCode: 66, sound: SoundType.BASS },
    { name: 'Tone', key: 'T', keyCode: 84, sound: SoundType.TONE },
    { name: 'Slap', key: 'S', keyCode: 83, sound: SoundType.SLAP }
  ];

  const slaps = [
    { audio: new Audio(closedSlap), type: SoundType.SLAP },
    { audio: new Audio(fingerSlap), type: SoundType.SLAP },
    { audio: new Audio(mutedSlap), type: SoundType.SLAP },
    { audio: new Audio(slap), type: SoundType.SLAP },
    { audio: new Audio(fingerTone), type: SoundType.SLAP }
  ];

  const tones = [
    { audio: new Audio(tone), type: SoundType.TONE },
    { audio: new Audio(fingerTone), type: SoundType.TONE }
  ];

  const sounds = [...slaps, ...tones, { audio: new Audio(bass), type: SoundType.BASS }];
  // valid keycodes that we should respond to.
  const keyCodes = actions.map(ac => ac.keyCode);

  // Returns a random sound of the given type
  const getSound = useCallback(
    (soundType: SoundType) => {
      const matches = sounds.filter(s => s.type === soundType);
      return matches[~~(matches.length * Math.random())].audio;
    },
    [sounds]
  );

  /**
   * Plays a sound on valid keypress.
   * @param e a number or keyboard event
   */
  const playSound = useCallback(
    (e: number | KeyboardEvent) => {
      const keyCode = parseKeyCode(e);

      if (!keyCodes.includes(keyCode)) return;
      // add class to animate key
      const key = document.getElementById(`key-${keyCode}`);
      key!.classList.add('playing');
      // add class to animate arm, also if both arms are active then clear that.
      const arm = document.querySelector(`img:not(.active)`);
      if (arm) {
        arm.classList.add('active');
      } else {
        document.querySelectorAll(`img.arm`).forEach(arm => arm.classList.remove('active'));
      }

      const { sound } = actions.find(x => x.keyCode === keyCode)!;
      const audio = getSound(sound);

      audio.currentTime = 0;
      audio.play();
    },
    [actions, keyCodes, getSound]
  );

  // removes the playing class from a button/arm
  const removeTransition = (e: any) => {
    if (e.propertyName !== 'transform') return;
    // remove playing class from key button
    e.target.classList.remove('playing');
    // remove active arm classes
    document.querySelectorAll(`img.arm.active`).forEach(arm => arm.classList.remove('active'));
  };

  // add/remove event listeners for appropriate events on load/unload
  useEffect(() => {
    window.addEventListener('keydown', playSound);
    const keys = Array.from(document.querySelectorAll('.key'));
    // const arms = Array.from(document.querySelectorAll('.arm'));
    // console.log(arms);
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    // cleanup
    return () => {
      window.removeEventListener('keydown', playSound);
      keys.forEach(key => key.removeEventListener('transitionend', removeTransition));
    };
  }, [playSound]);

  // return the correct keycode per event source
  const parseKeyCode = (e: number | KeyboardEvent) => {
    if (typeof e === 'number') {
      return e;
    }
    return e.keyCode;
  };

  return { playSound, actions };
}
