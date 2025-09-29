"use client";
/*
This component implements a carousel to display product categories.
It supports both mobile and desktop layouts, with different behaviors for each.

I am not using any external carousel libraries to keep the dependencies minimal, and also to showcase some more complex React logic.
In a real world, I would consider using a well-supported library to avoid reinventing the wheel and to ensure better accessibility and performance.

The three issues I see with this implementation is:
1. There is a lack of animation between each category. It would be nice to have a sliding animation when moving between categories. This would require more complex state management and possibly using a library like Framer Motion or similar to handle the animations smoothly.
2. The desktop layout and mobile layout are both rendered to html, but only one is visible based on screen size. This is not ideal for performance and SEO, but given the time constraints and complexity of implementing a fully responsive carousel with animations, I have chosen this approach for now.
3. The carousel does not support swipe gestures on mobile devices. This would enhance the user experience on touch devices, but would require additional event handling and state management.
*/
import type { ProductCategoryType } from "@/types/products";
import { ProductCategory } from "./ProductCategory";
import { useCarousel } from "@/hooks/useCarousel";


/**
 * Helper method for determining class names for desktop items based on their position and total number of categories.
 * Colocated for clarity.
 * @param position 'center' | 'side'
 * @param categoriesLength number of categories 
 * @returns string of class names
 */
function getClassNamesForDesktopItems(position: string, categoriesLength: number) {
    const classes = [];
    if (position !== 'center') classes.push('cursor-pointer');
    if (categoriesLength === 1) classes.push('w-full');
    if (categoriesLength === 2) classes.push('w-1/2');
    if (categoriesLength > 2) classes.push(position === 'center' ? 'w-1/2' : 'w-1/4');
    return classes.join(' ');
}

type Props = Readonly<{
    categories: ProductCategoryType[];
}>;

export function ProductsCarousel({ categories }: Props) {
    const {
        activeItem: activeCategory,
        setActiveItem: setActiveCategory,
        goToPrevious,
        goToNext,
        visibleItems,
        mobileItems
    } = useCarousel(categories);

    if (categories.length === 0) {
        return <div>No categories available</div>;
    }

    return (
        <>
            {/* Carousel controls */}
            <div className="flex max-w-4xl mx-auto justify-between items-center mb-6 gap-2">
                <button
                    onClick={goToPrevious}
                    className="cursor-pointer bg-teal text-dark-green hover:bg-dark-green hover:text-teal border-0 rounded-full p-3 shadow-md transition-all duration-200 hover:shadow-lg"
                    aria-label="Previous category"
                    type="button"
                >
                    <svg
                        className="w-4 h-4 xl:w-5 xl:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <h1 className="font-lora font-black text-4xl text-center">Explore Accounts</h1>

                <button
                    onClick={goToNext}
                    className="cursor-pointer bg-teal text-dark-green hover:bg-dark-green hover:text-teal border-0 rounded-full p-3 shadow-md transition-all duration-200 hover:shadow-lg"
                    aria-label="Next category"
                    type="button"
                >
                    <svg
                        className="w-4 h-4 xl:w-5 xl:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center items-center gap-2 mb-4">
                {categories.map((_, idx) => (
                    <button
                        type="button"
                        key={idx}
                        onClick={() => setActiveCategory(idx)}
                        aria-label={`Go to category ${idx + 1}`}
                        className="cursor-pointer p-2 bg-transparent outline-0 border-0 focus-visible:outline-2 outline-amber-400"
                    >
                        <span className={`block w-4 h-4 rounded-full transition-all duration-200 ${idx === activeCategory
                            ? "bg-gray-800 scale-110"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}></span>
                    </button>
                ))}
            </div>

            {/* Carousel container. Max width of 2000px because it didn't look great on my large monitor */}
            <div className="relative max-w-[2000px] mx-auto w-full">

                {/* Mobile layout - single item */}
                <div className="flex justify-center items-start px-2 xl:hidden">
                    {mobileItems.map(({ item, index, position }) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="w-full transition-all duration-300 ease-in-out"
                        >
                            <ProductCategory category={item} isOpen={position === 'center'} />
                        </div>
                    ))}
                </div>

                {/* Desktop layout - three items */}
                <div className="hidden xl:flex justify-center items-start gap-4 px-16">
                    {visibleItems.map(({ item, index, position }) => (
                        <div
                            key={`${item.id}-${index}`}
                            className={getClassNamesForDesktopItems(position, categories.length)}
                            onClick={() => position === 'side' && setActiveCategory(index)}
                        >
                            <ProductCategory category={item} isOpen={position === 'center'} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

