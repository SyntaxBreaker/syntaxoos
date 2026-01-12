import { create } from "zustand";
import type { User } from "../types";

interface AccountStore {
  user: User;
  updateUser: (user: Omit<User, "id">) => void;
}

export const useAccountStore = create<AccountStore>()((set) => ({
  user: {
    id: 0,
    username: localStorage.getItem("username") || "guest",
    displayName: localStorage.getItem("displayName") || "guest",
  },
  updateUser: (user) => {
    set((state) => ({ user: { ...state.user, ...user } }));
  },
}));
