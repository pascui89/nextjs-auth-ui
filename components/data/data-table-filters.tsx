"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, X } from "lucide-react";
import { useDataTableFilters } from "@/components/data/hooks/use-data-table-filters";

interface DataTableFiltersProps {
  filterOptions: {
    countries: string[];
    statuses: string[];
    roles: string[];
  };
}

export function DataTableFilters({ filterOptions }: DataTableFiltersProps) {
  const {
    state: { statusFilters, roleFilters, countryFilters, search, pageSize, hasFilters },
    actions: { setStatusFilters, setRoleFilters, setCountryFilters, setSearch, setPageSize, applyFilters, resetFilters },
  } = useDataTableFilters(filterOptions);

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
                    setStatusFilters([...statusFilters, status]);
                  } else {
                    setStatusFilters(statusFilters.filter((s) => s !== status));
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
                    setRoleFilters([...roleFilters, role]);
                  } else {
                    setRoleFilters(roleFilters.filter((r) => r !== role));
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
                    setCountryFilters([...countryFilters, country]);
                  } else {
                    setCountryFilters(countryFilters.filter((c) => c !== country));
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
            setPageSize(value);
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
  );
}