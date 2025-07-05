import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, Edit, Trash2 } from "lucide-react";
import { createEquipment, updateEquipment, deleteEquipment, getEquipment } from "@/lib/actions/equipment";
import { useToast } from "@/components/ui/use-toast";

type Equipment = {
  id: string;
  name: string;
  type: string;
  model?: string;
  serial_number?: string;
  status: string;
  location?: string;
  purchase_date?: string;
};

const Equipment = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const data = await getEquipment();
      setEquipment(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load equipment",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingEquipment) {
        await updateEquipment(editingEquipment.id, formData);
        toast({
          title: "Success",
          description: "Equipment updated successfully",
        });
      } else {
        await createEquipment(formData);
        toast({
          title: "Success",
          description: "Equipment created successfully", 
        });
      }
      setShowForm(false);
      setEditingEquipment(null);
      loadEquipment();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save equipment",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this equipment?")) {
      try {
        await deleteEquipment(id);
        toast({
          title: "Success",
          description: "Equipment deleted successfully",
        });
        loadEquipment();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete equipment",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewEquipment = () => {
    setEditingEquipment(null);
    setShowForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "default";
      case "maintenance": return "secondary";
      case "down": return "destructive";
      case "retired": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Equipment Management</h1>
          <p className="text-muted-foreground">Monitor and manage mining equipment status and maintenance</p>
        </div>
        <Button onClick={handleNewEquipment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {/* Add Equipment Form */}
      {showForm && (
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader>
            <CardTitle>{editingEquipment ? "Edit Equipment" : "New Equipment"}</CardTitle>
            <CardDescription>Enter equipment details and status information</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Equipment Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Enter equipment name" 
                    defaultValue={editingEquipment?.name || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input 
                    id="type" 
                    name="type" 
                    placeholder="e.g., Excavator, Truck" 
                    defaultValue={editingEquipment?.type || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input 
                    id="model" 
                    name="model" 
                    placeholder="Enter model" 
                    defaultValue={editingEquipment?.model || ""} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input 
                    id="serialNumber" 
                    name="serialNumber" 
                    placeholder="Enter serial number" 
                    defaultValue={editingEquipment?.serial_number || ""} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingEquipment?.status || "operational"} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    placeholder="Enter location" 
                    defaultValue={editingEquipment?.location || ""} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input 
                  id="purchaseDate" 
                  name="purchaseDate" 
                  type="date" 
                  defaultValue={editingEquipment?.purchase_date || ""} 
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingEquipment(null); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEquipment ? "Update Equipment" : "Save Equipment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Equipment Table */}
      <Card className="bg-gradient-surface shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Equipment Inventory
          </CardTitle>
          <CardDescription>Current status and details of all mining equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.model || "-"}</TableCell>
                  <TableCell>{item.serial_number || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Equipment;