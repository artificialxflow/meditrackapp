import { CategoryService } from '../lib/services/categoryService';
import { supabase } from '../lib/supabase/client';

jest.mock('../lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
    })),
  },
}));

describe('CategoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get categories by type', async () => {
    const mockCategories = [{ id: '1', name: 'Painkiller', category_type: 'medication' }];
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: mockCategories, error: null }),
    });

    const result = await CategoryService.getCategories('medication');
    expect(result).toEqual(mockCategories);
    expect(supabase.from).toHaveBeenCalledWith('categories');
    expect(supabase.from().eq).toHaveBeenCalledWith('category_type', 'medication');
  });

  it('should return empty array if no categories found', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    const result = await CategoryService.getCategories('medication');
    expect(result).toEqual([]);
  });

  it('should throw an error if fetching categories fails', async () => {
    const mockError = new Error('Failed to fetch');
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    await expect(CategoryService.getCategories('medication')).rejects.toThrow(mockError);
  });
});
