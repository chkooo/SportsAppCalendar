import { supabase } from "./lib/supabase";

export const testSupabase = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: "jesman29game@gmail.com",
    password: "password123",
    options: {
      data: { name: "ChkoUser2" },
    },
  });

  console.log("data:", data);
  console.log("error:", error);
};
