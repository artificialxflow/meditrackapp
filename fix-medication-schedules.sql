-- اضافه کردن ستون‌های مورد نیاز به جدول medication_schedules
ALTER TABLE medication_schedules 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS last_taken TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ایجاد index برای بهبود عملکرد
CREATE INDEX IF NOT EXISTS idx_medication_schedules_status ON medication_schedules(status);
CREATE INDEX IF NOT EXISTS idx_medication_schedules_last_taken ON medication_schedules(last_taken);

-- به‌روزرسانی رکوردهای موجود
UPDATE medication_schedules 
SET status = 'pending' 
WHERE status IS NULL;

-- نمایش ساختار جدول
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'medication_schedules' 
ORDER BY ordinal_position; 