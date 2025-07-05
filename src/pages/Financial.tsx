import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { createFinancialTransaction, updateFinancialTransaction, deleteFinancialTransaction, getFinancialTransactions } from "@/lib/actions/financial";
import { useToast } from "@/components/ui/use-toast";

type FinancialTransaction = {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: string;
  transaction_date: string;
};

const Financial = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<FinancialTransaction | null>(null);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getFinancialTransactions();
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load financial transactions",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingTransaction) {
        await updateFinancialTransaction(editingTransaction.id, formData);
        toast({
          title: "Success",
          description: "Transaction updated successfully",
        });
      } else {
        await createFinancialTransaction(formData);
        toast({
          title: "Success",
          description: "Transaction created successfully",
        });
      }
      setShowForm(false);
      setEditingTransaction(null);
      loadTransactions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transaction",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (transaction: FinancialTransaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteFinancialTransaction(id);
        toast({
          title: "Success",
          description: "Transaction deleted successfully",
        });
        loadTransactions();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete transaction",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewTransaction = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const getTransactionIcon = (type: string) => {
    return type === "revenue" ? TrendingUp : TrendingDown;
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "revenue": return "default";
      case "expense": return "destructive"; 
      case "asset": return "secondary";
      case "liability": return "outline";
      default: return "secondary";
    }
  };

  const getTotalsByType = () => {
    const totals = { revenue: 0, expense: 0, asset: 0, liability: 0 };
    transactions.forEach(t => {
      totals[t.type as keyof typeof totals] += t.amount;
    });
    return totals;
  };

  const totals = getTotalsByType();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Management</h1>
          <p className="text-muted-foreground">Track revenue, expenses, and financial performance</p>
        </div>
        <Button onClick={handleNewTransaction}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totals.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totals.expense.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totals.revenue - totals.expense).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.asset.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader>
            <CardTitle>{editingTransaction ? "Edit Transaction" : "New Transaction"}</CardTitle>
            <CardDescription>Enter financial transaction details</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Transaction Type</Label>
                  <Select name="type" defaultValue={editingTransaction?.type || ""} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="asset">Asset</SelectItem>
                      <SelectItem value="liability">Liability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    placeholder="e.g., Equipment, Fuel, Sales" 
                    defaultValue={editingTransaction?.category || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    name="amount" 
                    type="number" 
                    step="0.01" 
                    placeholder="Enter amount" 
                    defaultValue={editingTransaction?.amount || ""} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Enter transaction description" 
                  defaultValue={editingTransaction?.description || ""} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionDate">Transaction Date</Label>
                <Input 
                  id="transactionDate" 
                  name="transactionDate" 
                  type="date" 
                  defaultValue={editingTransaction?.transaction_date || new Date().toISOString().split('T')[0]} 
                  required 
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingTransaction(null); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTransaction ? "Update Transaction" : "Save Transaction"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <Card className="bg-gradient-surface shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Financial Transactions
          </CardTitle>
          <CardDescription>Recent financial transactions and entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => {
                const Icon = getTransactionIcon(transaction.type);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.transaction_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getTransactionColor(transaction.type) as any}>
                        <Icon className="h-3 w-3 mr-1" />
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                    <TableCell className="font-medium">
                      <span className={transaction.type === "revenue" ? "text-success" : transaction.type === "expense" ? "text-destructive" : ""}>
                        ${transaction.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(transaction)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;