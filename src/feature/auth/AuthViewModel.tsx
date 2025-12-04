import { create } from "zustand";

import { LoginRequest } from "../../data/model/auth/LoginRequest";
import { login } from "../../data/service/UserService";
import { AuthViewModelState } from "./AuthState";


export const useAuthViewModel = create<AuthViewModelState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  accessJti: null,
  refreshJti: null,

  isLoading: false,
  error: null,

  login: async (body: LoginRequest) => {
    try {
      set({ isLoading: true, error: null });

      const response = await login(body);
    console.log("🟢 LOGIN SUCCESS:", response); // gelen data’nın tamamı
    console.log("🟢 USER:", response.data.user); 
    console.log("🟢 ACCESS TOKEN:", response.data.accessToken);


      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        accessJti: response.data.accessJti,
        refreshJti: response.data.refreshJti,
        isLoading: false,
      });


      return response.data;

    } catch (err: any) {
        console.log("🔴 LOGIN ERROR:", err.response?.data || err.message);
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return null;
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      accessJti: null,
      refreshJti: null,
      error: null,
    });
  },
}));
