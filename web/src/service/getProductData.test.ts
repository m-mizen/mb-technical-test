import { describe, test, expect, vi } from 'vitest';
import { getProductData } from './getProductData';
import { createPocketBaseClient } from './pocketBaseClient';

vi.mock('./pocketBaseClient', () => {
    return {
        createPocketBaseClient: vi.fn()
    };
});

describe('getProductData', () => {
    test('should fetch and transform product data correctly', async () => {
        const mockGetFullList = vi.fn().mockResolvedValue([
            {
                id: 'cat1',
                name: 'Category 1',
                sort: 1,
                expand: {
                    products: [
                        { id: 'prod1', name: 'Product 1', description: 'Desc 1', icon: 'icon1.png', sort: 2 },
                        { id: 'prod2', name: 'Product 2', description: 'Desc 2', icon: 'icon2.png', sort: 1 }
                    ]
                }
            }
        ]);

        const mockFilesGetURL = vi.fn((_, filename) => `http://example.com/${filename}`);
        const mockPb = {
            collection: vi.fn().mockReturnThis(),
            getFullList: mockGetFullList,
            files: {
                getURL: mockFilesGetURL
            }
        };
        (createPocketBaseClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPb);
        const result = await getProductData();
        expect(result).toEqual([
            {
                id: 'cat1',
                name: 'Category 1',
                sort: 1,
                products: [
                    { id: 'prod2', name: 'Product 2', description: 'Desc 2', icon: 'http://example.com/icon2.png', sort: 1 },
                    { id: 'prod1', name: 'Product 1', description: 'Desc 1', icon: 'http://example.com/icon1.png', sort: 2 }
                ]
            }
        ]);
        expect(mockPb.collection).toHaveBeenCalledWith('product_categories');
        expect(mockGetFullList).toHaveBeenCalledWith({
            expand: 'products',
            sort: 'sort',
            fields: "id, name, sort, expand.products.id, expand.products.name, expand.products.icon, expand.products.description, expand.products.sort",
        });
    });
});