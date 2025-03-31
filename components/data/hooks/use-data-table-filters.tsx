"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export function useDataTableFilters(filterOptions: {
  countries: string[];
  statuses: string[];
  roles: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter values from URL
  const currentStatusFilters = searchParams.getAll("status");
  const currentRoleFilters = searchParams.getAll("role");
  const currentCountryFilters = searchParams.getAll("country");
  const currentSearch = searchParams.get("search") || "";
  const currentPageSize = searchParams.get("pageSize") || "10";

  // Local state for filters
  const [statusFilters, setStatusFilters] = useState<string[]>(currentStatusFilters);
  const [roleFilters, setRoleFilters] = useState<string[]>(currentRoleFilters);
  const [countryFilters, setCountryFilters] = useState<string[]>(currentCountryFilters);
  const [search, setSearch] = useState(currentSearch);
  const [pageSize, setPageSize] = useState(currentPageSize);

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Reset to page 1 when filters change
    params.set("page", "1");

    // Update search param
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    // Update page size
    params.set("pageSize", pageSize);

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pageSize, pathname, router, searchParams]);

  // Apply filters function
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Reset to page 1
    params.set("page", "1");

    // Clear existing filters
    params.delete("status");
    params.delete("role");
    params.delete("country");

    // Add new filters
    statusFilters.forEach((status) => params.append("status", status));
    roleFilters.forEach((role) => params.append("role", role));
    countryFilters.forEach((country) => params.append("country", country));

    router.push(`${pathname}?${params.toString()}`);
  };

  // Reset filters
  const resetFilters = () => {
    setStatusFilters([]);
    setRoleFilters([]);
    setCountryFilters([]);
    setSearch("");

    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("pageSize", pageSize);

    router.push(`${pathname}?${params.toString()}`);
  };

  // Check if any filters are applied
  const hasFilters =
    statusFilters.length > 0 || roleFilters.length > 0 || countryFilters.length > 0 || search;

  return {
    state: {
      statusFilters,
      roleFilters,
      countryFilters,
      search,
      pageSize,
      hasFilters,
      filterOptions,
    },
    actions: {
      setStatusFilters,
      setRoleFilters,
      setCountryFilters,
      setSearch,
      setPageSize,
      applyFilters,
      resetFilters,
    },
  };
}