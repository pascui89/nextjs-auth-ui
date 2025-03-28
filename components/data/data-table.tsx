"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { SortableHeaderClient } from "@/components/data/sortable-header-client";
import { PaginationClient } from "@/components/data/pagination-client";
import { useState, useEffect } from "react";
import { queryData, DataQueryParams } from "@/lib/data-service";
import { DataItem } from "@/types/data";

interface DataTableProps {
  data: Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    lastActive: Date;
    joinedAt: Date;
    country: string;
    city: string;
    transactions: number;
    revenue: number;
  }>;
  total: number;
  page: number;
  pageSize: number;
}

export function DataTable({ total, page, pageSize }: DataTableProps) {
  const [data, setData] = useState<DataItem[]>([]);
  const [currentSort, setCurrentSort] = useState<string>("id");
  const [currentOrder, setCurrentOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(false);

  // Función para cargar los datos
  const fetchData = () => {
    setLoading(true);

    const params: DataQueryParams = {
      page,
      pageSize,
      sortBy: currentSort,
      sortOrder: currentOrder,
    };

    queryData(params)
      .then((result) => {
        setData(result.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Llamar a fetchData cuando cambien los parámetros de ordenación o paginación
  useEffect(() => {
    fetchData();
  }, [currentSort, currentOrder, page, pageSize]);

  const handleSort = (name: string) => {
    if (currentSort === name) {
      setCurrentOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setCurrentSort(name);
      setCurrentOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <Table>
            <DataTableHeader
              currentSort={currentSort}
              currentOrder={currentOrder}
              onSort={handleSort}
            />
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
      />
    </div>
  );
}

function DataTableHeader({
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
        <SortableHeaderClient
          name="id"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          ID
        </SortableHeaderClient>
        <SortableHeaderClient
          name="name"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Name
        </SortableHeaderClient>
        <SortableHeaderClient
          name="email"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Email
        </SortableHeaderClient>
        <SortableHeaderClient
          name="status"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Status
        </SortableHeaderClient>
        <SortableHeaderClient
          name="role"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Role
        </SortableHeaderClient>
        <SortableHeaderClient
          name="lastActive"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Last Active
        </SortableHeaderClient>
        <SortableHeaderClient
          name="joinedAt"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Joined At
        </SortableHeaderClient>
        <SortableHeaderClient
          name="country"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Country
        </SortableHeaderClient>
        <SortableHeaderClient
          name="city"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          City
        </SortableHeaderClient>
        <SortableHeaderClient
          name="transactions"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Transactions
        </SortableHeaderClient>
        <SortableHeaderClient
          name="revenue"
          currentSort={currentSort}
          currentOrder={currentOrder}
          onSort={onSort}
        >
          Revenue
        </SortableHeaderClient>
      </TableRow>
    </TableHeader>
  );
}

interface DataTableRowProps {
  item: {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    lastActive: Date;
    joinedAt: Date;
    country: string;
    city: string;
    transactions: number;
    revenue: number;
  };
}

function DataTableRow({ item }: DataTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>{item.role}</TableCell>
      <TableCell>{item.lastActive.toLocaleDateString()}</TableCell>
      <TableCell>{item.joinedAt.toLocaleDateString()}</TableCell>
      <TableCell>{item.country}</TableCell>
      <TableCell>{item.city}</TableCell>
      <TableCell>{item.transactions}</TableCell>
      <TableCell>${item.revenue.toLocaleString()}</TableCell>
    </TableRow>
  );
}

interface DataTableFooterProps {
  total: number;
  page: number;
  pageSize: number;
  dataLength: number;
}

export function DataTableFooter({ total, page, pageSize, dataLength }: DataTableFooterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{dataLength}</span> of{" "}
        <span className="font-medium">{total}</span> results
      </div>
      <PaginationClient totalItems={total} currentPage={page} pageSize={pageSize} />
    </div>
  );
}