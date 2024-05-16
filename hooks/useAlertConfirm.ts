import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export type AlertConfirm = {
  isClosed: boolean;
  callback: () => void;
  setCallback: (callback: () => void) => void;
  toggleIsClosed: () => void;
};

const useAlertConfirm = create<AlertConfirm>()((set) => ({
  isClosed: true,
  toggleIsClosed: () => set((state) => ({ isClosed: !state.isClosed })),
  setCallback: (callback) => set(() => ({ callback: callback })),
  callback: () => {},
}));

export default useAlertConfirm;
