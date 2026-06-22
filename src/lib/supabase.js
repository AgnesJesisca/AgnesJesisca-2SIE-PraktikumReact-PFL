import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zhkytdssvjlcpbshpttb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoa3l0ZHNzdmpsY3Bic2hwdHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTA3MDcsImV4cCI6MjA5NjQ2NjcwN30.xNRnicK2RynDGZiSWDuAmjK9v2Uun0vqlSxfLIxZiPE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
