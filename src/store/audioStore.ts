import { create } from "zustand";

interface AudioStore {
  audioSrc: string | null;
  audioName: string | null;
  setAudio: (audioSrc: string, audioName: string) => void;
}

export const useAudioStore = create<AudioStore>()((set) => ({
  audioSrc: null,
  audioName: null,
  setAudio: (audioSrc: string, audioName: string) =>
    set({ audioSrc, audioName }),
}));
