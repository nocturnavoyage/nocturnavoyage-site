import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseKey = "your-anon-public-key";
export const supabase = createClient(supabaseUrl, supabaseKey);