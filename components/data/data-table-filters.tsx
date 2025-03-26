"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getFilterOptions } from "@/lib/data-service"
import { useDebounce } from "@/hooks/use-debounce"
import { Filter, X } from "lucide-react"

export function DataTableFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current filter values from URL
  const currentStatusFilters = searchParams.getAll("status")
  const currentRoleFilters = searchParams.getAll("role")
  const currentCountryFilters = searchParams.getAll("country")
  const currentSearch = searchParams.get("search") || ""
  const currentPageSize = searchParams.get("pageSize") || "10"

  // Local state for filters
  const [statusFilters, setStatusFilters] = useState<string[]>(currentStatusFilters)
  const [roleFilters, setRoleFilters] = useState<string[]>(currentRoleFilters)
  const [countryFilters, setCountryFilters] = useState<string[]>(currentCountryFilters)
  const [search, setSearch] = useState(currentSearch)
  const [pageSize, setPageSize] = useState(currentPageSize)

  // Filter options
  const [filterOptions, setFilterOptions] = useState<{
    countries: string[]
    statuses: string[]
    roles: string[]
  }>({
    countries: [],
    statuses: [],
    roles: [],
  })

  // Fetch filter options
  useEffect(() => {
    const fetchOptions = async () => {
      const options = await getFilterOptions()
      setFilterOptions(options)
    }

    fetchOptions()
  }, [])

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    // Reset to page 1 when filters change
    params.set("page", "1")

    // Update search param
    if (debouncedSearch) {
      params.set("search", debouncedSearch)
    } else {
      params.delete("search")
    }

    // Update page size
    params.set("pageSize", pageSize)

    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedSearch, pageSize, pathname, router, searchParams])

  // Apply filters function
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams)

    // Reset to page 1
    params.set("page", "1")

    // Clear existing filters
    params.delete("status")
    params.delete("role")
    params.delete("country")

    // Add new filters
    statusFilters.forEach((status) => params.append("status", status))
    roleFilters.forEach((role) => params.append("role", role))
    countryFilters.forEach((country) => params.append("country", country))

    router.push(`${pathname}?${params.toString()}`)
  }

  // Reset filters
  const resetFilters = () => {
    setStatusFilters([])
    setRoleFilters([])
    setCountryFilters([])
    setSearch("")

    const params = new URLSearchParams()
    params.set("page", "1")
    params.set("pageSize", pageSize)

    router.push(`${pathname}?${params.toString()}`)
  }

  // Check if any filters are applied
  const hasFilters = statusFilters.length > 0 || roleFilters.length > 0 || countryFilters.length > 0 || search

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasFilters && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                  {statusFilters.length + roleFilters.length + countryFilters.length + (search ? 1 : 0)}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            {filterOptions.statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilters.includes(status)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setStatusFilters([...statusFilters, status])
                  } else {
                    setStatusFilters(statusFilters.filter((s) => s !== status))
                  }
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
            {filterOptions.roles.map((role) => (
              <DropdownMenuCheckboxItem
                key={role}
                checked={roleFilters.includes(role)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setRoleFilters([...roleFilters, role])
                  } else {
                    setRoleFilters(roleFilters.filter((r) => r !== role))
                  }
                }}
              >
                {role}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Filter by Country</DropdownMenuLabel>
            {filterOptions.countries.map((country) => (
              <DropdownMenuCheckboxItem
                key={country}
                checked={countryFilters.includes(country)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setCountryFilters([...countryFilters, country])
                  } else {
                    setCountryFilters(countryFilters.filter((c) => c !== country))
                  }
                }}
              >
                {country}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            <div className="flex items-center justify-between p-2">
              <Button size="sm" variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9 gap-1">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show</span>
        <Select
          value={pageSize}
          onValueChange={(value) => {
            setPageSize(value)
          }}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">per page</span>
      </div>
    </div>
  )
}

