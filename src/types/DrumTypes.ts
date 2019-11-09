export enum SoundType {
  BASS,
  TONE,
  SLAP
}

export interface Actions {
  name: string;
  key: string;
  keyCode: number;
  sound: SoundType;
}

export interface UseDrums {
  playSound: (e: number | KeyboardEvent) => void;
  actions: Actions[];
}

export interface SoundData {
  type: SoundType;
  buffer: ArrayBuffer;
}

export interface Parsed {
  type: SoundType;
  audio: AudioBuffer;
}
