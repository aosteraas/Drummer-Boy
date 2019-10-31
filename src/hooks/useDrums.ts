import { useEffect, useCallback } from 'react';
import { SoundType, UseDrums } from '../types/DrumTypes';
import { actions, sounds, keyCodes } from '../data';
/**
 *
 */
export function useDrums(): UseDrums {
  const activeClass = 'active';

  // Returns a random sound of the given type
  const getSound = useCallback((soundType: SoundType) => {
    const matches = sounds.filter(s => s.type === soundType);
    return matches[~~(matches.length * Math.random())].audio;
  }, []);

  // add class to animate arm, also if both arms are active then clear that.
  const animateArms = useCallback(() => {
    const arms = [...document.querySelectorAll(`img.arm`)];
    const armsLength = arms.length;

    // if both arms are inactive select one at random to animate.
    const inactive = arms.filter(a => !a.classList.contains(activeClass));
    if (inactive.length === armsLength) {
      arms[~~(armsLength * Math.random())].classList.add(activeClass);
      return;
    }

    // if we have one arm active, animate that and return
    const active = arms.filter(a => a.classList.contains(activeClass));
    if (active.length === 1) {
      active[0].classList.add(activeClass);
      return;
    }
    // otherwise, both arms are active and we should reset them, and also
    // call this function again to animate
    arms.forEach(a => a.classList.remove(activeClass));
    animateArms();
  }, []);

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
      animateArms();

      const { sound } = actions.find(x => x.keyCode === keyCode)!;
      const audio = getSound(sound);

      audio.currentTime = 0;
      audio.play();
    },
    [getSound, animateArms]
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
