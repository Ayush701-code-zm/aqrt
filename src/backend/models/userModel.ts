import { User as SupabaseUser } from "@supabase/supabase-js";

class User {
  id: string | null;
  email: string;
  name: string | null;
  createdAt: string | null;

  constructor(
    email: string,
    name: string | null,
    id: string | null = null,
    createdAt: string | null = null
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
  }

  static fromSupabase(supabaseUser: SupabaseUser): User {
    return new User(
      supabaseUser.email || "",
      supabaseUser.user_metadata?.name || null,
      supabaseUser.id,
      supabaseUser.created_at
    );
  }
}

export default User;
