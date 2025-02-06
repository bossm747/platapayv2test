import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const transactions = [
  {
    id: "1",
    amount: "+₱1,999.00",
    status: "complete",
    email: "m.ross@example.com",
    name: "Mike Ross",
  },
  {
    id: "2",
    amount: "-₱799.00",
    status: "processing",
    email: "r.pearson@example.com",
    name: "Rachel Pearson",
  },
  {
    id: "3",
    amount: "+₱4,999.00",
    status: "complete",
    email: "h.simpson@example.com",
    name: "Harvey Simpson",
  },
  {
    id: "4",
    amount: "-₱599.00",
    status: "processing",
    email: "d.palmer@example.com",
    name: "Donna Palmer",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${transaction.id}.png`} alt="Avatar" />
            <AvatarFallback>
              {transaction.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div
            className={`ml-auto font-medium ${transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}
          >
            {transaction.amount}
          </div>
        </div>
      ))}
    </div>
  )
}

