// backend/config/supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

// Ensure these are set in your .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
