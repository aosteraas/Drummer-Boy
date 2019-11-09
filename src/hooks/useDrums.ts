import { useEffect, useCallback, useState } from 'react';
import { SoundType, UseDrums, Parsed } from '../types/DrumTypes';
import { actions, sounds, keyCodes } from '../data';
import { clone } from './utils';

// polyfill for Safari
if (!window.AudioContext && window.webkitAudioContext) {
  const oldFunc = webkitAudioContext.prototype.decodeAudioData;
  webkitAudioContext.prototype.decodeAudioData = function(arraybuffer: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      oldFunc.call(this, arraybuffer, resolve, reject);
    });
  };
}

// A wise man once said "you should probably wrap this in a try catch"
const ctx = new (window.AudioContext || window.webkitAudioContext)();

/**
 *
 */
export function useDrums(): UseDrums {
  const activeClass = 'active';
  const [parsed, setParsed] = useState<Parsed[]>();

  useEffect(() => {
    loadAll();
  }, []);

  // Loads all audio assets
  const loadAll = async () => {
    // map sounds to create many requests with minimum typing
    const requests = sounds.map(async s => {
      const r = await fetch(s.src);
      const buffer = await r.arrayBuffer();
      return { type: s.type, buffer };
    });
    // It's an array of promises so we can await them all completing
    const soundData = await Promise.all(requests);
    // However the data type is `ArrayBuffer`, which is a byte array in basically
    // any other language
    const parsable = soundData.map(async d => {
      const sliced = d.buffer.slice(0);
      const audio = await ctx.decodeAudioData(sliced);
      return { type: d.type, audio };
    });
    // Again we have an array of promises we need to await completing.
    const parsed: Parsed[] = await Promise.all(parsable);
    // Finally, set these in state for future use.
    setParsed(parsed);
  };

  // Returns a random sound of the given type
  const getSound = useCallback(
    (soundType: SoundType) => {
      const matches = parsed!.filter(s => s.type === soundType);
      return matches[~~(matches.length * Math.random())];
    },
    [parsed]
  );

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
      // return early if invalid
      const keyCode = parseKeyCode(e);
      if (!keyCodes.includes(keyCode)) return;
      // add class to animate key
      const key = document.getElementById(`key-${keyCode}`);
      key!.classList.add('playing');
      // and animate the arms
      animateArms();
      // find the sound type to play per the key pressed
      const { sound: action } = actions.find(x => x.keyCode === keyCode)!;
      // then get the sound
      const audio = getSound(action);
      // create a buffer source (yes this is necessary for each time we play a sound)
      const source = ctx.createBufferSource();
      // clone the original sound because otherwise we can't overlap
      source.buffer = clone(audio.audio);
      // connect to the audio destination (output) and play
      source.connect(ctx.destination);
      source.start();
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
