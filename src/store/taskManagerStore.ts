import { create } from "zustand";
import type { Task } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

type Updates = Pick<Task, "title" | "priority">;

interface TaskManagerStore {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Updates) => void;
}

export const useTaskMangerStore = create<TaskManagerStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title: title,
              completed: false,
              priority: "Low",
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: Date.now() }
              : task,
          ),
        })),
    }),
    {
      name: "task-manager-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
