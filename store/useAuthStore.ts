import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { supabase, Profile } from "@/lib/supabase";

type AuthState = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  signOut: () => Promise<void>;
  init: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  profile: null,
  isLoading: true,

  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },

  init: async () => {
    const { data } = await supabase.auth.getSession();
    set({ session: data.session, isLoading: false });

    if (data.session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single();
      set({ profile: profile ?? null });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
      if (!session) set({ profile: null });
    });
  },
}));
