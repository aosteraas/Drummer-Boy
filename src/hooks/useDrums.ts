import { bass, closedSlap, fingerSlap, fingerTone, mutedSlap, slap, tone } from '../audio';
/**
 *
 */
export function useDrums() {
  const actions = [
    { name: 'Bass', key: 'B', keyCode: 66, audio: bass },
    { name: 'Tone', key: 'T', keyCode: 84, audio: tone },
    { name: 'Slap', key: 'S', keyCode: 83, audio: slap }
  ];

  /**
   *
   * @param e
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

  return { playSound };
}
