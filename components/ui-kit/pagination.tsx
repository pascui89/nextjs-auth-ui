"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { usePagination } from "@/hooks/use-pagination"

interface PaginationProps {
  totalItems: number
  currentPage: number
  pageSize?: number
  siblingsCount?: number
  onPageChange: (page: number) => void
}

export function Pagination({
  totalItems,
  currentPage,
  pageSize = 10,
  siblingsCount = 1,
  onPageChange,
}: PaginationProps) {
  const { range, totalPages, goToPage, goToNextPage, goToPreviousPage, hasNextPage, hasPreviousPage } = usePagination({
    totalItems,
    initialPage: currentPage,
    itemsPerPage: pageSize,
    siblingsCount,
  })

  // Handle page change and call the provided callback
  const handlePageChange = (page: number) => {
    goToPage(page)
    onPageChange(page)
  }

  // Handle next page
  const handleNextPage = () => {
    goToNextPage()
    onPageChange(currentPage + 1)
  }

  // Handle previous page
  const handlePreviousPage = () => {
    goToPreviousPage()
    onPageChange(currentPage - 1)
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(1)}
        disabled={!hasPreviousPage}
        aria-label="Go to first page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-2">
        {range.map((page, index) =>
          page === "..." ? (
            <div key={`ellipsis-${index}`} className="px-2">
              ...
            </div>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => handlePageChange(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNextPage}
        disabled={!hasNextPage}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(totalPages)}
        disabled={!hasNextPage}
        aria-label="Go to last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

