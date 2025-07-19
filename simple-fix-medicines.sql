-- اصلاح ساده جدول medicines
-- حذف ستون image_file اگر وجود دارد

-- بررسی و حذف ستون image_file
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'medicines' 
        AND column_name = 'image_file'
    ) THEN
        ALTER TABLE medicines DROP COLUMN image_file;
        RAISE NOTICE 'ستون image_file حذف شد';
    ELSE
        RAISE NOTICE 'ستون image_file وجود ندارد';
    END IF;
END $$;

-- اطمینان از وجود ستون‌های مورد نیاز
ALTER TABLE medicines 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS quantity INTEGER,
ADD COLUMN IF NOT EXISTS expiration_date DATE;

-- نمایش ساختار نهایی
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'medicines' 
ORDER BY ordinal_position; 