import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { KeyValueItem } from "../types";

interface APIClientResponse<T = any> {
  data: T;
  status: number;
  contentType: string;
}

interface APIClientStore {
  url: string;
  method: string;
  parameters: KeyValueItem[];
  headers: KeyValueItem[];
  body: string;
  bodyContentType: string;
  isLoading: boolean;
  response: APIClientResponse | null;
  error: string | null;
  setURL: (url: string) => void;
  setMethod: (method: string) => void;
  setBody: (body: string) => void;
  setBodyContentType: (bodyContentType: string) => void;
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
      bodyContentType: "application/json",
      isLoading: false,
      response: null,
      error: "",
      setURL: (url) => set({ url: url }),
      setMethod: (method) => set({ method: method }),
      setBody: (body) => set({ body: body }),
      setBodyContentType: (bodyContentType) =>
        set({ bodyContentType: bodyContentType }),
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
          const { url, method, headers, body, parameters, bodyContentType } =
            get();
          const formattedHeaders = new Headers();
          headers.forEach(
            (header) =>
              header.key.trim() &&
              header.value.trim() &&
              formattedHeaders.append(header.key, header.value),
          );

          const searchParameters = new URLSearchParams();
          parameters.forEach((parameter) => {
            if (parameter.key.trim()) {
              searchParameters.append(parameter.key, parameter.value);
            }
          });

          const queryString = searchParameters.toString();
          const queryWithParameters = queryString
            ? `${url}?${queryString}`
            : url;

          if (method !== "GET" && body) {
            formattedHeaders.set("Content-Type", bodyContentType);
          }

          const res = await fetch(queryWithParameters, {
            headers: formattedHeaders,
            method: method,
            body: method !== "GET" && body ? body : undefined,
          });

          const contentTypeHeader =
            res.headers.get("Content-Type") || "text/plain";

          let data;
          if (contentTypeHeader.includes("application/json")) {
            data = await res.json();
          } else {
            data = await res.text();
          }

          set({
            response: {
              data: data,
              status: res.status,
              contentType: contentTypeHeader,
            },
            isLoading: false,
            error: null,
          });
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
