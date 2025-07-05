import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Download, Edit, Trash2 } from "lucide-react";
import { createProductionRecord, updateProductionRecord, deleteProductionRecord, getProductionRecords } from "@/lib/actions/production";
import { useToast } from "@/components/ui/use-toast";

type ProductionRecord = {
  id: string;
  date: string;
  shift: string;
  material_type: string;
  quantity: number;
  quality: string;
  location: string;
  notes?: string;
};

const Production = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ProductionRecord | null>(null);
  const [records, setRecords] = useState<ProductionRecord[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await getProductionRecords();
      setRecords(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load production records",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingRecord) {
        await updateProductionRecord(editingRecord.id, formData);
        toast({
          title: "Success",
          description: "Production record updated successfully",
        });
      } else {
        await createProductionRecord(formData);
        toast({
          title: "Success",
          description: "Production record created successfully",
        });
      }
      setShowForm(false);
      setEditingRecord(null);
      loadRecords();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save production record",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (record: ProductionRecord) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteProductionRecord(id);
        toast({
          title: "Success",
          description: "Production record deleted successfully",
        });
        loadRecords();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete production record",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewRecord = () => {
    setEditingRecord(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Production Management</h1>
          <p className="text-muted-foreground">Track and manage daily production records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleNewRecord}>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Add Production Form */}
      {showForm && (
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader>
            <CardTitle>{editingRecord ? "Edit Production Record" : "New Production Record"}</CardTitle>
            <CardDescription>Enter production details for the current shift</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    defaultValue={editingRecord?.date || new Date().toISOString().split('T')[0]} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select name="shift" defaultValue={editingRecord?.shift || ""} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day Shift</SelectItem>
                      <SelectItem value="night">Night Shift</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    placeholder="Enter location" 
                    defaultValue={editingRecord?.location || ""} 
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materialType">Material Type</Label>
                  <Input 
                    id="materialType" 
                    name="materialType" 
                    placeholder="Enter material type" 
                    defaultValue={editingRecord?.material_type || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (tons)</Label>
                  <Input 
                    id="quantity" 
                    name="quantity" 
                    type="number" 
                    step="0.01" 
                    placeholder="Enter quantity" 
                    defaultValue={editingRecord?.quantity || ""} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Grade</Label>
                  <Input 
                    id="quality" 
                    name="quality" 
                    placeholder="Enter quality grade" 
                    defaultValue={editingRecord?.quality || ""} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea 
                  id="notes" 
                  name="notes" 
                  placeholder="Additional notes about this production record..." 
                  defaultValue={editingRecord?.notes || ""} 
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingRecord(null); }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRecord ? "Update Record" : "Save Record"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Production Records Table */}
      <Card className="bg-gradient-surface shadow-elevation">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Production Records
          </CardTitle>
          <CardDescription>Recent production data and extraction records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id.substring(0, 8)}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={record.shift === "day" ? "default" : "secondary"}>
                      {record.shift}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.material_type}</TableCell>
                  <TableCell>{record.quantity.toLocaleString()} tons</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {record.quality}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(record.id)}
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

export default Production;