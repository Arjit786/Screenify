import { createClient } from '@supabase/supabase-js'

const connectionString = process.env.SUPABASE_CONNECTION_STRING

if (!connectionString) {
    throw new Error('Missing Supabase connection string')
}

export const supabaseServer = createClient(connectionString, {
    auth: {
        autoRefreshToken: true,
        persistSession: true
    }
})