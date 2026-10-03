// Authentication is a PROPOSAL (fortu_arendusjuhis.md §4): OAuth with Google and Apple,
// no passwords. The prototype uses a mock provider; replace `authService` with a real one.
import type { AuthProviderId, FortuUser } from "../state/types";

export type AuthResult = { ok: true; user: FortuUser } | { ok: false; error: "failed" | "offline" };

export interface AuthService {
  signIn(provider: AuthProviderId): Promise<AuthResult>;
  signOut(): Promise<void>;
}

const mockAuthService: AuthService = {
  async signIn(provider) {
    await new Promise((r) => setTimeout(r, 350));
    const now = new Date().toISOString();
    // No name is requested — the app must render without it.
    return { ok: true, user: { id: `demo-${provider}`, provider, createdAt: now, lastSeenAt: now } };
  },
  async signOut() {},
};

export const authService: AuthService = mockAuthService;
