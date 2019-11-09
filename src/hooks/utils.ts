// This has been appropriated from https://github.com/jaz303/audio-buffer-utils
/**
 * @module  audio-buffer-utils
 */
const getAudioContext = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  } catch {
    alert('Web Audio API is not supported');
  }
};
const ctx = getAudioContext()!;

function isAudioBuffer(buffer: any) {
  //the guess is duck-typing
  return (
    buffer != null &&
    typeof buffer.length === 'number' &&
    typeof buffer.sampleRate === 'number' && //swims like AudioBuffer
    typeof buffer.getChannelData === 'function' && //quacks like AudioBuffer
    // && buffer.copyToChannel
    // && buffer.copyFromChannel
    typeof buffer.duration === 'number'
  );
}

/**
 * Copy data from buffer A to buffer B
 */
function copy(from: AudioBuffer, to: AudioBuffer, offset?: number) {
  validate(from);
  validate(to);

  offset = offset || 0;
  for (
    let channel = 0, l = Math.min(from.numberOfChannels, to.numberOfChannels);
    channel < l;
    channel++
  ) {
    to.getChannelData(channel).set(from.getChannelData(channel), offset);
  }

  return to;
}

/**
 * Assert argument is AudioBuffer, throw error otherwise.
 */
function validate(buffer: AudioBuffer) {
  if (!isAudioBuffer(buffer)) throw new Error('Argument should be an AudioBuffer instance.');
}

/**
 * Create a buffer with the same characteristics as inBuffer, without copying
 * the data. Contents of resulting buffer are undefined.
 */
function shallow(buffer: AudioBuffer) {
  validate(buffer);
  return ctx.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
}

/**
 * Create clone of a buffer
 */
export function clone(buffer: AudioBuffer) {
  return copy(buffer, shallow(buffer));
}
