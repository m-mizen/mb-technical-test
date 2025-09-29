/*
By moving the carousel logic into a custom hook, we can isolate and test its functionality without needing to render the entire component.
This allows us to write focused unit tests that verify the behavior of the carousel logic, such as navigation and state management in isolation
*/

import { renderHook, act } from '@testing-library/react';
import { useCarousel } from './useCarousel';
import { describe, it, expect } from 'vitest';

type Item = { id: string; name: string };

describe('useCarousel', () => {
    const items: Item[] = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' }
    ];

    it('should initialize with activeItem 0', () => {
        const { result } = renderHook(() => useCarousel(items));
        expect(result.current.activeItem).toBe(0);
    });

    it('should go to next and previous item correctly', () => {
        const { result } = renderHook(() => useCarousel(items));
        act(() => result.current.goToNext());
        expect(result.current.activeItem).toBe(1);
        act(() => result.current.goToNext());
        expect(result.current.activeItem).toBe(2);
        act(() => result.current.goToNext());
        expect(result.current.activeItem).toBe(0);

        act(() => result.current.goToPrevious());
        expect(result.current.activeItem).toBe(2);
        act(() => result.current.goToPrevious());
        expect(result.current.activeItem).toBe(1);
    });

    it('should set activeItem directly', () => {
        const { result } = renderHook(() => useCarousel(items));
        act(() => result.current.setActiveItem(2));
        expect(result.current.activeItem).toBe(2);
    });

    it('should return correct visibleItems for 3 items', () => {
        const { result } = renderHook(() => useCarousel(items));
        expect(result.current.visibleItems).toEqual([
            { item: items[2], index: 2, position: 'side' },
            { item: items[0], index: 0, position: 'center' },
            { item: items[1], index: 1, position: 'side' }
        ]);
        act(() => result.current.goToNext());
        expect(result.current.visibleItems).toEqual([
            { item: items[0], index: 0, position: 'side' },
            { item: items[1], index: 1, position: 'center' },
            { item: items[2], index: 2, position: 'side' }
        ]);
    });

    it('should return correct visibleItems for 2 items', () => {
        const twoItems = items.slice(0, 2);
        const { result } = renderHook(() => useCarousel(twoItems));
        expect(result.current.visibleItems).toEqual([
            { item: twoItems[0], index: 0, position: 'center' },
            { item: twoItems[1], index: 1, position: 'side' }
        ]);
        act(() => result.current.goToNext());
        expect(result.current.visibleItems).toEqual([
            { item: twoItems[1], index: 1, position: 'center' },
            { item: twoItems[0], index: 0, position: 'side' }
        ]);
    });

    it('should return correct visibleItems for 1 item', () => {
        const oneItem = items.slice(0, 1);
        const { result } = renderHook(() => useCarousel(oneItem));
        expect(result.current.visibleItems).toEqual([
            { item: oneItem[0], index: 0, position: 'center' }
        ]);
    });

    it('should return empty visibleItems and mobileItems for empty items', () => {
        const { result } = renderHook(() => useCarousel([]));
        expect(result.current.visibleItems).toEqual([]);
        expect(result.current.mobileItems).toEqual([]);
    });

    it('should return correct mobileItems', () => {
        const { result } = renderHook(() => useCarousel(items));
        expect(result.current.mobileItems).toEqual([
            { item: items[0], index: 0, position: 'center' }
        ]);
        act(() => result.current.goToNext());
        expect(result.current.mobileItems).toEqual([
            { item: items[1], index: 1, position: 'center' }
        ]);
    });
});