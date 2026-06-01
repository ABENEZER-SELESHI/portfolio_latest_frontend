const ACCESS_KEY = "portfolio_access_token";
const REFRESH_KEY = "portfolio_refresh_token";
const USER_KEY = "portfolio_user";
const LAST_ACTIVITY_KEY = "portfolio_last_activity";

export const tokenStorage = {
  getAccess: () =>
    typeof window !== "undefined" ? localStorage.getItem(ACCESS_KEY) : null,
  getRefresh: () =>
    typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null,
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    tokenStorage.touchActivity();
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
  },
  getUser: (): { id: string; email: string; role: string } | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser: (user: { id: string; email: string; role: string }) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  touchActivity: () => {
    localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
  },
  getLastActivity: (): number => {
    const raw = localStorage.getItem(LAST_ACTIVITY_KEY);
    return raw ? Number(raw) : Date.now();
  },
};
