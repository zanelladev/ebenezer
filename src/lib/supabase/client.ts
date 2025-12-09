import { createBrowserClient } from "@supabase/ssr"

let clientInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  // Return cached instance if it exists
  if (clientInstance) {
    return clientInstance
  }

  const supabaseUrl =
    typeof window !== "undefined"
      ? (window as any).__NEXT_PUBLIC_SUPABASE_URL__ || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
      : process.env.NEXT_PUBLIC_SUPABASE_URL || ""

  const supabaseKey =
    typeof window !== "undefined"
      ? (window as any).__NEXT_PUBLIC_SUPABASE_ANON_KEY__ || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[v0] Supabase credentials are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to environment variables.",
    )
    // Return a mock client that won't crash but won't work either
    clientInstance = createBrowserClient("https://placeholder.supabase.co", "placeholder-key")
    return clientInstance
  }

  clientInstance = createBrowserClient(supabaseUrl, supabaseKey)
  return clientInstance
}
