import { TableCell, TableRow } from "@/components/ui/table";

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
  
  export function DataTableRow({ item }: DataTableRowProps) {
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