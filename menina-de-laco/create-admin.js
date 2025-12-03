// scripts/create-admin.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variáveis de ambiente não configuradas.');
  console.error('Defina REACT_APP_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'admin@meninadelaco.com';
    const adminPassword = 'Admin123!';
    
    // 1. Criar usuário no auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    });
    
    if (authError) throw authError;
    
    console.log('✅ Usuário auth criado:', authData.user.email);
    
    // 2. Criar registro na tabela users
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        name: 'Administrador',
        is_admin: true
      });
    
    if (userError) throw userError;
    
    console.log('✅ Admin criado com sucesso!');
    console.log('📧 Email:', adminEmail);
    console.log('🔐 Senha:', adminPassword);
    console.log('\n⚠️  Altere a senha após o primeiro login!');
    
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error.message);
  }
}

createAdminUser();