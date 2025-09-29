"use client";
/*
This component displays a single product category, and if it is open, it also displays the products within that category.

I am at the risk of propdrilling here, and it may be better to use composition here instead of passing down the product as a prop. This would have required some refactoring of the ProductsCarousel, but given the time constraints, I have chosen this approach for now.
*/
import type { ProductCategoryType } from "@/types/products";
import { ProductDetails } from "./ProductDetails";

type Props = Readonly<{
    category: ProductCategoryType;
    isOpen: boolean;
}>;

export function ProductCategory({ category, isOpen }: Props) {
    return (
        <div className="p-8 border border-gray-300 dark:border-gray-800 dark:bg-black rounded-lg shadow-md bg-seafoam transition-all duration-300">
            <h2 className="text-center font-lora text-2xl font-bold">{category.name}</h2>
            {isOpen && <div className="pt-4">
                {category.products?.map(product => (
                    <ProductDetails key={product.id} product={product} />
                ))}
            </div>}
        </div>
    );
}