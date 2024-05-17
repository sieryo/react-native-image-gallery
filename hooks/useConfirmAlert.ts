import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export type ConfirmAlert = {
  isClosed: boolean;
  callback: () => void;
  setCallback: (callback: () => void) => void;
  toggleIsClosed: () => void;
};

const useConfirmAlert = create<ConfirmAlert>()((set) => ({
  isClosed: true,
  toggleIsClosed: () => set((state) => ({ isClosed: !state.isClosed })),
  setCallback: (callback) => set(() => ({ callback: callback })),
  callback: () => {},
}));

export default useConfirmAlert;
