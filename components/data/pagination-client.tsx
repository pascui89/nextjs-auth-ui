// components/data/pagination-client.tsx
"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui-kit/pagination";

interface PaginationClientProps {
    totalItems: number;
    currentPage: number;
    pageSize: number;
  }

export function PaginationClient({ totalItems, currentPage, pageSize }: PaginationClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination
      totalItems={totalItems}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={handlePageChange}
    />
  )
}