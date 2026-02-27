import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { KeyValueItem } from "../types";

interface APIClientResponse<T = any> {
  data: T;
  status: number;
}

interface APIClientStore {
  url: string;
  method: string;
  parameters: KeyValueItem[];
  headers: KeyValueItem[];
  body: string;
  isLoading: boolean;
  response: APIClientResponse | null;
  error: string | null;
  setURL: (url: string) => void;
  setMethod: (method: string) => void;
  setBody: (body: string) => void;
  addHeader: () => void;
  updateHeader: (id: string, updates: Partial<KeyValueItem>) => void;
  removeHeader: (id: string) => void;
  addParameter: () => void;
  updateParameter: (id: string, updates: Partial<KeyValueItem>) => void;
  removeParameter: (id: string) => void;
  sendRequest: () => Promise<void>;
}

export const useAPIClientStore = create<APIClientStore>()(
  persist(
    (set, get) => ({
      url: "https://echo.hoppscotch.io",
      method: "GET",
      parameters: [],
      headers: [],
      body: "",
      isLoading: false,
      response: null,
      error: "",
      setURL: (url) => set({ url: url }),
      setMethod: (method) => set({ method: method }),
      setBody: (body) => set({ body: body }),
      addHeader: () =>
        set((state) => ({
          headers: [
            ...state.headers,
            { id: crypto.randomUUID(), key: "", value: "" },
          ],
        })),
      updateHeader: (id, updates) =>
        set((state) => ({
          headers: state.headers.map((header) =>
            header.id === id ? { ...header, ...updates } : header,
          ),
        })),
      removeHeader: (id) =>
        set((state) => ({
          headers: state.headers.filter((header) => header.id !== id),
        })),
      addParameter: () =>
        set((state) => ({
          parameters: [
            ...state.parameters,
            { id: crypto.randomUUID(), key: "", value: "" },
          ],
        })),
      updateParameter: (id, updates) =>
        set((state) => ({
          parameters: state.parameters.map((parameter) =>
            parameter.id === id ? { ...parameter, ...updates } : parameter,
          ),
        })),
      removeParameter: (id) =>
        set((state) => ({
          parameters: state.parameters.filter(
            (parameter) => parameter.id !== id,
          ),
        })),
      sendRequest: async () => {
        set(() => ({
          isLoading: true,
          error: null,
        }));

        try {
          const { url, method, headers, body, parameters } = get();
          const formattedHeaders = new Headers();
          headers.forEach(
            (header) =>
              header.key &&
              header.value &&
              formattedHeaders.append(header.key, header.value),
          );

          let queryWithParameters = `${url}?${parameters.map((parameter) => `${parameter.key}=${parameter.value}`)}`;

          const res = await fetch(queryWithParameters, {
            headers: formattedHeaders,
            method: method,
            body: method !== "GET" && body ? body : undefined,
          });
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            set({
              response: { data: data, status: res.status },
              isLoading: false,
              error: null,
            });
          } else {
            const textData = await res.text();
            set({
              response: { data: textData, status: res.status },
            });
          }
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: "api-client-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
