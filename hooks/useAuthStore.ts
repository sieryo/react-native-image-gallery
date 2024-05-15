import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type Auth = {
  token: string | null;
  setToken: (token: string) => void;
  loadToken: () => void;
  removeToken: () => void;
};

const useAuthStore = create<Auth>()((set) => ({
  token: null,
  setToken: async (token) => {
    await SecureStore.setItemAsync("access_token", token);
    set({ token });
  },
  loadToken: async () => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      set({ token });
    }
  },
  removeToken: async () => {
    await SecureStore.deleteItemAsync('access_token');
    set({ token: null });
  },
}));

export default useAuthStore
