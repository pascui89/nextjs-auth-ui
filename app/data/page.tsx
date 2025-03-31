import { DataTable } from "@/components/data/data-table";

export default async function DataPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Explorer</h1>
      </div>

      <div className="space-y-4">
        <DataTable
          initialPage={1}
          initialPageSize={10}
        />
      </div>
    </div>
  );
}