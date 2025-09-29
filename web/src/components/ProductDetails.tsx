"use client";
/*
This component displays the details of a single product.

I am using the <details> and <summary> HTML elements to provide a native and accessible way to show/hide the product details.
If I'm honest, this is the first time I've used these elements, and I think they are a great addition to HTML5. There are some limitations, such as the lack of control over the summary marker (the little arrow), but for this use case, they work well.
In a real world, I would probably use a more custom solution to have more control over the styling and behavior, but given the time constraints, this is a good compromise.
*/
import type { ProductType } from "@/types/products";
import Image from "next/image";

type Props = Readonly<{
    product: ProductType;
}>;

export function ProductDetails({ product }: Props) {
    return (
        <details className="group mb-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 cursor-pointer dark:bg-dark-green dark:border-gray-800">
            <summary className="font-bold text-lg font-lora pointer-cursor p-4 flex justify-between cursor-pointer after:content-['▶'] after:transition-transform after:duration-200 group-open:after:rotate-90">{product.name}</summary>
            <div className="p-4 border-t border-gray-300 dark:border-gray-800 flex items-start gap-4 lg:gap-6 lg:p-8">
                {product.icon && <div className="w-12 lg:w-24 flex-shrink-0">
                    <Image src={product.icon} alt={product.name} width={50} height={50} className="w-full h-auto" />
                </div>}
                <div className="prose prose-sm lg:prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
        </details>
    );
}