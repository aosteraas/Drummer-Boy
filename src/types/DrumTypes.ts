export enum SoundType {
  BASS,
  TONE,
  SLAP
}

export interface Actions {
  name: string;
  key: string;
  keyCode: number;
  audio: HTMLAudioElement;
  sound: SoundType;
}

export interface UseDrums {
  playSound: (e: number | KeyboardEvent) => void;
  actions: Actions[];
}
