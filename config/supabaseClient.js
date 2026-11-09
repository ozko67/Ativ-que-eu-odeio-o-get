// config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Variáveis de ambiente do Supabase não configuradas no .env!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
