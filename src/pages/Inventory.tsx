import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Edit, Trash2, AlertTriangle } from "lucide-react";
import { createInventoryItem, updateInventoryItem, deleteInventoryItem, getInventoryItems } from "@/lib/actions/inventory";
import { useToast } from "@/components/ui/use-toast";

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  sku?: string;
  current_stock: number;
  minimum_stock: number;
  maximum_stock?: number;
  unit_cost?: number;
  location?: string;
};

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await getInventoryItems();
      setItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load inventory items",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingItem) {
        await updateInventoryItem(editingItem.id, formData);
        toast({
          title: "Success",
          description: "Inventory item updated successfully",
        });
      } else {
        await createInventoryItem(formData);
        toast({
          title: "Success",
          description: "Inventory item created successfully",
        });
      }
      setShowForm(false);
      setEditingItem(null);
      loadItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save inventory item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inventory item?")) {
      try {
        await deleteInventoryItem(id);
        toast({
          title: "Success",
          description: "Inventory item deleted successfully",
        });
        loadItems();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete inventory item",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { variant: "destructive", label: "Out of Stock" };
    if (current <= minimum) return { variant: "secondary", label: "Low Stock" };
    return { variant: "default", label: "In Stock" };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Track materials, supplies, and spare parts inventory</p>
        </div>
        <Button onClick={handleNewItem}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Add Item Form */}
      {showForm && (
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Inventory Item" : "New Inventory Item"}</CardTitle>
            <CardDescription>Enter item details and stock information</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Enter item name" 
                    defaultValue={editingItem?.name || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    placeholder="e.g., Spare Parts, Fuel" 
                    defaultValue={editingItem?.category || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku" 
                    name="sku" 
                    placeholder="Enter SKU" 
                    defaultValue={editingItem?.sku || ""} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input 
                    id="currentStock" 
                    name="currentStock" 
                    type="number" 
                    placeholder="Current quantity" 
                    defaultValue={editingItem?.current_stock || 0} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumStock">Minimum Stock</Label>
                  <Input 
                    id="minimumStock" 
                    name="minimumStock" 
                    type="number" 
                    placeholder="Minimum quantity" 
                    defaultValue={editingItem?.minimum_stock || 0} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maximumStock">Maximum Stock</Label>
                  <Input 
                    id="maximumStock" 
                    name="maximumStock" 
                    type="number" 
                    placeholder="Maximum quantity" 
                    defaultValue={editingItem?.maximum_stock || ""} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitCost">Unit Cost</Label>
                  <Input 
                    id="unitCost" 
                    name="unitCost" 
                    type="number" 
                    step="0.01" 
                    placeholder="Cost per unit" 
                    defaultValue={editingItem?.unit_cost || ""} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="Enter storage location" 
                  defaultValue={editingItem?.location || ""} 
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingItem(null); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? "Update Item" : "Save Item"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="bg-gradient-surface shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Inventory Items
          </CardTitle>
          <CardDescription>Current stock levels and item details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min/Max</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const stockStatus = getStockStatus(item.current_stock, item.minimum_stock);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.sku || "-"}</TableCell>
                    <TableCell className="font-medium">{item.current_stock}</TableCell>
                    <TableCell>
                      {item.minimum_stock} / {item.maximum_stock || "∞"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant as any}>
                        {item.current_stock <= item.minimum_stock && item.current_stock > 0 && (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.unit_cost ? `$${item.unit_cost.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>{item.location || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
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

export default Inventory;