import { bass, closedSlap, fingerSlap, fingerTone, mutedSlap, slap, tone } from '../audio';
import { SoundType, Actions } from '../types/DrumTypes';

// Array for mapping to generate view
export const actions: Actions[] = [
  { name: 'Bass', key: 'B', keyCode: 66, sound: SoundType.BASS },
  { name: 'Tone', key: 'T', keyCode: 84, sound: SoundType.TONE },
  { name: 'Slap', key: 'S', keyCode: 83, sound: SoundType.SLAP }
];

// various slap sounds
const slaps = [
  { src: closedSlap, audio: new Audio(closedSlap), type: SoundType.SLAP },
  { src: fingerSlap, audio: new Audio(fingerSlap), type: SoundType.SLAP },
  { src: mutedSlap, audio: new Audio(mutedSlap), type: SoundType.SLAP },
  { src: slap, audio: new Audio(slap), type: SoundType.SLAP },
  { src: fingerTone, audio: new Audio(fingerTone), type: SoundType.SLAP }
];

// the two types of tones
const tones = [
  { src: tone, audio: new Audio(tone), type: SoundType.TONE },
  { src: fingerTone, audio: new Audio(fingerTone), type: SoundType.TONE }
];

// the complete list of sounds
export const sounds = [
  ...slaps,
  ...tones,
  { src: bass, audio: new Audio(bass), type: SoundType.BASS }
];

// valid keycodes that we should respond to.
export const keyCodes = actions.map(ac => ac.keyCode);
