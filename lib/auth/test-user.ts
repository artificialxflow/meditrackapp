// Test user for development
export const TEST_USER = {
  email: 'test@meditrack.com',
  password: 'Test123!@#',
  firstName: 'کاربر',
  lastName: 'تست',
  phone: '09123456789'
}

// Test credentials for development
export const TEST_CREDENTIALS = {
  email: 'test@meditrack.com',
  password: 'Test123!@#'
}

// Function to create test user if not exists
export const createTestUser = async () => {
  try {
    const { createClient } = await import('@supabase/supabase-js')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Try to create test user
    const { data, error } = await supabase.auth.admin.createUser({
      email: TEST_USER.email,
      password: TEST_USER.password,
      email_confirm: true,
      user_metadata: {
        first_name: TEST_USER.firstName,
        last_name: TEST_USER.lastName,
        phone: TEST_USER.phone
      }
    })
    
    if (error) {
      if (error.message.includes('User already registered')) {
        console.log('Test user already exists')
        return { success: true, message: 'Test user already exists' }
      }
      console.error('Error creating test user:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Test user created successfully:', data.user?.email)
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Error in createTestUser:', error)
    return { success: false, error: 'Failed to create test user' }
  }
} 