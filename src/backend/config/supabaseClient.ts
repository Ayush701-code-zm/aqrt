// // backend/config/supabaseClient.js
// const { createClient } = require("@supabase/supabase-js");

// // Ensure these are set in your .env file
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// module.exports = { supabase };

// backend/config/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
