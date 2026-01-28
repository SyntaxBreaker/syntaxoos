import { create } from "zustand";

interface Definition {
  definition: string;
}

interface Meaning {
  definitions: Definition[];
  synonyms: string[];
}

interface ApiReponse {
  meanings: Meaning[];
}

interface DictionaryData {
  word: string;
  meanings: { definitions: string[]; synonyms: string[] };
}

interface DictionaryStore {
  wordDetails: DictionaryData | null;
  isLoading: boolean;
  error: string | null;
  searchWord: (word: string) => Promise<void>;
}

export const useDictionaryStore = create<DictionaryStore>()((set) => ({
  wordDetails: null,
  isLoading: false,
  error: null,
  searchWord: async (word) => {
    set(() => ({ wordDetails: null, error: null, isLoading: true }));
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      if (!response.ok) throw new Error("Word not found");
      const rawData: ApiReponse[] = await response.json();
      const allDefinitions = rawData.flatMap((entry) =>
        entry.meanings.flatMap((m) =>
          m.definitions.flatMap((d) => d.definition),
        ),
      );
      const allSynonyms = rawData.flatMap((entry) =>
        entry.meanings.flatMap((meaning) => meaning.synonyms),
      );

      set((state) => ({
        ...state,
        isLoading: false,
        error: null,
        wordDetails: {
          word: word,
          meanings: {
            definitions: allDefinitions,
            synonyms: [...new Set(allSynonyms)],
          },
        },
      }));
    } catch (err) {
      set(() => ({
        wordDetails: null,
        error: (err as Error).message,
        isLoading: false,
      }));
    }
  },
}));
