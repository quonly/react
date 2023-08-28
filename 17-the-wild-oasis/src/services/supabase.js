import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = "https://dsyfbiqeswjlacmzonux.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzeWZiaXFlc3dqbGFjbXpvbnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NDY5NDksImV4cCI6MjAwODUyMjk0OX0._pmfMsTiuWI8xPVYyg2TpqZtEMm8D1kZZkjCFZ-4wlQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
