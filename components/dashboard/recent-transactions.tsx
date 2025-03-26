import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// This would typically come from an API or database
async function getRecentTransactions() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      id: "T-1234",
      customer: "John Doe",
      amount: 125.99,
      status: "completed",
      date: new Date(2023, 2, 15),
    },
    {
      id: "T-1235",
      customer: "Jane Smith",
      amount: 89.5,
      status: "processing",
      date: new Date(2023, 2, 14),
    },
    {
      id: "T-1236",
      customer: "Robert Johnson",
      amount: 245.0,
      status: "completed",
      date: new Date(2023, 2, 13),
    },
    {
      id: "T-1237",
      customer: "Emily Davis",
      amount: 32.75,
      status: "failed",
      date: new Date(2023, 2, 12),
    },
    {
      id: "T-1238",
      customer: "Michael Wilson",
      amount: 156.25,
      status: "completed",
      date: new Date(2023, 2, 11),
    },
  ]
}

export async function RecentTransactions() {
  const transactions = await getRecentTransactions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest customer transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : transaction.status === "processing"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDistanceToNow(transaction.date, { addSuffix: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

