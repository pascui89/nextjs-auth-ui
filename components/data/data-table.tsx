"use client"

import type React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui-kit/pagination"
import { type DataItem, queryData, type DataQueryParams } from "@/lib/data-service"
import { formatDistanceToNow, format } from "date-fns"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

export async function DataTable() {
  const searchParams = useSearchParams()

  // Parse query parameters
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")
  const sortBy = searchParams.get("sortBy") || "joinedAt"
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc"

  // Parse filters
  const statusFilter = searchParams.getAll("status")
  const roleFilter = searchParams.getAll("role")
  const countryFilter = searchParams.getAll("country")
  const searchFilter = searchParams.get("search") || ""

  // Prepare query params
  const queryParams: DataQueryParams = {
    page,
    pageSize,
    sortBy,
    sortOrder,
    filters: {
      status: statusFilter.length > 0 ? (statusFilter as DataItem["status"][]) : undefined,
      role: roleFilter.length > 0 ? (roleFilter as DataItem["role"][]) : undefined,
      country: countryFilter.length > 0 ? countryFilter : undefined,
      search: searchFilter || undefined,
    },
  }

  // Fetch data
  const result = await queryData(queryParams)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableHeader name="id" currentSort={sortBy} currentOrder={sortOrder}>
                  ID
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="name" currentSort={sortBy} currentOrder={sortOrder}>
                  Name
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="email" currentSort={sortBy} currentOrder={sortOrder}>
                  Email
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="status" currentSort={sortBy} currentOrder={sortOrder}>
                  Status
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="role" currentSort={sortBy} currentOrder={sortOrder}>
                  Role
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="country" currentSort={sortBy} currentOrder={sortOrder}>
                  Country
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="transactions" currentSort={sortBy} currentOrder={sortOrder}>
                  Transactions
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="revenue" currentSort={sortBy} currentOrder={sortOrder}>
                  Revenue
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="joinedAt" currentSort={sortBy} currentOrder={sortOrder}>
                  Joined
                </SortableHeader>
              </TableHead>
              <TableHead>
                <SortableHeader name="lastActive" currentSort={sortBy} currentOrder={sortOrder}>
                  Last Active
                </SortableHeader>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              result.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "active" ? "default" : item.status === "pending" ? "outline" : "secondary"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.transactions}</TableCell>
                  <TableCell>${item.revenue.toLocaleString()}</TableCell>
                  <TableCell>{format(item.joinedAt, "MMM d, yyyy")}</TableCell>
                  <TableCell>{formatDistanceToNow(item.lastActive, { addSuffix: true })}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{result.data.length}</span> of{" "}
          <span className="font-medium">{result.total}</span> results
        </div>

        <Pagination
          totalItems={result.total}
          currentPage={result.page}
          pageSize={result.pageSize}
          onPageChange={(page) => {
            // This is handled by the client component
          }}
        />
      </div>
    </div>
  )
}

interface SortableHeaderProps {
  name: string
  currentSort: string
  currentOrder: "asc" | "desc"
  children: React.ReactNode
}

function SortableHeader({ name, currentSort, currentOrder, children }: SortableHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isSorted = currentSort === name

  const handleSort = () => {
    const params = new URLSearchParams(searchParams)
    params.set("sortBy", name)

    if (isSorted) {
      params.set("sortOrder", currentOrder === "asc" ? "desc" : "asc")
    } else {
      params.set("sortOrder", "asc")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Button variant="ghost" onClick={handleSort} className="flex items-center gap-1 hover:bg-transparent">
      {children}
      {isSorted ? (
        currentOrder === "asc" ? (
          <ArrowUp className="ml-1 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-1 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-4 w-4" />
      )}
    </Button>
  )
}

