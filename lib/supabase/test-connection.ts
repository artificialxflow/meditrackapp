import { supabase } from './client'

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('organizations')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Database connection error:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Database connection successful!')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Test if all required tables exist
export const testTablesExistence = async () => {
  const requiredTables = [
    'organizations',
    'organization_members',
    'departments',
    'patients',
    'patient_shares',
    'medicines',
    'medicine_schedules',
    'medicine_intake',
    'doctor_appointments',
    'categories',
    'families',
    'family_members',
    'activity_logs',
    'family_chat',
    'help_articles',
    'user_help_progress',
    'support_tickets',
    'support_messages',
    'medical_guidelines',
    'inventory'
  ]

  const results = []

  for (const tableName of requiredTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1)
      
      if (error) {
        results.push({ table: tableName, exists: false, error: error.message })
      } else {
        results.push({ table: tableName, exists: true, error: null })
      }
    } catch (error) {
      results.push({ 
        table: tableName, 
        exists: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    }
  }

  return results
}

// Run all tests
export const runDatabaseTests = async () => {
  console.log('🔍 Testing database connection...')
  const connectionTest = await testDatabaseConnection()
  
  console.log('🔍 Testing tables existence...')
  const tablesTest = await testTablesExistence()
  
  const allTablesExist = tablesTest.every(result => result.exists)
  
  console.log('\n📊 Test Results:')
  console.log('Connection:', connectionTest.success ? '✅ Success' : '❌ Failed')
  console.log('Tables:', allTablesExist ? '✅ All tables exist' : '❌ Some tables missing')
  
  if (!allTablesExist) {
    console.log('\n❌ Missing tables:')
    tablesTest
      .filter(result => !result.exists)
      .forEach(result => console.log(`  - ${result.table}: ${result.error}`))
  }
  
  return {
    connection: connectionTest,
    tables: tablesTest,
    allTestsPassed: connectionTest.success && allTablesExist
  }
} 