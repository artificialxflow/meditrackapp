-- Fix Profiles Issue
-- This script ensures the current user has a profile record

-- Step 1: Check if current user has a profile
SELECT id, email, full_name FROM public.profiles WHERE id = auth.uid();

-- Step 2: If no profile exists, create one
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT 
    auth.uid(),
    auth.jwt() ->> 'email',
    COALESCE(auth.jwt() ->> 'full_name', 'کاربر جدید'),
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid()
);

-- Step 3: Verify the profile was created
SELECT id, email, full_name, created_at FROM public.profiles WHERE id = auth.uid(); 