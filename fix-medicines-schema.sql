-- اصلاح جدول medicines برای حذف ستون image_file
-- این ستون در schema وجود ندارد و باید حذف شود

-- ابتدا بررسی کنیم که آیا ستون image_file وجود دارد
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'medicines' 
        AND column_name = 'image_file'
    ) THEN
        -- اگر ستون وجود دارد، آن را حذف کن
        ALTER TABLE medicines DROP COLUMN image_file;
        RAISE NOTICE 'ستون image_file از جدول medicines حذف شد';
    ELSE
        RAISE NOTICE 'ستون image_file در جدول medicines وجود ندارد';
    END IF;
END $$;

-- اطمینان از وجود ستون image_url
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'medicines' 
        AND column_name = 'image_url'
    ) THEN
        -- اگر ستون image_url وجود ندارد، آن را اضافه کن
        ALTER TABLE medicines ADD COLUMN image_url TEXT;
        RAISE NOTICE 'ستون image_url به جدول medicines اضافه شد';
    ELSE
        RAISE NOTICE 'ستون image_url در جدول medicines وجود دارد';
    END IF;
END $$;

-- اطمینان از وجود ستون quantity
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'medicines' 
        AND column_name = 'quantity'
    ) THEN
        -- اگر ستون quantity وجود ندارد، آن را اضافه کن
        ALTER TABLE medicines ADD COLUMN quantity INTEGER;
        RAISE NOTICE 'ستون quantity به جدول medicines اضافه شد';
    ELSE
        RAISE NOTICE 'ستون quantity در جدول medicines وجود دارد';
    END IF;
END $$;

-- اطمینان از وجود ستون expiration_date
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'medicines' 
        AND column_name = 'expiration_date'
    ) THEN
        -- اگر ستون expiration_date وجود ندارد، آن را اضافه کن
        ALTER TABLE medicines ADD COLUMN expiration_date DATE;
        RAISE NOTICE 'ستون expiration_date به جدول medicines اضافه شد';
    ELSE
        RAISE NOTICE 'ستون expiration_date در جدول medicines وجود دارد';
    END IF;
END $$;

-- نمایش ساختار نهایی جدول
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'medicines' 
ORDER BY ordinal_position; 