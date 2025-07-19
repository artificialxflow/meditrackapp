-- اضافه کردن ستون image_url به جدول medicines
ALTER TABLE medicines 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- نمایش ساختار جدول
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'medicines' 
ORDER BY ordinal_position; 