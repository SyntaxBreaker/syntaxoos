import { create } from "zustand";

interface AudioStore {
  audioSrc: string | null;
  setAudio: (audioSrc: string, audioFileName: string) => void;
}

export const useAudioStore = create<AudioStore>()((set) => ({
  audioSrc: null,
  setAudio: (audioSrc) => set({ audioSrc }),
}));
