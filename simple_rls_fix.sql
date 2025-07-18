-- Simple RLS Fix for Patients Table
-- Run this in Supabase SQL Editor

-- Step 1: Drop the problematic policy
DROP POLICY IF EXISTS "Users can manage accessible patient data" ON public.patients;

-- Step 2: Create simple policies
CREATE POLICY "Users can view their own patients" ON public.patients 
FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own patients" ON public.patients 
FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own patients" ON public.patients 
FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own patients" ON public.patients 
FOR DELETE USING (created_by = auth.uid()); 