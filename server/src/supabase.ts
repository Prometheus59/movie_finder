import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = "https://sjwgpaolmuswfqseblte.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
