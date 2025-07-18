-- Fix RLS Policies for Patients Table
-- This script fixes the Row-Level Security policies that are causing 403 errors

-- First, let's see what policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'patients';

-- Drop ALL existing policies for patients table
DROP POLICY IF EXISTS "Users can manage accessible patient data" ON public.patients;
DROP POLICY IF EXISTS "Users can view their own patients" ON public.patients;
DROP POLICY IF EXISTS "Users can insert their own patients" ON public.patients;
DROP POLICY IF EXISTS "Users can update their own patients" ON public.patients;
DROP POLICY IF EXISTS "Users can delete their own patients" ON public.patients;

-- Create new policies
CREATE POLICY "Users can view their own patients" ON public.patients 
FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own patients" ON public.patients 
FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own patients" ON public.patients 
FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own patients" ON public.patients 
FOR DELETE USING (created_by = auth.uid());

-- Also fix profiles table if needed
DROP POLICY IF EXISTS "Users can manage their own profile" ON public.profiles;
CREATE POLICY "Users can manage their own profile" ON public.profiles 
FOR ALL USING (auth.uid() = id);

-- Enable RLS if not already enabled
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Verify the policies were created
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'patients'; 