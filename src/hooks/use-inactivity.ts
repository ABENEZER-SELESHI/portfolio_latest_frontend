"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

const EVENTS = ["mousedown", "keydown", "scroll", "touchstart"] as const;

export function useInactivity() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const touchActivity = useAuthStore((s) => s.touchActivity);
  const checkInactivity = useAuthStore((s) => s.checkInactivity);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!isAuthenticated) return;

    const onActivity = () => touchActivity();
    EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    const interval = setInterval(() => {
      if (checkInactivity()) logout();
    }, 60_000);

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, onActivity));
      clearInterval(interval);
    };
  }, [isAuthenticated, touchActivity, checkInactivity, logout]);

  useEffect(() => {
    const onLogout = () => logout();
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, [logout]);
}
