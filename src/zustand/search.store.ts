/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

interface SearchState {
    keyword: string;
    onTyping: (keyword: string) => void;
}

const useSearchStore = create<SearchState>((_set, _get) => ({
    keyword: "",
    onTyping: (keyword: string) => {
        _set({ keyword });
    },
}));

export { useSearchStore };
