"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortableHeaderClientProps {
  name: string;
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSort: (name: string) => void; // Nueva función para manejar el ordenamiento
  children: React.ReactNode;
}

export function SortableHeaderClient({
  name,
  currentSort,
  currentOrder,
  onSort,
  children,
}: SortableHeaderClientProps) {
  const isSorted = currentSort === name;

  const handleSort = () => {
    onSort(name);
  };

  return (
    <th
      onClick={handleSort}
      className="cursor-pointer px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-1">
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
      </div>
    </th>
  );
}