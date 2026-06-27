import { createClient } from '@supabase/supabase-js'

// Temporary dev workaround: disable automatic token refresh and session
// persistence in the browser. This prevents the client from immediately
// attempting a refresh POST to /auth/v1/token which can fail with a CORS
// error in local dev if the Supabase project's allowed origins are not
// configured. Re-enable these options in production after configuring
// the Supabase dashboard to allow your origin (e.g. http://localhost:5173).
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        }
    }
)

export default supabase