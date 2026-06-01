"use client";

import { useToastStore } from "@/store/toast.store";

export function useToast() {
  const add = useToastStore((s) => s.add);
  return {
    success: (message: string) => add("success", message),
    error: (message: string) => add("error", message),
    info: (message: string) => add("info", message),
  };
}
