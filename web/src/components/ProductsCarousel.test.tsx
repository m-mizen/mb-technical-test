/*
These tests ensure that the basic functionality of the ProductsCarousel component works as expected. 
I would ideally like to do this in some form of integration or E2E tests to cover the full user experience. 
I've found that doing this with Storybook testing is a great way to encourage documentation and discovery of the components in the library. 
Setting that up would take more time than I have available right now, so I've opted for unit tests here to at least cover this component.
*/

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { ProductsCarousel } from "./ProductsCarousel";
import type { ProductCategoryType } from "@/types/products";

// Mock ProductCategory component
vi.mock("./ProductCategory", () => ({
    ProductCategory: ({ category, isOpen }: { category: ProductCategoryType; isOpen: boolean }) => (
        <div data-testid="product-category" data-open={isOpen}>
            {category.name}
        </div>
    ),
}));

// Mock useCarousel hook
const mockSetActiveItem = vi.fn();
const mockGoToPrevious = vi.fn();
const mockGoToNext = vi.fn();

vi.mock("@/hooks/useCarousel", () => ({
    useCarousel: (categories: ProductCategoryType[]) => ({
        activeItem: 0,
        setActiveItem: mockSetActiveItem,
        goToPrevious: mockGoToPrevious,
        goToNext: mockGoToNext,
        visibleItems: categories.slice(0, 3).map((item, idx) => ({
            item,
            index: idx,
            position: idx === 1 ? "center" : "side",
        })),
        mobileItems: categories.slice(0, 1).map((item, idx) => ({
            item,
            index: idx,
            position: "center",
        })),
    }),
}));

const categories: ProductCategoryType[] = [
    {
        id: "1", name: "Cat 1",
        sort: 0,
        products: []
    },
    {
        id: "2", name: "Cat 2",
        sort: 0,
        products: []
    },
    {
        id: "3", name: "Cat 3",
        sort: 0,
        products: []
    },
];

describe("ProductsCarousel", () => {
    afterEach(() => {
        cleanup();
    });

    it("renders 'No categories available' if categories is empty", () => {
        const screen = render(<ProductsCarousel categories={[]} />);
        expect(screen.getByText(/no categories available/i)).toBeInTheDocument();
    });

    it("renders carousel controls and indicators", () => {
        const screen = render(<ProductsCarousel categories={categories} />);
        expect(screen.getByRole("button", { name: /Previous category/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Next category/i })).toBeInTheDocument();
        expect(screen.getByText(/Explore accounts/i)).toBeInTheDocument();
        expect(screen.getAllByRole("button", { name: /Go to category/i })).toHaveLength(categories.length);
    });

    it("calls goToPrevious and goToNext when navigation buttons are clicked", () => {
        const screen = render(<ProductsCarousel categories={categories} />);
        fireEvent.click(screen.getByRole("button", { name: /Previous category/i }));
        expect(mockGoToPrevious).toHaveBeenCalled();

        fireEvent.click(screen.getByRole("button", { name: /Next category/i }));
        expect(mockGoToNext).toHaveBeenCalled();
    });

    it("calls setActiveItem when indicator is clicked", () => {
        const screen = render(<ProductsCarousel categories={categories} />);
        const indicators = screen.getAllByRole("button", { name: /go to category/i });
        fireEvent.click(indicators[1]);
        expect(mockSetActiveItem).toHaveBeenCalledWith(1);
    });

    it("renders ProductCategory for mobile and desktop layouts", () => {
        const screen = render(<ProductsCarousel categories={categories} />);
        // Mobile layout
        expect(screen.getAllByTestId("product-category")[0].textContent).toBe("Cat 1");
        // Desktop layout
        expect(screen.getAllByTestId("product-category")[1].textContent).toBe("Cat 1");
        expect(screen.getAllByTestId("product-category")[2].textContent).toBe("Cat 2");
        expect(screen.getAllByTestId("product-category")[3].textContent).toBe("Cat 3");
    });

    it("calls setActiveItem when desktop side item is clicked", () => {
        const screen = render(<ProductsCarousel categories={categories} />);
        // The first and last items are 'side' (index 0 and 2)
        const desktopItems = screen.getAllByTestId("product-category");
        fireEvent.click(desktopItems[1]); // index 0, side
        expect(mockSetActiveItem).toHaveBeenCalledWith(0);
        fireEvent.click(desktopItems[3]); // index 2, side
        expect(mockSetActiveItem).toHaveBeenCalledWith(2);
    });
});