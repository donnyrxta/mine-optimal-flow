import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Download } from "lucide-react";

const productionRecords = [
  {
    id: "PR-001",
    date: "2024-01-15",
    shift: "Day",
    materialType: "Gold Ore",
    quantity: 1850,
    quality: "Grade A",
    location: "Zone A-1",
    operator: "Mike Johnson"
  },
  {
    id: "PR-002", 
    date: "2024-01-15",
    shift: "Night",
    materialType: "Copper Ore",
    quantity: 2100,
    quality: "Grade B+",
    location: "Zone B-2",
    operator: "Sarah Williams"
  },
  {
    id: "PR-003",
    date: "2024-01-14",
    shift: "Day", 
    materialType: "Coal",
    quantity: 3200,
    quality: "Standard",
    location: "Zone C-1",
    operator: "David Chen"
  },
];

const Production = () => {
  const [showForm, setShowForm] = useState(false);

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
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Add Production Form */}
      {showForm && (
        <Card className="bg-gradient-surface shadow-elevation">
          <CardHeader>
            <CardTitle>New Production Record</CardTitle>
            <CardDescription>Enter production details for the current shift</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone-a1">Zone A-1</SelectItem>
                    <SelectItem value="zone-a2">Zone A-2</SelectItem>
                    <SelectItem value="zone-b1">Zone B-1</SelectItem>
                    <SelectItem value="zone-b2">Zone B-2</SelectItem>
                    <SelectItem value="zone-c1">Zone C-1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold-ore">Gold Ore</SelectItem>
                    <SelectItem value="copper-ore">Copper Ore</SelectItem>
                    <SelectItem value="coal">Coal</SelectItem>
                    <SelectItem value="iron-ore">Iron Ore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (tons)</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quality">Quality Grade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-a">Grade A</SelectItem>
                    <SelectItem value="grade-b+">Grade B+</SelectItem>
                    <SelectItem value="grade-b">Grade B</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" placeholder="Additional notes about this production record..." />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowForm(false)}>
                Save Record
              </Button>
            </div>
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
                <TableHead>Operator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={record.shift === "Day" ? "default" : "secondary"}>
                      {record.shift}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.materialType}</TableCell>
                  <TableCell>{record.quantity.toLocaleString()} tons</TableCell>
                  <TableCell>
                    <Badge 
                      variant={record.quality === "Grade A" ? "default" : "secondary"}
                      className={record.quality === "Grade A" ? "bg-success text-success-foreground" : ""}
                    >
                      {record.quality}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>{record.operator}</TableCell>
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