import { apiClient, unwrap } from "./api-client";
import type { AuthTokens, User } from "@/types";

export const authService = {
  login: (email: string, password: string) =>
    unwrap<AuthTokens>(apiClient.post("/auth/login", { email, password })),
  logout: (refreshToken: string) =>
    unwrap<null>(apiClient.post("/auth/logout", { refreshToken })),
  me: () => unwrap<User>(apiClient.get("/auth/me")),
};
