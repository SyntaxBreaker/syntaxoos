import { create } from "zustand";

interface User {
  id: number;
  username: string;
  displayName: string;
}

interface AccountStore {
  user: User;
  updateUsername: (username: string) => void;
}

export const useAccountStore = create<AccountStore>()((set) => ({
  user: {
    id: 0,
    username: "guest",
    displayName: "guest",
  },
  updateUsername: (username) => {
    set((state) => ({ user: { ...state.user, username: username } }));
  },
}));