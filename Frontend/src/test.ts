import { supabase } from "./lib/supabase";

const { data, error } = await supabase.auth.signUp({
  email: "testuser4@email.com",
  password: "password123",
  options: {
    data: { name: "Test User" },
  },
});

console.log("data:", data);
console.log("error:", error);
