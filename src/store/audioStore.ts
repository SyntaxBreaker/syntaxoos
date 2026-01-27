import { create } from "zustand";

interface AudioStore {
  audioSrc: string | null;
  audioFileName: string | null;
  setAudio: (audioSrc: string, audioFileName: string) => void;
}

export const useAudioStore = create<AudioStore>()((set) => ({
  audioSrc: null,
  audioFileName: null,
  setAudio: (audioSrc, audioFileName) => set({ audioSrc, audioFileName }),
}));
