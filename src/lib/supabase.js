import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ohnmuxedmsizuveofyju.supabase.co'
const supabaseKey = 'sb_publishable_aqoBnltj6s5ezRLAn9ixow_zpehCDJX'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function submitLead(data) {
  const { error } = await supabase.from('leads').insert([data])
  if (error) throw error
  return true
}
