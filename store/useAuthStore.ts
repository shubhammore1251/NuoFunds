import { create } from "zustand";

type User = { id: string; name: string; email: string } | null;

type AuthState = {
  user: User;
  isLoggedIn: boolean;
  consentGiven: boolean;
  login: (user: User) => void;
  logout: () => void;
  setConsent: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  consentGiven: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false, consentGiven: false }),
  setConsent: (v: boolean) => set({ consentGiven: v }),
}));
