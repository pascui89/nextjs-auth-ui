import { DataTableServer } from "@/components/data/data-table-server";

interface Filters {
  status?: ("active" | "inactive" | "pending")[];
  role?: ("user" | "admin" | "editor")[];
  country?: string[];
  search?: string;
}

export default async function DataPage() {
  const page = 1;
  const pageSize = 10;
  const sortBy = "joinedAt";
  const sortOrder = "desc";

  const filters: Filters = {
    status: ["active"],
    role: ["admin"],
    country: ["United States"],
    search: "",
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Explorer</h1>
      </div>

      <div className="space-y-4">
        <DataTableServer
          page={page}
          pageSize={pageSize}
          sortBy={sortBy}
          sortOrder={sortOrder}
          filters={filters}
        />
      </div>
    </div>
  );
}