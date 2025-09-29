import { useState } from "react";

/**
 * Custom hook to manage carousel state and behavior.
 * This hook provides the current active category index, functions to navigate to the previous and next categories,
 * and the items to be displayed in the carousel for both desktop and mobile views.
 * 
 * The carousel displays:
 * - On desktop: the previous, current, and next categories (with special handling for 1 or 2 categories)
 * - On mobile: only the current item
 * Limitations:
 * 1. The carousel does not loop infinitely; it wraps around when reaching the start or end.
 * 2. The carousel does not have autoplay functionality. This could be added with additional state and effects.
 * 3. The carousel does not support swipe gestures on mobile devices. This would enhance the user experience on touch devices, but would require additional event handling and state management.
 * @template T - The type of the item items, which must include 'id' and 'name' properties.
 * @param items - Array of items to be displayed in the carousel.
 * @returns An object containing the active index, navigation functions, and items for desktop and mobile views.
 */
export function useCarousel<T extends { id: string; name: string }>(items: T[]) {
    const [activeItem, setActiveItem] = useState(0);

    const goToPrevious = () => {
        setActiveItem(prev =>
            prev === 0 ? items.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setActiveItem(prev =>
            prev === items.length - 1 ? 0 : prev + 1
        );
    };

    // Get the items to display (previous, current, next)
    const getVisibleItems = () => {
        if (items.length === 0) return [];
        if (items.length === 1) return [{ item: items[0], index: 0, position: 'center' }];
        if (items.length === 2) return [
            { item: items[activeItem], index: activeItem, position: 'center' },
            { item: items[activeItem === 0 ? 1 : 0], index: activeItem === 0 ? 1 : 0, position: 'side' }
        ];

        const prevIndex = activeItem === 0 ? items.length - 1 : activeItem - 1;
        const nextIndex = activeItem === items.length - 1 ? 0 : activeItem + 1;

        return [
            { item: items[prevIndex], index: prevIndex, position: 'side' },
            { item: items[activeItem], index: activeItem, position: 'center' },
            { item: items[nextIndex], index: nextIndex, position: 'side' }
        ];
    };

    // Get mobile items (single item only)
    const getMobileItems = () => {
        if (items.length === 0) return [];
        return [{ item: items[activeItem], index: activeItem, position: 'center' }];
    };

    const visibleItems = getVisibleItems();
    const mobileItems = getMobileItems();

    return {
        activeItem,
        setActiveItem,
        goToPrevious,
        goToNext,
        visibleItems,
        mobileItems
    }
}