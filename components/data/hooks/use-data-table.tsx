"use client";

import { useState, useEffect, useCallback } from "react";
import { queryData, DataQueryParams } from "@/lib/data-service";
import { DataItem } from "@/types/data";

export function useDataTable({ initialPage, initialPageSize }: { initialPage: number; initialPageSize: number }) {
  const [data, setData] = useState<DataItem[]>([]);
  const [currentSort, setCurrentSort] = useState<string>("id");
  const [currentOrder, setCurrentOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = useCallback(() => {
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
        setTotal(result.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, pageSize, currentSort, currentOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (name: string) => {
    if (currentSort === name) {
      setCurrentOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setCurrentSort(name);
      setCurrentOrder("asc");
    }
  };

  return {
    state: {
      data,
      currentSort,
      currentOrder,
      page,
      pageSize,
      loading,
      total,
    },
    actions: {
      setPage,
      setPageSize,
      handleSort,
    },
  };
}