import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://sjwgpaolmuswfqseblte.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqd2dwYW9sbXVzd2Zxc2VibHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4MDY3MjYsImV4cCI6MTk5MDM4MjcyNn0.56pjQiCgOgG5JnGBj0k9B6PulJPhBN9gV4Pi1-k37Mw"
);

const Login = () => {
  return (
    <Auth
      supabaseClient={supabase}
      // Add theme here
      appearance={{ theme: ThemeSupa }}
      providers={["google", "github", "facebook"]}
    />
  );
};

export default Login;
