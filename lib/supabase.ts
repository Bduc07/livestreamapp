import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env vars. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_creator: boolean;
  created_at: string;
};

export type Stream = {
  id: string;
  creator_id: string;
  title: string;
  status: "scheduled" | "live" | "ended" | "processing" | "published";
  playback_url: string | null;
  thumbnail_url: string | null;
  ivs_channel_arn: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
};
