import { DataTable } from "./data-table";
import { queryData, type DataQueryParams } from "@/lib/data-service";

export async function DataTableServer({
    page = 1,
    pageSize = 10,
    sortBy = "id",
    sortOrder = "asc",
    filters = {}
}: DataQueryParams) {
  const queryParams: DataQueryParams = {
    page,
    pageSize,
    sortBy,
    sortOrder,
    filters,
  };

  const result = await queryData(queryParams);

  return (
    <DataTable 
        page={page} 
        pageSize={pageSize} 
        data={result.data} 
        total={result.total} 
    />
  );
}