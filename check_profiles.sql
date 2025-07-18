-- Check Profiles Status
-- This script checks if profiles exist for all users

-- Step 1: Check total users vs profiles
SELECT 
    (SELECT COUNT(*) FROM auth.users) as total_users,
    (SELECT COUNT(*) FROM public.profiles) as total_profiles;

-- Step 2: List all users
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Step 3: List all profiles
SELECT id, email, full_name, created_at FROM public.profiles ORDER BY created_at DESC;

-- Step 4: Find users without profiles
SELECT 
    au.id,
    au.email,
    au.created_at as user_created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ORDER BY au.created_at DESC;

-- Step 5: If there are users without profiles, create them
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 'کاربر موجود'),
    au.created_at,
    NOW()
FROM auth.users au
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- Step 6: Final verification
SELECT 
    (SELECT COUNT(*) FROM auth.users) as total_users,
    (SELECT COUNT(*) FROM public.profiles) as total_profiles,
    CASE 
        WHEN (SELECT COUNT(*) FROM auth.users) = (SELECT COUNT(*) FROM public.profiles) 
        THEN '✅ All users have profiles' 
        ELSE '❌ Some users missing profiles' 
    END as status; 