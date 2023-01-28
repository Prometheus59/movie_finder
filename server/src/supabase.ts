import { createClient } from "@supabase/supabase-js";
require("dotenv").config({ path: "../../.env" });

// console.log(process.env);
const supabaseUrl = "https://sjwgpaolmuswfqseblte.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  let { data: movies, error } = await supabase.from("movies").select("*");

  if (error) {
    console.log(error);
  }
  console.log(data);
  console.log("Function completed");
  return;
}

testSupabase();
