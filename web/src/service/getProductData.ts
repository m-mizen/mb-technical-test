/*
This file contains the logic for interacting with the PocketBase CMS.

In a real world, I may want to abstract this further to allow for easier swapping of the CMS in the future, but given the time constraints, I have chosen to keep it simple for now.
*/

import { PocketBaseProductCategoryType, ProductCategoryType, ProductType } from '@/types/products';
import { createPocketBaseClient } from './pocketBaseClient';


// There are some magic strings here due to the way PocketBase works
// A lot of these could be moved to constants to keep it clean, but given we are only making a single request, I have chosen to keep it simple for now.
export async function getProductData(): Promise<ProductCategoryType[]> {
    const pb = createPocketBaseClient();
    const categories = await pb.collection('product_categories').getFullList({
        expand: 'products',
        sort: 'sort',
        fields: "id, name, sort, expand.products.id, expand.products.name, expand.products.icon, expand.products.description, expand.products.sort",
    }) as PocketBaseProductCategoryType[];
    return categories.map(({ expand, ...category }) => ({
        ...category,
        products: (expand.products ?? [])
            // Map to the ProductType, transforming the icon URL as needed
            .map(product => ({
                ...product,
                description: product.description ?? '',
                // The need to do this here is due to a PocketBase not really making this very easy
                // I have to provide collectionId and collectionName for the URL builder to work
                // In a real world, I would want publish the files to a CDN or similar to avoid this complexity
                icon: product.icon ? (
                    pb.files.getURL({
                        id: product.id,
                        collectionId: 'product',
                        collectionName: 'product',
                        icon: product.icon
                    }, product.icon, { thumb: '50x50' }))
                    // This line is a hack to make it work in Docker Compose setup where the cms is not accessible via localhost
                    .replace('cms:8090', '127.0.0.1:8090') : ''
            } as ProductType)
                // Sort products by the 'sort' field
            ).toSorted((a, b) => a.sort - b.sort)
    }));
}