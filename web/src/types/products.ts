export type PocketBaseProductCategoryType = {
    id: string;
    name: string;
    sort: number;
    expand: {
        products: PocketBaseProductType[];
    }
};

export type PocketBaseProductType = {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    sort: number;
};


export type ProductCategoryType = {
    id: string;
    name: string;
    sort: number;
    products: ProductType[];
};

export type ProductType = {
    id: string;
    name: string;
    description: string;
    icon?: string;
    sort: number;
};