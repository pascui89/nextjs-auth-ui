import { TableHeader, TableRow } from "@/components/ui/table";
import { SortableHeaderClient } from "@/components/data/sortable-header-client";

export function DataTableHeader({
  currentSort,
  currentOrder,
  onSort,
}: {
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSort: (name: string) => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <SortableHeaderClient name="id" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          ID
        </SortableHeaderClient>
        <SortableHeaderClient name="name" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Name
        </SortableHeaderClient>
        <SortableHeaderClient name="email" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Email
        </SortableHeaderClient>
        <SortableHeaderClient name="status" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Status
        </SortableHeaderClient>
        <SortableHeaderClient name="role" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Role
        </SortableHeaderClient>
        <SortableHeaderClient name="lastActive" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Last Active
        </SortableHeaderClient>
        <SortableHeaderClient name="joinedAt" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Joined At
        </SortableHeaderClient>
        <SortableHeaderClient name="country" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Country
        </SortableHeaderClient>
        <SortableHeaderClient name="city" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          City
        </SortableHeaderClient>
        <SortableHeaderClient name="transactions" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Transactions
        </SortableHeaderClient>
        <SortableHeaderClient name="revenue" currentSort={currentSort} currentOrder={currentOrder} onSort={onSort}>
          Revenue
        </SortableHeaderClient>
      </TableRow>
    </TableHeader>
  );
}