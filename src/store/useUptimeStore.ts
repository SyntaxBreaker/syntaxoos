import { create } from "zustand";

interface UptimeStore {
  startTime: number;
  getUptime: () => string;
}

export const useUptimeStore = create<UptimeStore>()((_, get) => ({
  startTime: Date.now(),
  getUptime: () => {
    const currentTime = Date.now();
    const diffInSeconds = Math.floor((currentTime - get().startTime) / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `Current uptime: ${hours}h ${minutes}m ${seconds}s`;
  },
}));
