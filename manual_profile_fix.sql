-- Manual Profile Fix
-- This script manually creates a profile for the current user

-- Step 1: Check current user authentication
SELECT auth.uid() as current_user_id, auth.jwt() ->> 'email' as user_email;

-- Step 2: If auth.uid() is null, we need to create profile manually
-- First, let's see what users exist in auth.users
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Step 3: Create profile for the most recent user (replace USER_ID with actual user ID)
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from step 2
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
VALUES (
    'YOUR_USER_ID_HERE', -- Replace with actual user ID
    'user@example.com',  -- Replace with actual email
    'کاربر جدید',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Step 4: Verify the profile was created
SELECT id, email, full_name, created_at FROM public.profiles ORDER BY created_at DESC LIMIT 5; 