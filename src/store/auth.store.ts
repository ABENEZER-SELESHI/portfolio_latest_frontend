"use client";

import { create } from "zustand";
import { INACTIVITY_TIMEOUT_MS } from "@/constants";
import { authService } from "@/services/auth.service";
import { tokenStorage } from "@/utils/storage";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  touchActivity: () => void;
  checkInactivity: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(email, password);
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      tokenStorage.setUser(data.user);
      set({ user: data.user, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    const refresh = tokenStorage.getRefresh();
    try {
      if (refresh) await authService.logout(refresh);
    } catch {
      /* ignore */
    } finally {
      tokenStorage.clear();
      set({ user: null, isAuthenticated: false });
    }
  },

  hydrate: async () => {
    const access = tokenStorage.getAccess();
    const storedUser = tokenStorage.getUser();
    if (!access || !storedUser) {
      set({ isHydrated: true, isAuthenticated: false, user: null });
      return;
    }
    if (get().checkInactivity()) {
      await get().logout();
      set({ isHydrated: true });
      return;
    }
    set({ user: storedUser, isAuthenticated: true, isLoading: true });
    try {
      const user = await authService.me();
      tokenStorage.setUser(user);
      tokenStorage.touchActivity();
      set({ user, isAuthenticated: true });
    } catch {
      tokenStorage.clear();
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false, isHydrated: true });
    }
  },

  touchActivity: () => {
    if (get().isAuthenticated) tokenStorage.touchActivity();
  },

  checkInactivity: () => {
    const last = tokenStorage.getLastActivity();
    return Date.now() - last > INACTIVITY_TIMEOUT_MS;
  },
}));
