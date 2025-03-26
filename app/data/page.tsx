import { Suspense } from "react"
import { DataTable } from "@/components/data/data-table"
import { DataTableSkeleton } from "@/components/data/data-table-skeleton"
import { DataTableFilters } from "@/components/data/data-table-filters"

export default function DataPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Explorer</h1>
      </div>

      <div className="space-y-4">
        <DataTableFilters />

        <Suspense fallback={<DataTableSkeleton />}>
          <DataTable />
        </Suspense>
      </div>
    </div>
  )
}

