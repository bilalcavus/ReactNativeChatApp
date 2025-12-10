import { create } from "zustand";

import { LoginRequest } from "../../data/model/auth/LoginRequest";
import { login, register } from "../../data/service/AuthService";
import { AuthViewModelState } from "./AuthState";
import { clearTokens, saveTokens } from "../../data/storage/TokenStorage";
import { RegisterRequest } from "../../data/model/auth/RegisterRequest";


export const useAuthViewModel = create<AuthViewModelState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  accessJti: null,
  refreshJti: null,

  isLoading: false,
  error: null,
  isReady : false,

  setAuth: (data) => set({
    user: data.user ?? useAuthViewModel.getState().user,
    accessToken: data.accessToken ?? useAuthViewModel.getState().accessToken,
    refreshToken: data.refreshToken ?? useAuthViewModel.getState().refreshToken,
    accessJti: data.accessJti ?? useAuthViewModel.getState().accessJti,
    refreshJti: data.refreshJti ?? useAuthViewModel.getState().refreshJti,
    isReady: true,
  }),

  setReady: () => set({isReady: true}),

  login: async (body: LoginRequest) => {
    try {
      set({ isLoading: true, error: null });

      const response = await login(body);
      await saveTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        accessJti: response.data.accessJti,
        refreshJti: response.data.refreshJti,
        isLoading: false,
        isReady: true,
      });


      return response.data;

    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return null;
    }
  },

  register : async (body: RegisterRequest) => {
    try {
      set({ isLoading: true, error: null });
      const response = await register(body);
      await saveTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        accessJti: response.data.accessJti,
        refreshJti: response.data.refreshJti,
        isLoading: false,
        isReady: true,
      });
      return response.data;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return null;
    }
  },

  logout: async () => {
    await clearTokens();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      accessJti: null,
      refreshJti: null,
      error: null,
      isReady: true
    });
  },
}));
