"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useDataTable } from '@/components/data/hooks/use-data-table';
import { DataTableHeader, DataTableRow, DataTableFooter } from '@/components/ui/data-table';

export function DataTable({ initialPage = 1, initialPageSize = 10 }: { initialPage: number; initialPageSize: number }) {
  const {
    state: { data, currentSort, currentOrder, page, pageSize, loading, total },
    actions: { setPage, handleSort },
  } = useDataTable({ initialPage, initialPageSize });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <Table>
            <DataTableHeader currentSort={currentSort} currentOrder={currentOrder} onSort={handleSort} />
            <TableBody>
              {data.map((item) => (
                <DataTableRow key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <DataTableFooter 
        total={total} 
        page={page} 
        pageSize={pageSize} 
        dataLength={data.length} 
        onPageChange={setPage}
      />
    </div>
  );
}