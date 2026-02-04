import { create } from "zustand";
import type { User } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

interface AccountStore {
  user: User;
  updateUser: (user: Omit<User, "id">) => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      user: {
        id: 0,
        username: "guest",
        displayName: "guest",
      },
      updateUser: (user) => {
        set((state) => ({
          user: { ...state.user, ...user },
        }));
      },
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
