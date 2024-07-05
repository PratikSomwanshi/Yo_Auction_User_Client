import { create } from "zustand";

type Store = {
    username: string | null;
    setUser: (payload: string) => void;
};

const useStore = create<Store>()((set) => ({
    username: null,
    setUser: (payload: string) => set((state) => ({ username: payload })),
}));

export default useStore;
