import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock'

export function createClient() {
  const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || 
                    !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isMockMode) {
    return createMockClient() as any
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
