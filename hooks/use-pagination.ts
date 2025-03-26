"use client"

import { useState, useMemo } from "react"

interface UsePaginationProps {
  totalItems: number
  initialPage?: number
  itemsPerPage?: number
  siblingsCount?: number
}

export function usePagination({
  totalItems,
  initialPage = 1,
  itemsPerPage = 10,
  siblingsCount = 1,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Ensure current page is within bounds
  const safePage = Math.max(1, Math.min(currentPage, totalPages))

  // If safePage is different from currentPage, update it
  if (safePage !== currentPage) {
    setCurrentPage(safePage)
  }

  // Calculate pagination range
  const range = useMemo(() => {
    // Calculate the start and end of the pagination range
    const totalPageNumbers = siblingsCount * 2 + 3 // siblings + current + first + last

    // Case 1: If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Calculate left and right siblings
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages)

    // Don't show dots if there's only one position to hide
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    // Case 2: No left dots, but right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingsCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)

      return [...leftRange, "...", totalPages]
    }

    // Case 3: No right dots, but left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingsCount
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)

      return [1, "...", ...rightRange]
    }

    // Case 4: Both left and right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      )

      return [1, "...", ...middleRange, "...", totalPages]
    }

    return []
  }, [totalPages, currentPage, siblingsCount])

  // Calculate start and end item indices
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1)

  // Functions to change page
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    currentPage,
    totalPages,
    pageSize: itemsPerPage,
    totalItems,
    startIndex,
    endIndex,
    range,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  }
}

