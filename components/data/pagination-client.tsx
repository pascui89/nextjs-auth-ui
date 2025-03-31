"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui-kit/pagination";

interface PaginationClientProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
}

export function PaginationClient({ totalItems, currentPage, pageSize, onPageChange }: PaginationClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);

    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <Pagination
      totalItems={totalItems}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={handlePageChange}
    />
  );
}