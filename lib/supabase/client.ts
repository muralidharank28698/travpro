import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock'

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) return client

  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || 
                    !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isMockMode) {
    client = createMockClient() as any
    return client
  }

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return client
}
