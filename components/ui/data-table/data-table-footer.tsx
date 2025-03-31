import { PaginationClient } from "@/components/data/pagination-client";

interface DataTableFooterProps {
  total: number;
  page: number;
  pageSize: number;
  dataLength: number;
  onPageChange: (page: number) => void;
}

export function DataTableFooter({ total, page, pageSize, dataLength, onPageChange }: DataTableFooterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{dataLength}</span> of{" "}
        <span className="font-medium">{total}</span> results
      </div>
      <PaginationClient 
        totalItems={total}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={onPageChange} 
      />
    </div>
  );
}