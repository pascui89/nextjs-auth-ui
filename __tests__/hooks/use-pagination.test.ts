import { renderHook, act } from "@testing-library/react"
import { usePagination } from "@/hooks/use-pagination"

describe("usePagination", () => {
  it("initializes with correct values", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, initialPage: 2, itemsPerPage: 10 }))

    expect(result.current.currentPage).toBe(2)
    expect(result.current.totalPages).toBe(10)
    expect(result.current.pageSize).toBe(10)
    expect(result.current.totalItems).toBe(100)
    expect(result.current.startIndex).toBe(10)
    expect(result.current.endIndex).toBe(19)
  })

  it("handles page navigation correctly", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, initialPage: 1, itemsPerPage: 10 }))

    // Go to next page
    act(() => {
      result.current.goToNextPage()
    })
    expect(result.current.currentPage).toBe(2)

    // Go to previous page
    act(() => {
      result.current.goToPreviousPage()
    })
    expect(result.current.currentPage).toBe(1)

    // Go to specific page
    act(() => {
      result.current.goToPage(5)
    })
    expect(result.current.currentPage).toBe(5)
  })

  it("prevents navigation beyond boundaries", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, initialPage: 1, itemsPerPage: 10 }))

    // Try to go to previous page when on first page
    act(() => {
      result.current.goToPreviousPage()
    })
    expect(result.current.currentPage).toBe(1)

    // Go to last page
    act(() => {
      result.current.goToPage(10)
    })

    // Try to go to next page when on last page
    act(() => {
      result.current.goToNextPage()
    })
    expect(result.current.currentPage).toBe(10)
  })

  it("calculates pagination range correctly", () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 100, initialPage: 5, itemsPerPage: 10, siblingsCount: 1 }),
    )

    // With siblingsCount = 1, we should see: 1, ..., 4, 5, 6, ..., 10
    expect(result.current.range).toEqual([1, "...", 4, 5, 6, "...", 10])
  })

  it("handles small number of pages correctly", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, initialPage: 2, itemsPerPage: 10 }))

    // With only 3 pages, we should see all page numbers without dots
    expect(result.current.range).toEqual([1, 2, 3])
  })

  it("updates when totalItems changes", () => {
    const { result, rerender } = renderHook(
      ({ totalItems }) => usePagination({ totalItems, initialPage: 1, itemsPerPage: 10 }),
      { initialProps: { totalItems: 100 } },
    )

    expect(result.current.totalPages).toBe(10)

    // Update totalItems
    rerender({ totalItems: 50 })

    expect(result.current.totalPages).toBe(5)
  })
})

